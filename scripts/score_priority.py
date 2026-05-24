"""
Scoring der Kundenliste fuer Bruce B. Sales Navigator.

Strategie (entsprechend Q1+Q3 vom 24.05.2026):
- Branchenfokus: Industrie + Public Sector zuerst
- Big-Ticket-Schwerpunkt: 80% Land-and-Expand (Bestand), 20% New Logos

Score-Modell (0–100):
  Industry weighting (max 35): maschinenbau/public/automotive/medtech bevorzugt
  Account-size heuristic (max 25): erkannte Konzern-/Mittelstand-Brands
  Existing relationship strength (max 20): Anzahl Kontakte, Notes, Consents
  Contact-readiness (max 15): voller Name, E-Mail, Telefon
  Stuttgart/BW-Naehe (max 5): geografische Wahrscheinlichkeit
"""
from __future__ import annotations
import json
import re
from pathlib import Path

ROOT = Path("/Users/maximilianschmierer/Git_Projects/RexSalesNavigator/RexSalesNavigator")
SRC = ROOT / "data/private/customers.json"
OUT_FULL = ROOT / "data/private/customers_scored.json"
OUT_TOP50 = ROOT / "data/private/top50_priority.json"
OUT_TOP50_PUBLIC = ROOT / "data/seed/top50_priority.public.md"

INDUSTRY_WEIGHTS = {
    "maschinenbau": 35,
    "public_sector": 32,
    "automotive": 28,
    "medtech_pharma": 30,
    "research_oeffentlich": 28,
    "energie": 25,
    "moebel_interior": 22,
    "software_tech": 18,
    "finance_banking_versicherung": 22,
    "messe_event": 15,
    "mode_lifestyle": 15,
    "medien_audio": 12,
    "mobilitaet_oeffentlich": 22,
    "hotellerie_tourismus": 12,
    "kreativ_agentur": 5,
    "legal_consulting": 5,
    "other": 8,
}

# Bekannte grosse Konzerne / Mittelstand-Hidden-Champions (mehr Punkte)
TIER1_BRANDS = {
    # Stuttgart/BW Konzerne (allerhöchste Prio — Geografie + Größe)
    r"\bmercedes": 25, r"\bporsche\b": 25, r"\bbosch\b": 25, r"\btrumpf\b": 25,
    r"\bdaimler": 25, r"\bporsche\b": 25, r"\bzf\b": 22, r"\bmahle\b": 22,
    r"voith\b": 25, r"\bhäfele\b": 25, r"haefele": 25, r"\bhüttinger\b": 20,
    r"\bsiemens\b": 23, r"\bsap\b": 22, r"\bstihl\b": 22, r"\bdürr\b": 22,
    r"\beberspächer\b": 22, r"\bcarl zeiss\b": 22, r"\bzeiss\b": 22,
    r"\beuchner\b": 18, r"\bfesto\b": 22, r"\bsick\b": 20, r"\bkärcher\b": 22,
    r"\benbw\b": 22, r"stadtwerke stuttgart": 20, r"\blbbw\b": 20,
    r"\bbertrandt\b": 18, r"\bsap\b": 22, r"\balfred kärcher": 22,
    r"andreas stihl": 22, r"\bschuler\b": 18, r"\bphoenix contact\b": 22,
    r"\bbrainlab\b": 22, r"\bbiotronik\b": 22, r"\bdentaurum\b": 16,
    r"\bb braun\b": 22, r"\bfresenius\b": 22, r"\bxenios\b": 16,
    r"\bdiefenbacher\b": 18, r"dieffenbacher": 18, r"\bhima\b": 18,
    # Konzern-affine globale Brands
    r"\bdrees & sommer": 18, r"\bdrees\b": 18, r"\baltvater\b": 12,
    r"\bbasf\b": 22, r"\bmichelin\b": 20, r"\bbeyerdynamic\b": 14,
    r"\bhugo boss\b": 22, r"\bbmw\b": 22, r"\baudi\b": 22, r"\bcontinental\b": 20,
    # Public Sector — bekannte Adressen
    r"\bfraunhofer\b": 24, r"\bland baden": 22, r"\bland bw\b": 22,
    r"\bpolizei baden-württemberg\b": 18, r"\bpolizei bw\b": 18,
    r"landesmuseum württemberg": 18, r"\blandesmuseum\b": 16,
    r"\b42 heilbronn\b": 18, r"\bipai\b": 18, r"\biba\b": 14,
    r"\bibm\b": 18, r"\bsap\b": 20, r"\bhdm\b": 14, r"\buni stuttgart\b": 16,
    r"universität stuttgart": 16, r"\buniversität tübingen\b": 16,
    r"eberhard karls": 14, r"\bswr\b": 16, r"südwestrundfunk": 16,
    r"\bihk\b": 14, r"wirtschaftsförderung region stuttgart": 16,
    # Mittelstand mit Marken-Power
    r"\bphilip möbel\b": 12, r"\brossel.{0,3}wanner\b": 10, r"\brecaro\b": 18,
    r"\bbody ?bike\b": 10, r"world money fair": 14, r"\bsks russ\b": 12,
    r"\brx\b": 14, r"reed exhibitions": 14, r"\bgallus\b": 16, r"heidelberg": 18,
    # Star-Cases von Bruce B.
    r"\baltvater\b": 12, r"\balstom\b": 18, r"\bopus\b": 14,
}

