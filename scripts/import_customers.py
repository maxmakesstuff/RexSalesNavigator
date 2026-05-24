"""
Importiert die Bruce B. / B.REX Gesamtkundenliste in zwei JSON-Datenstrukturen:

  data/private/customers.json   - VOLLSTÄNDIG mit echten Kontaktdaten (gitignored)
  data/seed/customers.demo.json - Anonymisiert, im Repo committet (Beispieldaten)

Außerdem schreibt eine Branchen-Klassifikation und einen vorläufigen Priority-Score.
"""

from __future__ import annotations
import json
import re
import unicodedata
import hashlib
from pathlib import Path
from openpyxl import load_workbook

SOURCE = Path("/Users/maximilianschmierer/Git_Projects/RexSalesNavigator/Sources/260519_Gesamtkundenliste_BREX_Verschmelzung_V3.xlsx")
ROOT = Path("/Users/maximilianschmierer/Git_Projects/RexSalesNavigator/RexSalesNavigator")
PRIV_OUT = ROOT / "data/private/customers.json"
SEED_OUT = ROOT / "data/seed/customers.demo.json"

# Branchen-Klassifikation (Heuristiken auf Firmenname).
# Reihenfolge = Priorität (erste Match gewinnt). Spezifischeres vor Generischem.
INDUSTRY_RULES = [
    ("research_oeffentlich", [
        r"fraunhofer", r"\bdlr\b", r"\bmax planck\b", r"helmholtz", r"leibniz", r"\bkit\b",
        r"\bhdm\b", r"hochschule", r"filmakademie", r"universität", r"universitaet", r"eberhard karls",
        r"acameo", r"\biao\b", r"virtual dimension center", r"\bvdc\b",
        r"digitalisierungszentrum", r"steinbeis",
    ]),
    ("public_sector", [
        r"\bland\b.*württemberg", r"land bw", r"polizei", r"forst", r"landesamt", r"landesmuseum",
        r"ministerium", r"behörde", r"behoerde", r"wirtschaftsförderung", r"wirtschaftsfoerderung",
        r"\b42 heilbronn\b", r"\bipai\b", r"\biba\b", r"denkmal", r"staatsministerium",
        r"bundesarchitekt", r"architektenkammer", r"landessportverband", r"\blsv\b", r"rathaus",
        r"stadt stuttgart", r"\bibb\b", r"\bbafa\b", r"industrie- und handelskammer", r"\bihk\b",
        r"adac\b", r"bundesregierung", r"e\.v\.?\s*$", r"e\.\s*v\b", r"baden-württemberg international",
        r"kreismedienzentrum", r"filmcommission", r"film commission", r"kommune",
        r"krankenkasse", r"\btbg\b", r"festspielhaus",
        r"festspiele baden-baden", r"\bzdf\b", r"\bard\b",
        r"staatsgalerie", r"staatstheater", r"stadtpalais", r"tum campus", r"arkadia heilbronn",
        r"die neue sammlung", r"\bgallery\b", r"galerie schlichtenmaier",
    ]),
    ("automotive", [
        r"\bmercedes", r"\bporsche\b", r"\bbmw\b", r"\bdaimler", r"\bamg\b", r"\bbenz\b",
        r"\bsmart\b", r"\bmaybach\b", r"\bunimog\b", r"\brecaro\b", r"\bmichelin\b",
        r"continental", r"\bzf\b", r"\bmahle\b", r"\bvaleo\b", r"eberspächer", r"eberspaecher",
        r"\bbertrandt\b", r"\betas\b", r"\bbyd\b", r"\bbugatti\b", r"\bbilster berg\b",
        r"\bcellcentric\b", r"hella\b", r"\bbrose\b", r"\binovation\b", r"automotive",
        r"\bedag\b", r"audi\b", r"volkswagen", r"\bvw\b", r"opel\b", r"ford\b",
    ]),
    ("maschinenbau", [
        r"voith\b", r"dieffenbacher", r"gallus", r"heidelberg", r"trumpf", r"\bhima\b",
        r"hüttinger", r"huettinger", r"alstom", r"siemens", r"\bsew\b", r"\bkuka\b",
        r"krones", r"\bkärcher\b", r"\bkarcher\b", r"\balfred kärcher", r"festo", r"\bfaro\b",
        r"tekon", r"hörmann", r"hoermann", r"\bstihl\b", r"andreas maier", r"\bgemü\b",
        r"\bgemu\b", r"\beuchner\b", r"ebm-papst", r"brennenstuhl", r"\bbucher industries",
        r"argo-hytos", r"\bake knebel\b", r"\bal-ko\b", r"\bbessey\b", r"\bblickle\b",
        r"\bbitzer\b", r"\bbock\b", r"\bbosch\b", r"carl zeiss", r"\bzeiss\b",
        r"\bdurotherm\b", r"\bduerr\b", r"\bdürr\b", r"\beisenmann\b", r"ensinger",
        r"\bflex-elektrowerkzeuge", r"\bflex\b.*elektrowerkzeuge", r"\bmeva\b", r"\bmilon\b",
        r"\bschalung\b", r"\bschaltschrank\b", r"\bandrang gmbh",
        r"\b(c\.|carl|c\&e) fein\b", r"\bfein\b", r"\bargo\b", r"\bdeloss\b",
        r"renz metallwarenfabrik", r"\baltendorf\b", r"\bjenoptik\b",
        r"\bsick ag\b", r"\bschunk\b", r"\bhomag\b", r"\bweinig\b",
        r"\bliebherr\b", r"\bclaas\b", r"\bagco\b", r"\bbobst\b", r"\bkba\b",
        r"\bkoenig & bauer\b", r"\bmüller martini\b", r"\bdmg mori\b",
        # Erweiterung 2: weitere bekannte Mittelstand-/Industriebrands
        r"\bphoenix contact\b", r"\bpilz\b", r"\brehau\b", r"\brud ketten\b", r"rud ketten",
        r"\broto frank\b", r"\bschüco\b", r"\bschuco\b", r"\bschuler\b", r"\bsika\b",
        r"\bsomfy\b", r"\bstabilus\b", r"\bstora enso\b", r"\bsuspa\b", r"\btarkett\b",
        r"\bthera-trainer\b", r"\btrilux\b", r"\btechnogym\b", r"\bsteinel\b",
        r"\bceratizit\b", r"\bsiedle\b", r"\bs\. siedle\b", r"\bspie\b", r"\bspie gsa\b",
        r"\bschüller möbel\b", r"\bschueller möbel\b", r"\brobert bürkle\b",
        r"\bberger group\b", r"\bberlac\b", r"\bbuse\b", r"\bbernd siegmund\b",
        r"\bblaser group\b", r"\bbuchanan\b", r"polyfin", r"poly-clip", r"\bpöttker\b",
        r"\bqiagen\b", r"prodrive", r"recom gmbh", r"riehle.{0,5}assoz",
        r"\bschramm\b", r"\bsiegelwerk\b", r"\bschiesser\b",
    ]),
    ("moebel_interior", [
        r"häfele", r"haefele", r"hafele\b", r"hülsta", r"hulsta", r"rolf benz", r"vitra\b",
        r"interlübke", r"interluebke", r"rosenthal", r"villeroy", r"holzmanufaktur",
        r"\bmöbel\b", r"\bmoebel\b", r"philip möbel", r"\beinrichtungspartner\b", r"\bvme\b",
        r"woodblock", r"\bopus\b", r"\bbette\b", r"\balape\b", r"\begger holzwerkstoffe",
        r"fritz egger", r"\bbock 1\b", r"\bbette\b", r"\bdornbracht\b", r"\bhansgrohe\b",
        r"\bgrohe\b", r"\bduravit\b", r"\bvilleroy\b", r"\bsedus\b", r"\bwilkhahn\b",
    ]),
    ("medtech_pharma", [
        r"fresenius", r"\bxenios\b", r"basf\b", r"\bmerck\b", r"\bbayer\b", r"boehringer",
        r"sartorius", r"medtech", r"medizin", r"pharma", r"\bsanofi\b", r"\broche\b",
        r"draeger", r"dräger", r"biotronik", r"brainlab", r"dentsply", r"dentaurum",
        r"\bdr\. grandel\b", r"amann girrbach", r"\bbarmer\b", r"\baok\b", r"medira",
        r"elvation medical", r"\bbiotech\b", r"\biotronik\b", r"\bbiontech\b",
        r"\bcurevac\b", r"\bevonik\b", r"\bsiemens healthineers\b", r"\bsiemens heal",
        r"\bvarian\b", r"\babbott\b", r"\bb braun\b", r"\bbraun melsungen\b",
        r"\bzimmer\b", r"\bstryker\b", r"\bmedtronic\b", r"\bcoloplast\b",
        r"\bqiagen\b", r"team gesundheit",
    ]),
    ("energie", [
        r"enbw\b", r"stadtwerke", r"e\.on", r"\beon\b", r"\brwe\b", r"vattenfall", r"\bmvv\b",
        r"sw stuttgart", r"netze bw", r"\balbwerk\b", r"\bsiemens energy\b", r"\buniper\b",
        r"\bewe\b", r"\benercon\b", r"\bnordex\b", r"\bsenvion\b", r"\bsma\b",
    ]),
    ("software_tech", [
        r"\bitc\b", r"intelligent training", r"collective mind", r"\bqatna\b",
        r"drees & sommer", r"drees\b", r"\bcomputerdienst", r"\bcodebox\b",
        r"\bbim\s*systems\b", r"\bbim²\b", r"\baltium\b", r"\bsap\b", r"\bibm\b",
        r"\bacer\b", r"alcatel", r"\boracle\b", r"\bmicrosoft\b", r"\bgoogle\b",
        r"\baws\b", r"\bnvidia\b", r"\bunity\b", r"\bepic games\b", r"\bdirectus\b",
        r"\bnaconα\b", r"\bnacona\b", r"lightword productions", r"\bspatial\b",
        r"\bblubb.media\b", r"\b24passion\b", r"\bbleech\b", r"\bbecklyn\b",
        r"\bbaensch\+weh\b", r"\bb:dreizehn\b", r"\bbitbetrieb\b", r"\bbitmapboogie\b",
        r"\bentrecode\b", r"\bdigiraster\b", r"\b0711 büro\b", r"\b0711 digital\b",
    ]),
    ("mode_lifestyle", [
        r"\bhugo boss\b", r"\bjazzopen\b", r"\balte post nagold\b", r"\bbody ?bike\b",
        r"\bbodybike\b", r"\badidas\b", r"\bpuma\b", r"\bgore-tex\b", r"\bortovox\b",
        r"\bjack wolfskin\b", r"\bbenu\b", r"\bs\.?oliver\b", r"\bgerry weber\b",
        r"\bbrax\b", r"\bcecil\b", r"\bbetty barclay\b", r"\bmarc cain\b",
        r"erlebnispark tripsdrill", r"galerie schlichtenmaier", r"\bschöffel\b",
        r"\bschoeffel\b", r"sushi bikes", r"\bschoeffel pro\b",
    ]),
    ("medien_audio", [
        r"\bswr\b", r"beyerdynamic", r"medienfokus", r"\bmfg\b", r"sks russ",
        r"dsv gruppe", r"\bsüdwestrundfunk\b", r"\bsuedwestrundfunk\b",
        r"\bspringer verlag\b", r"av edition", r"\bnacona\b",
        r"\brecom film\b", r"\bbakery films\b", r"\bdietrich film\b",
    ]),
    ("messe_event", [
        r"world money fair", r"\brx\b", r"reed exhibitions", r"messe frankfurt",
        r"messe nürnberg", r"messe nuernberg", r"messe münchen", r"yontex",
        r"jangled nerves", r"lokstoff", r"\bkubus\b", r"\bevent\b", r"\bevents\b",
        r"\bschauwerk\b", r"\bdemi promotion\b", r"deutsche messe ag",
        r"t\.i\.m\.e\. veranstaltung",
    ]),
    ("mobilitaet_oeffentlich", [
        r"\bssb\b", r"stuttgarter straßenbahn", r"\bdb netz\b", r"deutsche bahn",
        r"\bvvs\b", r"flughafen stuttgart", r"\blufthansa\b",
    ]),
    ("finance_banking_versicherung", [
        r"\bsparkasse\b", r"\blbbw\b", r"\bvolksbank\b", r"\bsfg\b", r"\bsparkassen\b",
        r"baden-württembergische bank", r"\bing\b", r"\bcommerzbank\b", r"deutsche bank",
        r"\bpernod\b", r"\ballianz\b", r"\baxa\b", r"\bsv sparkasse\b",
        r"\bgenossenschaftsbank\b", r"\bvr bank\b", r"\bteambank\b", r"\bdkb\b",
        r"\bn26\b", r"\bcomdirect\b", r"\bdwp bank\b", r"\bberenberg\b",
        r"\bkpmg\b", r"\bpwc\b", r"\bdeloitte\b", r"ernst.{0,3}young", r"\bey\b",
        r"\bbcg\b", r"mckinsey",
    ]),
    ("hotellerie_tourismus", [
        r"\bhotel\b", r"\btourismus\b", r"\biha\b", r"\bsteigenberger\b",
        r"\bmaritim\b", r"\bnh hotels\b", r"\bnh hotel\b", r"\bmotel one\b",
    ]),
    ("kreativ_agentur", [
        r"agentur", r"\bdesignerdock\b", r"\bansel.{0,3}möllers\b", r"\bansel & möller\b",
        r"\bansel.{0,3}moeller\b", r"\bb\.?rex\b", r"\bbruce b\.\b", r"freelancer",
        r"\bcommunication\b", r"\bcorporate\b", r"\bcross.{0,3}büro\b", r"\bbüro für\b",
        r"\bbuero für\b", r"\bbüro\s+für\b",
    ]),
    ("legal_consulting", [
        r"rechtsanwält", r"rechtsanwalt", r"anwalts", r"\bafr\b.*recht", r"\bfmr\b.*recht",
        r"\bsteuerberat", r"\bberatung\b", r"\bcoaching\b", r"consulting",
        r"personalberatung", r"\bekg\b", r"\bbarbara schneider.{0,3}partner",
    ]),
]


