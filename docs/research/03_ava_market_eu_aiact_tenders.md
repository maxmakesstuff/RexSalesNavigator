# Recherche-Bericht 03 — AVA-Markt, EU AI Act, DACH-Tender 2026
**Stand:** 25.05.2026
**Auftrag:** Wettbewerbsanalyse + EU AI Act-Hebel + DACH-Use-Cases + öffentliche Vergabe + Funnel-Empfehlung für ai-avatars.de

---

## A. Wettbewerbslandschaft AVA Mai 2026

### A.1 Globale Volumen-Player (US/UK, Cloud-only)

**HeyGen** (San Francisco)
- LiveAvatar-Slots Solo $49/Mo bzw. $480/Jahr, Enterprise Custom mit Dedicated Account Manager
- Live-Streaming ~$0,10/Min, WebSocket/WebRTC (LiveKit)
- USP: schiere Avatar-Vielfalt, große Marketing-Reichweite
- **Schwäche:** keine On-Prem-Option, US-Daten, schlechte Low-Bandwidth-Adaption, Realismus mittel

**Synthesia** (London)
- Version 3.0 (Okt 2025) mit Express-2-Engine (1080p/30fps, Full-Body, Mikro-Expressionen)
- 2026: "Video Agents" — Echtzeit-Dialog-Avatare mit SharePoint/Drive/CRM-Konnektoren
- Pricing: $29 Starter, $89 Creator, Enterprise custom (Vendr-Median ~$30k/Jahr)
- Custom-Avatar: zusätzlich $1.000/Jahr pro Avatar, 2–3 Wochen Produktion
- Enterprise: SAML/OIDC SSO, AES-256/AWS KMS FIPS-140-2, Content-Authenticity-Initiative
- **Schwäche:** AWS-only, kein On-Prem, EU-Datenresidenz nur über AWS-Region, keine Edge-Bereitstellung

### A.2 Real-Time Conversational Avatar APIs ($/Min-Markt)

| Anbieter | $/Min | Transport | Realismus | Stärke | Schwäche |
|---|---|---|---|---|---|
| **Simli** | 0,009 | WebRTC Daily | Gut | Latenz-besessen, billigster | Niedrige Bitrate |
| **bitHuman** | 0,01–0,04 | LiveKit | OK | Edge/local deploy | Sichtbar lower-quality |
| **Hedra** | 0,05–0,07 | LiveKit | Gut | Live Avatars seit Feb 2026 — 15× günstiger | Niedrige Auflösung |
| **BeyondPresence** | 0,085–0,35 | LiveKit | Gut | Custom-LLM, Vision, Analytics, **München GmbH** | Artefakte |
| **HeyGen** | 0,10 | LiveKit | Gut | Framework-Support | Low-Bandwidth |
| **Anam** | 0,18 (Pro €0,11) | Pion | Sehr gut | Emotional intelligence | Slow joining |
| **Lemon Slice** | 0,21 | Daily | Sehr gut | Style-Variety | Freezing |
| **Tavus** | 0,32 | Daily | Gut | Perception, Memory, Guardrails | Mundbewegung |
| **D-ID** | 0,35 | Janus | Gut | >50% Fortune 100 | Latenz |
| **Soul Machines** | n/a | – | – | **TOT (Receivership 5.2.2026)** | Game over |

### A.3 Soul Machines — der Marktbeben-Faktor

**Status definitiv:** Am 5. Februar 2026 wurde Soul Machines Ltd. in voluntary receivership gestellt. KPMG-Insolvenzpraktiker verwalten den Verkauf. Über US$135 Mio. eingesammelt, nur ~$12 Mio. Cash übrig. **Stand 25.5.2026: Kein Nachfolger angekündigt.** Air New Zealand, ANZ Bank und Mercedes-Benz hatten bereits vorher die Plattform verlassen.