# Geografie-Hinweise (Stuttgart/BW = +5)
BW_HINTS = [
    r"stuttgart", r"stuttgar", r"böblingen", r"\bs-west\b", r"backnang",
    r"sindelfingen", r"esslingen", r"ludwigsburg", r"waiblingen", r"fellbach",
    r"reutlingen", r"\btübingen\b", r"\bulm\b", r"heilbronn", r"karlsruhe",
    r"mannheim", r"freiburg", r"pforzheim", r"baden-baden", r"konstanz",
    r"schwäbisch", r"nagold", r"horb", r"\baalen\b", r"göppingen",
    r"\bgmund\b", r"gmünd", r"affalterbach", r"nürtingen",
    r"baden-württemberg",
]


def score_company(c: dict) -> dict:
    """Return augmented company with score breakdown."""
    name_lower = c["company"].lower()
    industry = c["industry"]

    # 1. Industry weight
    industry_score = INDUSTRY_WEIGHTS.get(industry, 5)

    # 2. Account-size / brand recognition
    brand_score = 0
    matched_brand = None
    for pat, pts in TIER1_BRANDS.items():
        if re.search(pat, name_lower):
            if pts > brand_score:
                brand_score = pts
                matched_brand = pat
    if brand_score > 25:
        brand_score = 25  # cap

    # 3. Existing relationship strength
    n_contacts = len(c["contacts"])
    relationship_score = min(20, n_contacts * 5)
    # Bonus for notes / consent
    notes_total = sum(1 for ct in c["contacts"] if ct.get("notes"))
    if notes_total > 0:
        relationship_score = min(20, relationship_score + 5)
    consent_total = sum(1 for ct in c["contacts"] if ct.get("mail_consent") or ct.get("phone_consent"))
    if consent_total > 0:
        relationship_score = min(20, relationship_score + 3)

    # 4. Contact readiness
    readiness_score = 0
    for ct in c["contacts"]:
        pts = 0
        if ct.get("email"):
            pts += 5
        if ct.get("mobile") or ct.get("phone"):
            pts += 5
        if ct.get("first_name") and ct.get("last_name"):
            pts += 3
        if ct.get("position"):
            pts += 2
        readiness_score = max(readiness_score, pts)
    readiness_score = min(15, readiness_score)

    # 5. Geo hint (BW/Stuttgart)
    geo_score = 0
    for h in BW_HINTS:
        if re.search(h, name_lower):
            geo_score = 5
            break
    # Note: many contacts don't have Adresse, so this is weak signal
    # Adjustment: Auto/Maschinenbau-Stammkunden bekommen +5 da Stuttgart-Region historisch
    if industry in ("automotive", "maschinenbau") and geo_score == 0:
        geo_score = 3

    total = industry_score + brand_score + relationship_score + readiness_score + geo_score

    c["score"] = total
    c["score_breakdown"] = {
        "industry": industry_score,
        "brand": brand_score,
        "relationship": relationship_score,
        "readiness": readiness_score,
        "geo": geo_score,
    }
    c["tier"] = (
        "Tier 1 — Hot" if total >= 70
        else "Tier 2 — Warm" if total >= 50
        else "Tier 3 — Track" if total >= 30
        else "Tier 4 — Cold"
    )
    c["matched_brand_pattern"] = matched_brand
    return c