def normalize(s: str) -> str:
    if not s:
        return ""
    s = unicodedata.normalize("NFKD", s)
    return s.lower()


def classify_industry(name: str) -> str:
    n = normalize(name)
    for industry, patterns in INDUSTRY_RULES:
        for pat in patterns:
            if re.search(pat, n):
                return industry
    return "other"


def anonymize(name: str, kind: str) -> str:
    """Stable anonymized placeholder for demo data."""
    if not name:
        return ""
    h = hashlib.sha1(name.encode("utf-8")).hexdigest()[:6]
    return f"{kind}-{h}"


def parse_workbook(path: Path) -> tuple[list[dict], list[dict]]:
    wb = load_workbook(path, data_only=True)
    full = []
    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        current_company = None
        for row in ws.iter_rows(min_row=2, values_only=True):
            position, vorname, nachname, mobil, telefon, email, mail_ok, phone_ok, notiz = (row + (None,) * 9)[:9]

            # Company-header row pattern: position has a value, all of (vorname, nachname, email) empty
            if position and not vorname and not nachname and not email and not telefon and not mobil:
                current_company = {
                    "company": str(position).strip(),
                    "source_sheet": sheet_name,
                    "industry": classify_industry(str(position)),
                    "contacts": [],
                    "notes": [],
                }
                full.append(current_company)
                continue

            if not current_company:
                # Stray contact without company header — skip but log
                continue

            # All-empty row
            if not any([position, vorname, nachname, mobil, telefon, email, notiz]):
                continue

            contact = {
                "position": (str(position).strip() if position else ""),
                "first_name": (str(vorname).strip() if vorname else ""),
                "last_name": (str(nachname).strip() if nachname else ""),
                "mobile": (str(mobil).strip() if mobil else ""),
                "phone": (str(telefon).strip() if telefon else ""),
                "email": (str(email).strip() if email else ""),
                "mail_consent": mail_ok == "☑",
                "phone_consent": phone_ok == "☑",
                "notes": (str(notiz).strip() if notiz else ""),
            }
            current_company["contacts"].append(contact)

    return full, []