→ **Marquee-3D-Avatar-Lücke im Enterprise-Segment ist OFFEN.** UneeQ erbt teils, NVIDIA ACE teils — **Made-in-Europe/On-Prem-Slot ohne starken globalen Anbieter**.

### A.4 UneeQ & NVIDIA — Hochpreis-Premium

- **UneeQ** (Auckland/USA, Ex-Soul-Machines-Mitgründer): ab ~$899/Mo Starter, $10k–$50k Setup, Enterprise custom. **Einziger US-Anbieter mit expliziter On-Prem-Option** über proprietäre Synanim-Animation. Dell, T-Mobile, Qatar Airways live. **Schwäche:** 3D wirkt erkennbar synthetisch (vs. MetaHuman bei AVA), AWS-Marketplace-only, keine EU-Niederlassung.
- **NVIDIA ACE / Tokkio:** AI Blueprint, kein Endprodukt. Über Partner ausgerollt (Convai, Inworld, UneeQ, Quantiphi). AT&T mit Quantiphi als Public-Reference. Braucht NVIDIA-GPU-Infrastruktur — attraktiv für On-Prem-EU, aber Integrations-komplex.

### A.5 EU/On-Prem-fähige Anbieter

- **Beyond Presence GmbH (München)** — $3,1M Seed (TechCrunch Okt 2024). Echtzeit-Avatare, attraktive Preise, deutsche Jurisdiktion — Hosting **nicht explizit on-prem**. **Gefährlichster deutscher Direktwettbewerber für AVA.**
- **RAVATAR (Schweiz/EU)** — bewirbt "on-premise deployment" für Datensouveränität, 3D-Avatare Web/Kiosk/Hologram. Mid-Market.
- **bitHuman** — Edge/local, niedrige Quality — Kostendrücker, qualitativ unter AVA.
- **Convai / Inworld** — Convai bis €1.199/Mo public; Inworld Enterprise mit EU-Data-Residency, HIPAA/BAA, VPC, on-prem. Stark im Gaming/NPC, schwach im Behörden-Vertikal.
- **Akool, DeepBrain AI, Charisma.ai** — Cloud-only, kein On-Prem-Story für EU.

### A.6 Lokale Wettbewerber DACH-Verwaltung

- **evocenta GmbH** mit **EMMA®AI Streaming Avatar** — Pilot Stadt Gelsenkirchen (270k EW), Weltpremiere SCCON 2024.
- **AIdentical** (Stuttgart/Hessen) — Bürgermeister-Avatare, Pilot Büttelborn, 4–5k Setup + 500–2k €/Mo. Entwickler Stefan Klink.
- **Aleph Alpha** (Heidelberg) — kein Avatar, aber DE-Sovereign-AI-Reference (PhariaAI, BaWü/Bayern-Verträge). **Potenzieller LLM-Partner**, nicht Konkurrent.
- **Bundesdruckerei "Assistent.iQ"** — Text-Assistent. Behörden-Procurement-Inhaber, der schnell pivoten könnte.

### A.7 MARKTLÜCKE 2026 — was niemand sauber liefert

> **AVA besetzt diese Lücke einzigartig:**
> 1. **Highend-3D-fotorealistisch + On-Prem + EU-Jurisdiktion + EU-AI-Act-konform in EINEM Paket.** Niemand sonst.
> 2. **MetaHuman/Unreal-Niveau als Service** — kein EU-Anbieter spielt in der Render-Liga.
> 3. **Lokale LLMs (Gemma quantisiert) als Default.** Bundesdruckerei macht "sovereign", aber ohne Avatar.
> 4. **Fraunhofer-Endorsement** — wissenschaftliche Glaubwürdigkeit, die kein Wettbewerber matcht. LAIA²-Modell als Quasi-Standard.
> 5. **Behörden-fähige Procurement-Reife** — DSGVO, BSI-Schutzbedarf "hoch", EU-AI-Act-Compliance out-of-the-box.

---

## B. EU AI Act Artikel 50 ab 2. August 2026