def derive_reactivation_reason(c: dict) -> str:
    """Heuristic hook for the email opener."""
    bw = "Stuttgart/BW-Industrie" if c["industry"] in ("automotive", "maschinenbau", "moebel_interior") else None
    public = c["industry"] == "public_sector"
    medtech = c["industry"] == "medtech_pharma"
    hits = []
    if bw:
        hits.append("Stuttgart/BW-Industrie-Re-Activation: AVA / Bruce-B-360°-Brücke")
    if public:
        hits.append("EU-AI-Act Aug-2026 + Fraunhofer-IAO-Co-Entwicklung — Hebel für Verwaltung")
    if medtech:
        hits.append("Patient-Education / Schulungs-Avatar + Bruce-B-Editorial-Erbe")
    if not hits:
        if c["industry"] == "research_oeffentlich":
            hits.append("Fraunhofer-Pilot-Templating, Showcase-Erweiterung")
        elif c["industry"] == "energie":
            hits.append("Bürger-/Field-Service-Avatar + Hydrogen-Hub-Erfahrung")
        elif c["industry"] == "moebel_interior":
            hits.append("Häfele-Modell skalieren — Holzhandwerk-/Interzum-Erfahrung")
        elif c["industry"] == "software_tech":
            hits.append("AVA-Frontend für Software/Plattform — Voith-Editorial-Modell")
        elif c["industry"] == "finance_banking_versicherung":
            hits.append("Beratungs-/Compliance-Avatar — EU-AI-Act-Hebel")
        else:
            hits.append("Bestandsbeziehung reaktivieren — verschmolzene Bruce B. vorstellen")
    return " · ".join(hits)


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    for c in data:
        score_company(c)
        c["suggested_hook"] = derive_reactivation_reason(c)

    # Sort by score desc
    data.sort(key=lambda c: -c["score"])

    OUT_FULL.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    top50 = data[:50]
    OUT_TOP50.write_text(json.dumps(top50, ensure_ascii=False, indent=2), encoding="utf-8")

    # Markdown summary (anonymized version safe to commit)
    lines = [
        "# Top-50 Priority Accounts — Bruce B. Sales Navigator",
        f"\n_Stand: 25.05.2026 · Generiert aus {len(data)} Firmen-Records_",
        "\n> **Hinweis:** Diese Datei ist die _öffentliche, anonymisierte_ Übersicht.",
        "> Die echten Firmennamen + Kontaktdaten liegen lokal in `data/private/top50_priority.json` (gitignored).",
        "",
        "## Tier-Verteilung",
    ]
    tier_counts = {}
    for c in data:
        tier_counts[c["tier"]] = tier_counts.get(c["tier"], 0) + 1
    for tier, n in sorted(tier_counts.items()):
        lines.append(f"- **{tier}**: {n} Firmen")

    lines.append("\n## Top-50 (Anonymisiert)")
    lines.append("\n| Rang | Score | Branche | Tier | Kontakte | Empfohlener Hook |")
    lines.append("|---:|---:|:--|:--|---:|:--|")
    for i, c in enumerate(top50, 1):
        lines.append(
            f"| {i} | {c['score']} | {c['industry']} | {c['tier']} | "
            f"{len(c['contacts'])} | {c['suggested_hook']} |"
        )
    OUT_TOP50_PUBLIC.write_text("\n".join(lines), encoding="utf-8")

    # Console
    print(f"✓ Scored {len(data)} companies")
    print(f"  Tier 1 — Hot:   {tier_counts.get('Tier 1 — Hot', 0)}")
    print(f"  Tier 2 — Warm:  {tier_counts.get('Tier 2 — Warm', 0)}")
    print(f"  Tier 3 — Track: {tier_counts.get('Tier 3 — Track', 0)}")
    print(f"  Tier 4 — Cold:  {tier_counts.get('Tier 4 — Cold', 0)}")
    print(f"  → {OUT_FULL}")
    print(f"  → {OUT_TOP50}")
    print(f"  → {OUT_TOP50_PUBLIC}")
    print("\nTop 15 (lokal):")
    for i, c in enumerate(top50[:15], 1):
        print(f"  {i:2d}. [{c['score']:>3}] {c['company'][:50]:50s} ({c['industry']})")


if __name__ == "__main__":
    main()