def build_demo(companies: list[dict]) -> list[dict]:
    """Anonymized version safe to commit to repo."""
    demo = []
    for c in companies:
        demo.append({
            "company": anonymize(c["company"], "Company"),
            "source_sheet": c["source_sheet"],
            "industry": c["industry"],
            "contacts": [
                {
                    "position": ct["position"][:30],  # role can stay (generic)
                    "first_name": anonymize(ct["first_name"], "First") if ct["first_name"] else "",
                    "last_name": anonymize(ct["last_name"], "Last") if ct["last_name"] else "",
                    "mobile": "+49 *** *******" if ct["mobile"] else "",
                    "phone": "+49 *** *******" if ct["phone"] else "",
                    "email": f"contact@{anonymize(c['company'], 'co')}.example" if ct["email"] else "",
                    "mail_consent": ct["mail_consent"],
                    "phone_consent": ct["phone_consent"],
                    "notes": "(redacted)" if ct["notes"] else "",
                }
                for ct in c["contacts"]
            ],
            "notes": [],
        })
    return demo


def main():
    companies, _ = parse_workbook(SOURCE)
    PRIV_OUT.parent.mkdir(parents=True, exist_ok=True)
    SEED_OUT.parent.mkdir(parents=True, exist_ok=True)
    PRIV_OUT.write_text(json.dumps(companies, ensure_ascii=False, indent=2), encoding="utf-8")
    SEED_OUT.write_text(json.dumps(build_demo(companies), ensure_ascii=False, indent=2), encoding="utf-8")

    # Summary
    total_companies = len(companies)
    total_contacts = sum(len(c["contacts"]) for c in companies)
    by_industry: dict[str, int] = {}
    for c in companies:
        by_industry[c["industry"]] = by_industry.get(c["industry"], 0) + 1
    print(f"✓ {total_companies} Firmen, {total_contacts} Kontakte importiert")
    print(f"  → {PRIV_OUT}")
    print(f"  → {SEED_OUT}")
    print("\nBranchen-Verteilung:")
    for ind, n in sorted(by_industry.items(), key=lambda x: -x[1]):
        print(f"  {ind:24s} {n:4d}")


if __name__ == "__main__":
    main()