### B.1 Was Artikel 50 verlangt
- **Art. 50(1):** Anbieter direkt mit Menschen interagierender KI-Systeme (Chatbots, Voice Assistants, **AI-Avatare**, NPCs) müssen offenlegen, dass es eine KI ist — _bei erster Interaktion_, nicht in versteckten AGB.
- **Art. 50(2):** Generative KI muss Outputs maschinen-lesbar als künstlich markieren (Watermarking).
- **Art. 50(3):** Deployer von Emotion-Recognition / Biometric Categorisation müssen Betroffene informieren.
- **Art. 50(4):** **Deepfake-Deployer** müssen explizit kennzeichnen.

**Sanktionen:** bis **15 Mio. € oder 3% Welt-Jahresumsatz** (Art. 99(4)).

EU-Kommission veröffentlicht **Juni 2026** finalisierten Code of Practice für Marking/Labelling (2 Monate vor Wirksamkeit) — diesen müssen AVA-Käufer-Briefings aufgreifen.

### B.2 Pflichten ab 2.8.2026 für AVA-Käufer
1. Point-of-Interaction-Disclosure auf Avatar-UI (sichtbar, nicht im Footer)
2. Konformitätsbewertung wenn als High-Risk eingestuft
3. Logging-Pipeline (Art. 12)
4. Deployer-Doku — DPIA, Risikoanalyse, menschliche Aufsicht (Art. 26)
5. Provenance-Watermark für generiertes Audio/Video
6. GPAI-Modell-Dokumentation wenn LLM-Backend ein GPAI-Modell nutzt

### B.3 Compliance-Druck nach Branche

| Branche | Druck | Begründung |
|---|---|---|
| **Banken/Versicherer** | Sehr hoch | BaFin + AI Act + DORA Doppelregulierung |
| **Öffentliche Verwaltung** | Sehr hoch | Annex III High-Risk wenn Sozialleistungen/Bildung, KoKIVO-Aufsicht |
| **Medtech/Pharma** | Sehr hoch | MDR + AI Act, Annex III Medical Devices |
| **Energie/Stadtwerke** | Hoch | Kritische Infrastruktur (NIS2), Endkundeneffekt |
| **Industrie/Maschinenbau** | Mittel | B2B-fokussiert, weniger Verbraucher |
| **Hotellerie/Tourismus** | Niedrig-Mittel | Verbraucher-Disclosure |

### B.4 Vertriebs-Wedge für Bruce B./AVA

> **"AVA ist der erste deutsche Avatar, der ab 2.8.2026 ohne Nachbesserung produktiv geht."**

- **AI-Act-Pack inklusive:** Disclosure-Overlay, Logging, DPIA + Annex IV Tech-Doc-Template, Watermarking — alles enthalten
- **Lokale Gemma-Inferenz** → kein Drittland-Transfer (Schrems-II-sicher, was Synthesia/HeyGen nicht garantieren können)
- **Fraunhofer-Co-Authorship** → wissenschaftlicher Beleg für "state of the art" (Art. 9 AI Act)
- **MetaHuman-Niveau on-prem** — niemand sonst kombiniert das

**Kampagnen-Hook:** **"60 Tage bis 2.8.2026 — ist Ihr Avatar AI-Act-konform?"** — an CISOs/Datenschutz-Beauftragte/Legal Counsel.

---

## C. DACH Use Cases & heiße Accounts Q3 2026

### C.1 Öffentliche Verwaltung (bestätigte Pilots)
- **Büttelborn (Hessen, 15k EW)** — Marcus Merkel als KI-Avatar in 28 Sprachen seit Dez 2025 (AIdentical)
- **Gersthofen (Bayern)** — Gersti (24/7 Bürgerservice) + CAIA (lebensgroßer Hallenbad-Avatar)
- **Berlin, Krefeld, Nettetal** — Gebärdensprach-Avatare
- **Darmstadt-Dieburg** — preisgekröntes Video-News-Format
- **Hinte (Niedersachsen)** — Prüfauftrag April 2026
- **Gelsenkirchen (NRW, 270k EW)** — evocenta EMMA®AI produktive Pilot, Skalierung 2026

**Procurement-Cycle laufend:** BMDS **Agentic AI Hub** seit März 2026 — 17 Kommunen + 10 Start-ups ausgewählt aus 600 Bewerbungen. **Welle 2 erwartbar Q4 2026.** Bruce B. muss in Welle 2 dabei sein.

### C.2 Stadtwerke / Energieversorger
- **EnBW** baut bis Ende 2026 BSI-Customer-Suite-AI-Plattform für Service+Sales → **TOP-Hot-Lead für Avatar-Frontend**
- **NEW Netz** — GPT-4 Chatbot beantwortet 95% Anfragen autonom
- **evm Mittelrhein** — Chatbot "Eva", 40k+ Gespräche 2025 → Avatar-Upgrade möglich

PwC-Studie 2026 dokumentiert "PoC-Dilemma" — viele Energieversorger stecken in Pilotphase fest. AVA-Wedge: **produktionsreif mit BSI/Behörden-Standards**.

### C.3 Medtech / Pharma DACH
Wenig spezifische Avatar-Cases. Studien "Digital Human Medication Information" (Rheuma), Avatar-Intervention Stammzelltransplantation. Bayer/Boehringer haben aktive GenAI-Strategien, kein öffentlicher Avatar-Pilot.

**Wedge:** Medical Device Avatar als Patient-Education-Tool, EU MDR + AI Act compliant. **Targets:** Roche (Mannheim/Penzberg), Boehringer Ingelheim, Merck Darmstadt, Fresenius, B. Braun.

### C.4 Industrie / Maschinenbau
- **Bosch (Hannover Messe 2026)** — any.site KI-Netzwerk + Manufacturing Co-Intelligence (mit Microsoft). Wartungs-Assistenten.
- **Siemens Industrial Copilot** — Predictive Maintenance, Engineering Agent, 25% Reaktivzeit-Reduktion.
- **Trumpf & Festo** — AI in Produktion bestätigt
- **VDMA Praxistag KI 18.6.2026** — Veranstaltung als Lead-Quelle

**Wedge:** AVA als "Service-Expertise-Twin" für ältere Service-Techniker, deren Knowhow vor Renten-Welle digitalisiert werden muss. **Targets:** Trumpf, Festo, Heidelberger Druck, Liebherr, Voith, Dürr, Stihl.

### C.5 Banking DACH
- **Sparkassen-Finanzgruppe / Finanz Informatik** — **S-KIPilot** an alle 150k Sparkassen-Mitarbeitende ausgerollt. Aber: **kein Avatar-Frontend!** Hebel: Pilot mit 1 Sparkasse → Verbund-Skalierung über Finanz Informatik.
- **Linda** (Sparkassen-Kunden-Chatbot) → Self-Service-Agent Ausbau bis 2025
- **Allianz** + Anthropic-Partnership, >900 KI-Apps gruppenweit
- **Deutsche Bank** + TCS — Compliance-Digital-Assistant
- **Techniker Krankenkasse** — **KI-Avatar "Vanessa"** im sayHELLO-Service für ausländische Fachkräfte. **Direkter Avatar-Konkurrenz-Case!** Upgrade-Potenzial.

### C.6 Hotellerie / Tourismus
- **Österreich Werbung "Amelia/Sisi"** — Avatar mit Mixed Reality AI + HeyGen, ITB 2025
- **Hotelleriesuisse Wallis** — "KI-Booster" Pilot 15 Hotels bis Ende 2026
- Vienna Hotel Pilot war im Sales-Monolog erwähnt — **konnte nicht öffentlich verifiziert werden**

**Wedge:** AVA als **Premium-3D-Konzierge** für 5-Sterne-Häuser, die HeyGen-Optik als "zu generisch" empfinden. **Targets:** Kempinski, Steigenberger, Schlosshotel Lerbach, A-ROSA, Adlon, Bayerischer Hof, Brenners Park-Hotel Baden-Baden.

---

## D. Öffentliche Vergabe DACH

### D.1 Plattformen-Hierarchie

| Plattform | Reichweite | Avatar-Relevanz |
|---|---|---|
| evergabe-online.de (Bund) | Alle Bundesvergaben | Mittel — IT-Dienstleister-Rahmenverträge |
| service.bund.de | Alle Bund/Behörden | Hoch — direkte Suche |
| **DTVP** | ~100% deutscher Auftraggeber | **Höchste Trefferdichte** |
| Vergabe24 (BW) | BW + multiple | Mittel — KMU-orientiert |
| TED (EU) | EU-weit > Schwellen | Pflicht > €221k |
| vergabe.NRW.de | NRW | Hoch — viele Kommunen |
| vergabe.bayern.de | Bayern | Hoch |

### D.2 CPV-Codes für Avatar/KI-Beratung

| CPV | Beschreibung |
|---|---|
| **72224000-1** | IT-Beratung |
| **72220000-3** | Systems & Tech Consulting |
| **79410000-1** | Unternehmens-/Managementberatung |
| **72330000-2** | Inhalts-/Daten-Standardisierung |
| **48000000-8** | Software-Pakete |
| **79340000-9** | Werbe-/Marketingdienste (für "Imagekampagnen + Avatar") |
| **72000000-5** | IT-Dienstleistungen |
| **80500000-9** | Schulungsdienstleistungen |

**Suchbegriffe:** "KI-Avatar", "digitaler Bürgermeister", "virtueller Assistent", "Streaming Avatar", "Chatbot Verwaltung", "Conversational AI", "Wissensassistent", "digital twin", "KI-Beratung", "generative KI Pilot".

### D.3 Realität der Trefferquote
- Bei KI-Aufträgen liegt die Quote vorgeprägter Vergaben hoch (>50%) — Bundesdruckerei, Materna, Capgemini, T-Systems, msg systems sind Stamm-Lieferanten.
- **Echter Wettbewerb** eher bei Kommunen <100k EW und Länder-IT-Stellen, Volumen <€221k (Verhandlungsvergabe ohne EU-Veröffentlichung).
- **Strategie:** Nicht gegen IBM/Accenture im TED-Großauftrag bewerben. Stattdessen über **Innovationspartnerschaften (§19 VgV)** und **freihändige Vergaben** in Pilot-Kommunen einsteigen.

### D.4 Innovationsprogramme & GovTech-Hebel 2026
- **KI-Reallabore (BNetzA/KoKIVO)** — gesetzlich vorgeschrieben mind. eines bis 2.8.2026, Pilot 2025/26 mit Hessen + BfDI abgeschlossen → **Bewerbung für Avatar-Reallabor möglich**
- **Agentic AI Hub (BMDS)** — Welle 1 abgeschlossen, **Welle 2 Q4 2026 erwartbar**
- **Tech4Germany / Work4Germany (DigitalService)** — Fellowship-Programme
- **Civic Coding** (BMAS/BMFSFJ/BMUKN + BMDS) — Förderung KI für Gemeinwohl
- **GovTech Campus Deutschland Berlin** — Mitgliedschaft als Marketing-Hebel
- **KI-Innovationswettbewerb BMWK** — Folgeaufruf erwartet
- **Smart Country Convention Berlin 13.–15.10.2026** — Leitkonferenz, **Speaker-Slot beantragen JETZT**

---

## E. ai-avatars.de Funnel-Empfehlung

### E.1 Was Wettbewerber gut machen
- **heygen.com:** Auto-spielendes Avatar-Demo Hero, 30s "How it works", 5 Pricing-Tiers, Enterprise-Request, Logo-Wall
- **synthesia.io:** Pricing-Slider mit Volumen-Rechner, "Get demo" CTAs überall, Enterprise-Spalte mit Sicherheits-Badges
- **tavus.io:** **Embeddable iframe demo widget** auf Landingpage — Besucher sprechen sofort mit dem Avatar! **Wirksamste Conversion-Methode**
- **uneeq.com:** Industrie-Microsites (Banking, Healthcare, Insurance), prominente Cases, "Build a digital human" Konfigurator

### E.2 Konkrete Empfehlung für ai-avatars.de (€30k–€500k Tickets)

**Hero (Above the Fold):**
- **Live-AVA-Demo-Widget** (klick→sprich, kein Signup — Tavus-Style). MetaHuman-Render zeigt Premium-Niveau. Ziel: emotionaler "Wow" in 5 Sek.
- H1: **"Der einzige Avatar, der ab 2.8.2026 ohne Nachbesserung in Ihre Behörde geht."**
- Subline: "Made in Germany. EU-AI-Act-konform. On-Prem. Co-entwickelt mit Fraunhofer IAO."
- CTA primär: "Live-Demo buchen (15 Min)" → Cal.com Embed direkt auf Seite
- CTA sekundär: "AI-Act-Self-Check starten" → ROI/Compliance-Calculator als Lead-Magnet

**Trust-Bar:**
- Fraunhofer IAO Logo + Quote
- LAIA²-Stufen-Erklärung als visuelles Differenzierungselement
- Pilot-Kunden-Logos + Bundesländer
- BSI Schutzbedarf "hoch", DSGVO, EU-AI-Act-Siegel

**Vertikal-Switcher** (eigene Microsite mit Sub-Pricing):
- Verwaltung & Bürgerservice
- Banking & Versicherung
- Industrie & Maschinenbau
- Hotellerie & Tourismus
- Medtech & Pharma
- Bildung & Forschung

**Mid-Page: ROI-Calculator**
Interaktiv: Anzahl Bürger-/Kundenanfragen/Monat × Bearbeitungszeit × Stundensatz Personal → ROI in Monaten + CO₂-Einsparung. Abschluss "Custom-Report per E-Mail" → Lead-Capture.

Begründung: Interactive Content → 2× höhere Conversion vs. statisch; Buyer die selbst Business-Case bauen kaufen 2,1× häufiger.

**Calendar-Embed:** Cal.com mit Direkt-Slots, max. 2-Klick-Booking.

**Compliance-Pack-Download:** "Whitepaper: AVA & EU AI Act Art. 50 — Checkliste für Ihren DPO" (PDF gegen Email). Drives Inbound aus CISO/DPO-Community.

**Pricing:** **kein Public-Pricing** (Enterprise-Strategie). Drei Pakete "Pilot / Productive / Sovereign Enterprise" mit Feature-Liste und Custom-Quote-CTA.

**Conversion-Benchmarks:** $75k+ ACV → 1,5–3% Demo-Conversion realistisch. Bei 5.000 Monatsbesuchern → 75–150 Demos → 10–20 Pipeline-Opportunities → 2–4 Deals/Quartal.

### E.3 Off-Page Lead-Quellen
- LinkedIn ABM auf CISOs/CDOs/Bürgermeister mit AI-Act-Hook
- Newsletter "AVA-Briefing" monatlich an Behörden-Verteiler
- Smart Country Convention 13.–15.10.2026 Berlin — Booth + Speaker-Slot
- Hannover Messe / IT-TRANS / Bits&Pretzels als Industrie-Plays
- VDMA Praxistag KI 18.6.2026 als Maschinenbau-Hebel

---

## F. Top-10 Hot-Accounts Q3 2026 (für AVA-Pipeline)

| # | Account | Branche | Begründung | Door-Opener |
|---|---|---|---|---|
| **1** | **EnBW AG** (Karlsruhe) | Energie | Baut bis Ende 2026 BSI-AI-Plattform für Service+Sales, sucht Frontend-Layer — perfektes Avatar-Upgrade. BaWü-Nähe. | CIO/CDO + Head of Customer Service, Referenz Fraunhofer |
| **2** | **Sparkassen-Finanzgruppe via DSGV** (Berlin) | Banking | S-KIPilot live, aber Filial-Avatar fehlt. 150k MA, 50M Kunden. Pilot mit 1 Sparkasse → Verbund-Skalierung über Finanz Informatik. | Vorstand DSGV Digitalisierung |
| **3** | **Stadt Stuttgart / Landeshauptstadt** | Verwaltung | Lokaler Heimvorteil, Bezug Fraunhofer IAO, 600k EW — Bürgerservice-Avatar als Leuchtturm-Case BaWü. | OB Frank Nopper, Stadtmodernisierungs-Referat |
| **4** | **Techniker Krankenkasse** (Hamburg) | GKV | Hat Vanessa-Avatar (sayHELLO) — Upgrade-Potenzial auf MetaHuman-Niveau. Premium-Spend-Bereitschaft. | TK Innovationszentrum, CDO |
| **5** | **Bayern Innovativ / Freistaat Bayern** | Verwaltung | Aleph-Alpha-Vertrag bestätigt KI-Aufgeschlossenheit. Avatar für Bürgerservice via StMD ausschreibbar. | Staatsministerium für Digitales |
| **6** | **Boehringer Ingelheim** | Pharma | Aktive GenAI-Initiativen, Patient-Education-Avatar für MDR + AI Act compliant ein Differenziator. | Head of Digital Health Innovation |
| **7** | **Trumpf GmbH** (Ditzingen) | Maschinenbau | AI-Vorreiter (Maschinenbau-Gipfel-Speaker), Service-Avatar für Wartungs-Knowhow älterer Techniker. **Standort Stuttgart-Region!** | CDO/Head of Service |
| **8** | **DAK-Gesundheit / AOK BaWü** | GKV | Konkurrenzdruck nach TK-Vanessa, hohe Mehrsprachigkeits-Anforderung in BaWü. | Vorstand Digitalisierung |
| **9** | **Gelsenkirchen / NRW-Kommunen-Verbund** | Verwaltung | Bereits EMMA®AI-User → Cross-Sell "Premium-3D-Upgrade" für Bürgerbüros mit Touchscreen-Stelen. | Kommunalleitung IT, KGSt-Netzwerk |
| **10** | **Brenners Park-Hotel Baden-Baden / Oetker Collection** | Luxushotellerie | 5-Sterne brauchen Premium-Render (HeyGen zu generisch), Mehrsprachen-Konzierge für arab./asiat. Gäste. BaWü-Standort. | GM, Group CMO Oetker Collection |

**Backup-Tier (11–15):** Bosch Power Tools / Service, Lufthansa / DLH Service, Allianz Vorsorgewelt, Bundesdruckerei (als Channel-Partner!), Wiener Stadtwerke / Wien Energie

---

## G. Wichtigste Hinweise & Risiken
1. **Soul Machines Successor-Status** offen — falls UneeQ oder NVIDIA die Assets kaufen, kann sich Premium-Wettbewerb verschärfen. Monitoring nötig.
2. **Vienna Hotel Avatar Pilot** konnte nicht öffentlich verifiziert werden — Quelle bitte nachreichen.
3. **Beyond Presence (München)** ist der ernstzunehmendste deutsche Direktwettbewerber — Sales-Decks brauchen explizite Differenzierung MetaHuman/Unreal-Render + Fraunhofer-Endorsement + On-Prem-Story.
4. **AI Act Code of Practice für Labelling** wird Juni 2026 finalisiert — Compliance-Pack muss kurzfristig nachgezogen werden.
5. **Pricing-Anker:** AIdentical liefert 4–5k Setup + 0,5–2k/Mo — AVA muss Premium-Story bauen (Render-Qualität, Fraunhofer, On-Prem), um 5-stellige Pilot-Tickets und 6-stellige Enterprise-Deals zu rechtfertigen.
