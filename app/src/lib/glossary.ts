// Bruce B. Sales Navigator — Glossar
//
// Jeder Begriff bekommt:
//   display:  Wie er typischerweise im Text auftaucht (Suchmuster)
//   aliases:  Weitere Schreibweisen, die als derselbe Begriff erkannt werden
//   short:    Kurze Erklärung (max ~3 Sätze) — was es ist UND warum es für Max relevant ist
//   category: Für eine spätere "Alle Begriffe"-Übersicht
//
// Anwendung: MarkdownView wrappt automatisch alle Treffer in <Term>.
// Hand-codiertem JSX kann ein <Term name="meddpicc">MEDDPICC</Term> manuell hinzugefügt werden.

export interface GlossaryEntry {
  key: string;
  display: string;
  aliases?: string[];
  short: string;
  category: 'sales-framework' | 'sales-metric' | 'sales-people' | 'sales-process' | 'sales-tools' | 'tech-ai' | 'recht' | 'agentur-markt' | 'org';
}

export const GLOSSARY: GlossaryEntry[] = [
  // === Sales-Frameworks ===
  {
    key: 'meddpicc',
    display: 'MEDDPICC',
    aliases: ['MEDDIC'],
    short: 'Checkliste mit 8 Kriterien zur Bewertung, wie ernsthaft ein Deal wirklich ist: Metrics · Economic Buyer · Decision Criteria · Decision Process · Paper Process · Identify Pain · Champion · Competition. Pro Punkt 1–4 Score, max 32. Schützt vor Sales-Wunschdenken — unter 16 ist der Deal nicht qualifiziert.',
    category: 'sales-framework',
  },
  {
    key: 'gap-selling',
    display: 'GAP Selling',
    aliases: ['GAP-Selling', 'GAP'],
    short: 'Verkaufs-Stil: Du fragst nach IST-Zustand → SOLL-Zustand → was kostet die Lücke. Statt zu pitchen, formuliert der Kunde seinen Bedarf selbst. Passt zu Max\' "kann nur schwätzen wenn Bedarf da ist"-Persona — diagnostisch, nicht aufdringlich.',
    category: 'sales-framework',
  },
  {
    key: 'spin-selling',
    display: 'SPIN Selling',
    aliases: ['SPIN'],
    short: 'Klassisches Discovery-Framework von Neil Rackham: Situation → Problem → Implication → Need-Payoff. Vier Frage-Arten in Reihenfolge. Sehr ähnlich zu GAP Selling, nur älter und etwas formaler.',
    category: 'sales-framework',
  },
  {
    key: 'bant',
    display: 'BANT',
    short: 'Alter IBM-Filter: Budget · Authority · Need · Timeline. Funktioniert 2026 für B2B-Big-Tickets schlecht, weil "Authority" eine Fiktion ist (6–10 Stakeholder pro Deal). Nur als Schnell-Filter für eingehende Web-Anfragen brauchbar.',
    category: 'sales-framework',
  },
  {
    key: 'challenger-sale',
    display: 'Challenger Sale',
    aliases: ['Challenger', 'Challenger-Sale'],
    short: 'Modell: erfolgreiche Verkäufer "challengen" den Kunden mit einer datenbasierten Reframe-These ("Sie verschwenden vermutlich X% Marketing-Budget weil…"). Du nutzt es als ein Insight-Deck ("Markenkommunikations-Reset 2026") als Door-Opener vor jedem GAP-Discovery-Call.',
    category: 'sales-framework',
  },
  {
    key: 'sandler',
    display: 'Sandler',
    short: 'Verkaufs-Methodik mit dem "Pain Funnel" als Herzstück: Technical Pain → Business Pain → Personal Pain. Kann im konservativen deutschen Industrie-Kontext die Personal-Ebene zu distanziert wirken — bei Marketing-Kontakten funktioniert es.',
    category: 'sales-framework',
  },
  {
    key: 'abs',
    display: 'ABS',
    aliases: ['Account-Based Selling', 'Account-Based-Selling'],
    short: 'Account-Based Selling: Statt 1.000 Leads breit zu akquirieren, fokussierst du dich auf 30–50 namentlich definierte Wunschkunden ("Tier 1") und arbeitest sie tief und multi-stakeholder durch. Pflicht-Modell für 6–7-stellige Deals.',
    category: 'sales-framework',
  },
  {
    key: 'abm',
    display: 'ABM',
    aliases: ['Account-Based Marketing', 'Account-Based-Marketing'],
    short: 'Account-Based Marketing — das Schwester-Konzept zu ABS aus dem Marketing: Du machst hochpersonalisierte Kampagnen für eine begrenzte Anzahl Ziel-Accounts, statt breite Werbung. Komplementär zu ABS.',
    category: 'sales-framework',
  },

  // === Sales-Prozess / Vokabular ===
  {
    key: 'icp',
    display: 'ICP',
    aliases: ['Ideal Customer Profile'],
    short: 'Beschreibung deines perfekten Wunschkunden in Kriterien — Branche, Größe (MA/Umsatz), Geografie, Buyer-Persona, Trigger. Je schärfer dein ICP, desto weniger Zeit verschwendest du auf falsche Leads. Für Bruce B.: Stuttgart/BW-Mittelstand + Industrie/Public Sector.',
    category: 'sales-process',
  },
  {
    key: 'cadence',
    display: 'Cadence',
    aliases: ['Cadenz', 'Sales-Cadence'],
    short: 'Festgelegte Folge von Kontaktversuchen über mehrere Tage, multi-channel (E-Mail + LinkedIn + Telefon). Bei Bruce B.: 21 Tage, 10 Touches. Verhindert, dass du nach 2 erfolglosen Mails aufgibst, ohne dass du penetrant wirkst.',
    category: 'sales-process',
  },
  {
    key: 'touch',
    display: 'Touch',
    aliases: ['Touches', 'Touchpoint', 'Touchpoints'],
    short: 'Ein Kontaktversuch (E-Mail, LinkedIn-View, Anruf, Brief, persönliches Treffen). Mehrere Touches in einer geplanten Cadence schaffen Vertrauen — ein einzelner Touch konvertiert fast nie. Faustregel: 8–12 Touches pro Account in 21 Tagen.',
    category: 'sales-process',
  },
  {
    key: 'sequence',
    display: 'Sequence',
    aliases: ['Sequenzen', 'Sequenz', 'Sequences'],
    short: 'Eine konkrete Cadence, die du für einen Account oder eine Account-Gruppe gestartet hast. "Sequenz starten" = E-Mail-Tool + LinkedIn-Tool nehmen den Account auf und schicken die Touches automatisch über 21 Tage ab.',
    category: 'sales-process',
  },
  {
    key: 'cold-email',
    display: 'Cold-Email',
    aliases: ['Cold Email', 'Cold-Mail', 'Kaltakquise-Mail'],
    short: 'Erstkontakt-E-Mail an jemanden, mit dem du noch keine Beziehung hast. In DE rechtlich heikel (UWG §7). Geht nur mit konkretem Trigger-Bezug, hyper-personalisiert, klarem Opt-out, niedrigem Volumen. Volumen-Mails ("10k an alle CMOs") sind verboten.',
    category: 'sales-process',
  },
  {
    key: 'cold-call',
    display: 'Cold-Call',
    aliases: ['Cold Call', 'Kaltakquise-Anruf', 'Kaltakquise'],
    short: 'Erst-Telefonat ohne vorherige Beziehung. In DE im B2B prinzipiell erlaubt mit "mutmaßlicher Einwilligung" (UWG §7 Abs 2 Nr 2) — funktioniert bei klarem Branchen-Bezug. Bei dir Teil der Cadence, nicht spontaner Aktionismus.',
    category: 'sales-process',
  },
  {
    key: 'outbound',
    display: 'Outbound',
    short: 'Du gehst aktiv auf Leads zu (E-Mail, Anruf, Brief, LinkedIn). Das Gegenteil von Inbound (wo Leads zu dir kommen). Für Big-Tickets über 100k € braucht Bruce B. beides — Outbound für gezielte Wunschkunden, Inbound für Sichtbarkeits-Hebel wie Awards.',
    category: 'sales-process',
  },
  {
    key: 'inbound',
    display: 'Inbound',
    short: 'Leads kommen zu dir — über Webseite, Empfehlung, Award-Sichtbarkeit, Vortrag, LinkedIn-Content. Bruce B.\'s 20-jähriges Modell. Funktioniert weiter, reicht aber nicht mehr für planbare Big-Ticket-Pipeline.',
    category: 'sales-process',
  },
  {
    key: 'funnel',
    display: 'Funnel',
    short: 'Trichter-Bild: oben viele Kontakte → wenige werden Meetings → noch weniger Qualified Opps → noch weniger gewonnene Deals. Jede Stufe konvertiert nur einen Teil weiter. Hilft dir abzuschätzen, wie viel Top-of-Funnel du brauchst für ein Jahresziel.',
    category: 'sales-process',
  },
  {
    key: 'pipeline',
    display: 'Pipeline',
    short: 'Alle offenen Deals, die du gerade in Bearbeitung hast. Pipeline-Wert × Win-Rate ≈ erwarteter Umsatz. Eine "leere Pipeline" ist das Vertriebs-Frühwarn-Signal #1 — meist 6 Monate zu spät bemerkt.',
    category: 'sales-process',
  },
  {
    key: 'pipeline-coverage',
    display: 'Pipeline-Coverage',
    aliases: ['Coverage'],
    short: 'Verhältnis Pipeline-Wert zu Quartalsziel. 3:1 oder 4:1 = gesund. 1:1 = du erreichst dein Ziel nicht. Wenn dein Q3-Ziel 1 M € ist, brauchst du Pipeline-Wert von 3–4 M € in Bearbeitung.',
    category: 'sales-metric',
  },
  {
    key: 'north-star-metric',
    display: 'North-Star-Metric',
    aliases: ['North Star', 'North-Star'],
    short: 'Die EINE Zahl, die du jede Woche misst und die alles andere steuert. Bei Bruce B.: qualifizierte Pipeline pro Woche (290k €/Woche-Ziel). Hilft, sich nicht in Vanity-Metrics (Klicks, Likes, Follower) zu verlieren.',
    category: 'sales-metric',
  },
  {
    key: 'closed-won',
    display: 'Closed Won',
    aliases: ['Closed-Won'],
    short: 'Deal gewonnen, Vertrag unterschrieben, Auftrag im Buch. Gegenteil: Closed Lost. Hierum geht\'s am Ende.',
    category: 'sales-metric',
  },
  {
    key: 'win-rate',
    display: 'Win-Rate',
    aliases: ['Win Rate'],
    short: 'Anteil gewonnener Deals an den abgeschlossenen (gewonnen + verloren). Bei Professional Services: ~25–35% typisch. Wenn du nur 10% gewinnst, ist entweder dein Lead-Filter zu locker oder dein Pitch zu schwach.',
    category: 'sales-metric',
  },
  {
    key: 'reply-rate',
    display: 'Reply-Rate',
    aliases: ['Reply Rate', 'Antwortrate'],
    short: 'Anteil deiner Mails, die eine Antwort bekommen — egal ob positiv oder negativ. DACH-Industrie-Benchmark: 3–5% solide, 5–8% gut, 10%+ Top-10%. Unter 3% läuft was falsch (meist Targeting oder Subject Line).',
    category: 'sales-metric',
  },
  {
    key: 'conversion-rate',
    display: 'Conversion-Rate',
    aliases: ['Conversion Rate', 'Konversionsrate'],
    short: 'Anteil, der von einer Funnel-Stufe in die nächste übergeht. Z.B. Meeting → Qualified Opp = 35–50%. Pro Stufe gibt es einen eigenen Conversion-Wert.',
    category: 'sales-metric',
  },
  {
    key: 'sales-cycle',
    display: 'Sales Cycle',
    aliases: ['Sales-Cycle', 'Vertriebszyklus'],
    short: 'Zeit vom ersten Kontakt bis zum Vertrag. Bei Bruce-B-Big-Tickets: 6–9 Monate. Bei kleinen Discovery-Workshops: 2–4 Wochen. Wichtig für Forecasting — was du heute akquirierst, kommt erst in 6 Monaten ins Buch.',
    category: 'sales-metric',
  },
  {
    key: 'discovery-call',
    display: 'Discovery Call',
    aliases: ['Discovery-Call', 'Discovery'],
    short: 'Erstgespräch, in dem du den Kunden verstehst — nicht pitches. 30–45 Min, GAP-Selling-Skript, MEDDPICC-Output. Wenn das Discovery in einen Pitch kippt, hast du gerade vertieft, was dich später disqualifiziert.',
    category: 'sales-process',
  },
  {
    key: 'qbr',
    display: 'QBR',
    aliases: ['Quarterly Business Review'],
    short: 'Vierteljährliches Strategie-Gespräch mit Top-Bestandskunden, ~60–90 Min. Kein Sales-Call, sondern Sparring auf Augenhöhe ("Wo wollen Sie 2027 stehen?"). Hebel für Land-and-Expand — Kunde lädt dich freiwillig in den nächsten Auftrag ein.',
    category: 'sales-process',
  },
  {
    key: 'land-and-expand',
    display: 'Land-and-Expand',
    aliases: ['Land and Expand', 'Land & Expand'],
    short: 'Vertriebsstrategie: Erst einen kleinen Auftrag landen ("Land"), dann sukzessive über Jahre ausbauen ("Expand"). Das Häfele-Modell — vom Flyer-Projekt zur 2-M-EUR/Jahr-Beziehung. 5–10× weniger Akquise-Aufwand als immer neue Kunden zu jagen.',
    category: 'sales-process',
  },
  {
    key: 'lead-magnet',
    display: 'Lead-Magnet',
    aliases: ['Lead Magnet'],
    short: 'Ein kleines, klar umrissenes Angebot (z.B. dein 4.900€-Discovery-Workshop), das niedrigschwellig den Einstieg in eine größere Beziehung schafft. Du bekommst ihn rein, lieferst Wert, der Folge-Auftrag kommt fast von alleine.',
    category: 'sales-process',
  },
  {
    key: 'trigger',
    display: 'Trigger',
    short: 'Konkreter Anlass, jemanden anzusprechen: CEO-Wechsel, Markenrelaunch, Pressemeldung, Investor-Update, M&A. Macht Outreach UWG-konform (substantieller Bezug) und persönlich glaubwürdig — kein "Hallo {{firstname}}" mehr.',
    category: 'sales-process',
  },
  {
    key: 'stakeholder',
    display: 'Stakeholder',
    short: 'Person beim Kunden, die in der Entscheidung mitwirkt. Bei B2B-Big-Tickets sind 6–10 Stakeholder typisch — Marketing-Leiter, CMO, GF, Einkauf, Datenschutz, IT, Compliance. Du musst mehrere parallel "warm halten" (Multi-Threading).',
    category: 'sales-people',
  },
  {
    key: 'champion',
    display: 'Champion',
    short: 'Person beim Kunden, die intern für DICH Lobby macht. Ohne Champion bekommst du keinen Deal — er ist der Übersetzer zwischen deiner Lösung und der internen Kundenrealität. MEDDPICC-Frage: "Wer ist mein Champion?"',
    category: 'sales-people',
  },
  {
    key: 'economic-buyer',
    display: 'Economic Buyer',
    short: 'Die Person beim Kunden, die wirklich über das Budget entscheidet. Nicht immer dein Hauptkontakt. Du musst sie identifizieren, sonst pitches du am Entscheider vorbei und erlebst Überraschungen am Quartals-Ende.',
    category: 'sales-people',
  },
  {
    key: 'multi-threading',
    display: 'Multi-Threading',
    aliases: ['Multithreading'],
    short: 'Du sprichst mit mehreren Stakeholdern beim Kunden gleichzeitig — Marketing-Leitung, GF, Einkauf, IT — statt nur mit einem. Reduziert das Risiko, wenn dein einziger Kontakt das Unternehmen verlässt (kommt häufig vor).',
    category: 'sales-process',
  },
  {
    key: 'paper-process',
    display: 'Paper Process',
    aliases: ['Paper-Process'],
    short: 'Der bürokratische Teil zum Deal-Abschluss: Einkauf, Compliance, Datenschutz, IT-Security-Approval, Lieferanten-Onboarding. Im deutschen Mittelstand der unterschätzte Showstopper — kann den Deal um 3 Monate verzögern, wenn nicht früh geklärt.',
    category: 'sales-process',
  },
  {
    key: 'decision-process',
    display: 'Decision Process',
    aliases: ['Entscheidungsprozess'],
    short: 'Wie der Kunde intern entscheidet — wer redet, wer entscheidet, in welcher Reihenfolge, in welchem Zeitraum. Bei Großkunden oft 3–6 Monate, mit mehreren Gremien-Schleifen. Früh klären, sonst rätselst du monatelang.',
    category: 'sales-process',
  },
  {
    key: 'procurement',
    display: 'Procurement',
    aliases: ['Einkauf'],
    short: 'Einkaufs-Abteilung beim Kunden. Bei Konzernen wichtiger Gatekeeper — entscheidet oft mit über Lieferanten-Auswahl. Ohne Procurement-Compliance kommst du in keinen großen Konzern rein, selbst wenn der Fachbereich dich will.',
    category: 'sales-people',
  },
  {
    key: 'forecast',
    display: 'Forecast',
    aliases: ['Forecasting'],
    short: 'Prognose, welche Deals du in einem Zeitraum (typisch: Quartal) gewinnen wirst. Best Case / Commit / Worst Case. Wichtig, weil du dich Andi/Thomas gegenüber daran messen lässt — also realistisch bleiben, nicht "Hoffnungsforecast".',
    category: 'sales-metric',
  },

  // === Sales-Tools ===
  {
    key: 'crm',
    display: 'CRM',
    short: 'Customer Relationship Management — die Datenbank, in der du alle Kunden, Kontakte, Deals, Aktivitäten trackst. Bei Bruce B.: HubSpot + deine eigene UI darauf. Single Source of Truth für alles Vertriebsbezogene.',
    category: 'sales-tools',
  },
  {
    key: 'hubspot',
    display: 'HubSpot',
    short: 'Dein bestehendes CRM. Bleibt Single Source of Truth — der neue Sales Navigator ergänzt es als Workflow-Cockpit, ersetzt es nicht. MEDDPICC-Score wird als Custom-Property in HubSpot gepflegt.',
    category: 'sales-tools',
  },
  {
    key: 'sales-navigator',
    display: 'Sales Navigator',
    aliases: ['Sales Nav', 'LinkedIn Sales Navigator'],
    short: 'LinkedIn-Tool für Vertriebler: erweiterte Filter (Geo, Branche, Headcount, Tenure), Job-Wechsel-Alerts, Account-Listen. ~75 €/Monat (jährlich). Ohne Sales Navigator ist B2B-Targeting in DACH 2026 nicht mehr realistisch.',
    category: 'sales-tools',
  },
  {
    key: 'lemlist',
    display: 'Lemlist',
    short: 'E-Mail-Outbound-Tool für hochpersonalisierte Sequenzen (Liquid-Syntax, Bild-Personalisierung). Französisch gebaut, EU-affin. Bei deinem Budget die beste Wahl — ~65 €/Monat inkl. Lemwarm (Inbox-Warmup).',
    category: 'sales-tools',
  },
  {
    key: 'waalaxy',
    display: 'Waalaxy',
    short: 'LinkedIn-Automation-Tool für sequenzielle Connect-Anfragen, View-Profile, Nachrichten. EU-built. Für eine Person + eine Marke (= du): ~60 €/Monat.',
    category: 'sales-tools',
  },
  {
    key: 'apollo',
    display: 'Apollo',
    aliases: ['Apollo.io'],
    short: 'Lead-Daten-Tool: Kontaktdaten (E-Mails, Telefonnummern) zu identifizierten Personen liefern. US-stark, EU-Daten schwächer als Cognism/Dealfront. Bei deinem Budget als Backup-Quelle ~45 €/Monat sinnvoll.',
    category: 'sales-tools',
  },
  {
    key: 'dropcontact',
    display: 'Dropcontact',
    short: 'DSGVO-konformer E-Mail-Verifizier (algorithmisch, keine Datenbank — kein Schrems-II-Problem). ~24 €/Monat. Verhindert, dass du Mails an inaktive Adressen schickst — schützt deine Sender-Reputation.',
    category: 'sales-tools',
  },
  {
    key: 'cognism',
    display: 'Cognism',
    short: 'Premium-Lead-Daten-Anbieter mit besten DACH-Mobile-Numbers (Diamond Data) und höchstem GDPR-Standard (Art-14-Notifications). 15–25k €/Jahr — sprengt dein Solo-Budget, wäre aber erste Wahl wenn Pipeline läuft.',
    category: 'sales-tools',
  },
  {
    key: 'dealfront',
    display: 'Dealfront',
    short: 'DACH-natives Lead-Daten-Tool (Echobot + Leadfeeder fusioniert), 40M EU-Profile. ~399 €/Monat Plattform — out of budget für Phase 1. Leadfeeder-Modul allein interessant für Website-Visitor-Tracking auf bruce-b.com.',
    category: 'sales-tools',
  },
  {
    key: 'sortlist',
    display: 'Sortlist',
    short: 'Internationales Agentur-Verzeichnis. Du hast es probiert — bringt eher Mid-Market-Anfragen (50–300k €), keine Big-Ticket-Konzerne. Eingeschränkter ROI ohne perfekt gepflegtes Profil mit allen Cases.',
    category: 'sales-tools',
  },

  // === Agentur-Markt / Pitch-Welt ===
  {
    key: 'pitch',
    display: 'Pitch',
    short: 'Präsentation deiner Agentur an einen potenziellen Kunden, oft im Wettbewerb gegen 3–8 andere Agenturen. Bei Konzern-Etats meist 2–3 Runden (Credentials → Strategischer Pitch → Final Pitch). Aufwand pro Pitch: 5–25 Personentage.',
    category: 'agentur-markt',
  },
  {
    key: 'pitch-berater',
    display: 'Pitch-Berater',
    aliases: ['Pitch Consultant', 'Pitchberater', 'Pitch Consultants', 'Pitchberatung'],
    short: 'Externe Beratungsfirma, die für Konzerne Agentur-Auswahlprozesse moderiert. In DACH der wichtigste Türöffner zu 6–7-stelligen Konzern-Pitches — ohne Listing auf einem Pitch-Berater wirst du nie eingeladen.',
    category: 'agentur-markt',
  },
  {
    key: 'cherrypicker',
    display: 'cherrypicker',
    short: 'Der wichtigste Pitch-Berater in DACH (Hamburg/Zürich). Hat seit 2001 ~700 Auswahlprozesse moderiert. Listing für Agenturen kostenfrei, Aufwand ~3 Tage Credentials-Vorbereitung. **Schritt 1 deiner Strategie — ohne dies kein Konzern-Pitch.**',
    category: 'agentur-markt',
  },
  {
    key: 'lead-agency',
    display: 'Lead Agency',
    aliases: ['Lead-Agency', 'Leitagentur'],
    short: 'Die "Haupt-Agentur" eines Konzerns, die den Brand-Etat führt — z.B. Atelier Markgraph bei Mercedes seit 1993, Antoni/team x für Mercedes-Werbung. Eine 30-Personen-Agentur wie Bruce B. wird nie Lead Agency. Du wirst Sub-Partner.',
    category: 'agentur-markt',
  },
  {
    key: 'konsortial-partner',
    display: 'Konsortial-Partner',
    aliases: ['Konsortialpartner', 'Konsortium', 'Konsortial'],
    short: 'Eine Agentur, die von einer Lead Agency für einen Konzern-Etat dazugeholt wird, weil sie eine spezifische Kompetenz beisteuert (z.B. Jangled Nerves als Architektur-Partner bei Atelier Markgraph für Mercedes IAA). **Genau diese Rolle willst du bei Markgraph/Liganova/Milla einnehmen.**',
    category: 'agentur-markt',
  },
  {
    key: 'rfp',
    display: 'RFP',
    aliases: ['Request for Proposal'],
    short: 'Request for Proposal — offizielles Ausschreibungs-Dokument, in dem ein Konzern oder eine Behörde Agentur-Leistungen ausschreibt. Antwort meist mit 20–60 Seiten Konzept + Pitch-Termin. Aufwand pro RFP: 5–15 Personentage.',
    category: 'agentur-markt',
  },
  {
    key: 'tender',
    display: 'Tender',
    aliases: ['Tenders', 'Ausschreibung', 'Ausschreibungen'],
    short: 'Öffentliche Ausschreibung — bei Behörden Pflicht ab Schwellenwerten (€221k EU-weit, geringere bei Bund/Land). Trefferquote bei "echtem Wettbewerb" (vs. vorgeprägten Vergaben): meist <20%. Bruce-B-Hebel: Innovationspartnerschaften §19 VgV.',
    category: 'agentur-markt',
  },
  {
    key: 'capabilities-deck',
    display: 'Capabilities-Deck',
    aliases: ['Credentials-Deck'],
    short: 'Standard-Präsentation deiner Agentur (12–25 Folien): Wer wir sind, Was wir machen, 5 Hero-Cases, Awards, Team, Kontakt. Pflicht für Pitch-Berater-Listings und Konsortial-Erstgespräche. Wird alle 6 Monate aktualisiert.',
    category: 'agentur-markt',
  },

  // === Sales-Rollen ===
  {
    key: 'bdr',
    display: 'BDR',
    aliases: ['Business Development Representative'],
    short: 'Junior-Verkäufer-Rolle: Generiert Termine über Outbound (Sequenzen, Cold-Calls), schließt aber keine Deals ab. Dein erster Sales-Hire — wenn die Pipeline-Maschinerie bewiesen ist und Andi/Thomas zustimmen.',
    category: 'sales-people',
  },
  {
    key: 'ae',
    display: 'AE',
    aliases: ['Account Executive'],
    short: 'Account Executive — Senior-Verkäufer, der Deals abschließt. Übernimmt vom BDR ab "Discovery Call gebucht". Bei Bruce B. heute: Max selbst. Später (2027+) potenziell separat hire.',
    category: 'sales-people',
  },
  {
    key: 'cmo',
    display: 'CMO',
    aliases: ['Chief Marketing Officer'],
    short: 'Marketing-Vorstand. In DAX-Konzernen der typische Economic Buyer für Markenkommunikations-Etats > 500k. Bei Mittelstand oft GF selbst. Bei Mercedes ab Okt 2025: Christina Schenck.',
    category: 'sales-people',
  },
  {
    key: 'cio',
    display: 'CIO',
    aliases: ['Chief Information Officer'],
    short: 'IT-Vorstand. Bei AVA-Pitches in Banken / Stadtwerken / Behörden der relevante Decision-Maker (gemeinsam mit Datenschutz). Bei EnBW: relevanter Kontakt für die BSI-Customer-Suite-Avatar-Integration.',
    category: 'sales-people',
  },
  {
    key: 'cdo',
    display: 'CDO',
    aliases: ['Chief Digital Officer'],
    short: 'Digital-Vorstand. Bei mittelständischen Industriekunden oft die Person, die Tech-/Avatar-Projekte initiiert. Wenn ein CDO neu im Amt ist (LinkedIn-Job-Wechsel-Alert): wertvoller Trigger für Outreach.',
    category: 'sales-people',
  },
  {
    key: 'ciso',
    display: 'CISO',
    aliases: ['Chief Information Security Officer'],
    short: 'IT-Sicherheits-Vorstand. Bei AVA-Pitches in regulierten Branchen (Banken, Behörden, Pharma) Gatekeeper für Avatar-Architektur. EU-AI-Act-Wedge ("ist Ihr Avatar konform?") spricht primär CISOs an.',
    category: 'sales-people',
  },
  {
    key: 'dpo',
    display: 'DPO',
    aliases: ['Data Protection Officer', 'Datenschutzbeauftragter'],
    short: 'Datenschutzbeauftragte:r. Bei AVA-Pitches in DACH ein zentraler Stakeholder — muss DSGVO + EU-AI-Act + Schrems-II abnicken. Wenn die DPO contra ist, ist der Deal tot, egal was der Fachbereich will.',
    category: 'sales-people',
  },

  // === KPIs / Wirtschaft ===
  {
    key: 'kpi',
    display: 'KPI',
    aliases: ['Key Performance Indicator'],
    short: 'Eine wichtige Kennzahl, die du regelmäßig misst. Bei Sales: Reply-Rate, Meeting-Rate, Win-Rate, Pipeline-Coverage. Wichtig ist Fokus auf 5–7 KPIs, nicht 30 — sonst verlierst du den Überblick.',
    category: 'sales-metric',
  },
  {
    key: 'roi',
    display: 'ROI',
    aliases: ['Return on Investment'],
    short: 'Was bringt dir eine Maßnahme im Verhältnis zu dem, was sie kostet. Wichtig in jeder Pitch-Argumentation gegenüber dem Kunden ("Unser Avatar spart Ihnen X €/Monat") — und um Andi/Thomas Tool-Investments zu begründen.',
    category: 'sales-metric',
  },
  {
    key: 'acv',
    display: 'ACV',
    aliases: ['Annual Contract Value'],
    short: 'Jahres-Vertragswert eines Kunden. Bei Bruce B. typische Werte: 60k (Markenfilm) bis 800k (großer Markenrelaunch). Hilft bei der Frage "wie viele Kunden brauche ich für 3,74 M € Umsatz?".',
    category: 'sales-metric',
  },
  {
    key: 'cac',
    display: 'CAC',
    aliases: ['Customer Acquisition Cost'],
    short: 'Was kostet es dich, einen neuen Kunden zu gewinnen. Bei dir aktuell: anteiliges Gehalt + Tool-Stack (500 €/Mo) ÷ neu gewonnene Deals. Wenn CAC > 30% von ACV: Pipeline-Maschine zu ineffizient.',
    category: 'sales-metric',
  },
  {
    key: 'ltv',
    display: 'LTV',
    aliases: ['Lifetime Value'],
    short: 'Customer Lifetime Value — was bringt dir ein Kunde insgesamt, über alle Jahre. Häfele-LTV bei Bruce B. wahrscheinlich > 5 M € über 15 Jahre. CAC zu LTV-Verhältnis 1:3 oder besser ist gesund.',
    category: 'sales-metric',
  },

  // === Recht / Compliance ===
  {
    key: 'uwg',
    display: 'UWG',
    aliases: ['Gesetz gegen unlauteren Wettbewerb'],
    short: 'Deutsches Gesetz, das Werbung stark reguliert. §7: Cold-Mails brauchen grundsätzlich vorherige Einwilligung. Restkategorie für B2B: hyperpersonalisierte Outreach mit Trigger-Bezug + Opt-out + Identifikation. Volumen-Mails = BNetzA-Risiko.',
    category: 'recht',
  },
  {
    key: 'dsgvo',
    display: 'DSGVO',
    aliases: ['GDPR'],
    short: 'EU-Datenschutz-Grundverordnung. Im Sales-Kontext: Du brauchst eine Rechtsgrundlage (Berechtigtes Interesse Art 6(1)f) für jeden Kontakt. Kontaktdaten von dir gespeichert → Pflicht zur Auskunft / Löschung auf Anfrage.',
    category: 'recht',
  },
  {
    key: 'tmg',
    display: 'TMG',
    aliases: ['Telemediengesetz'],
    short: 'Telemediengesetz: Pflicht, in jeder E-Mail einen vollständigen Footer mitzuschicken (Anschrift, HRB, GF, USt-ID, Telefon, Mail). Wer das vergisst, riskiert Abmahnungen — auch bei harmlosen Akquise-Mails.',
    category: 'recht',
  },
  {
    key: 'eu-ai-act',
    display: 'EU AI Act',
    aliases: ['EU-AI-Act', 'AI Act', 'KI-Verordnung'],
    short: 'EU-Verordnung zu KI-Systemen. Artikel 50 wird am 2.8.2026 wirksam — Pflicht zur Offenlegung, dass ein Avatar/Chatbot KI ist. Strafen bis 15 Mio. € / 3% Konzernumsatz. **Größter aktiver Vertriebs-Hebel für AVA: "60 Tage bis 2.8.2026 — ist Ihr Avatar konform?"**',
    category: 'recht',
  },
  {
    key: 'artikel-50',
    display: 'Artikel 50',
    aliases: ['Art. 50', 'Art 50'],
    short: 'EU-AI-Act Art 50: Anbieter direkt mit Menschen interagierender KI (Chatbots, Avatare, NPCs) müssen offenlegen, dass es KI ist — bei erster Interaktion, nicht im Footer. Plus Watermarking für generierte Inhalte. Wirksam ab 2.8.2026.',
    category: 'recht',
  },
  {
    key: 'schrems-ii',
    display: 'Schrems-II',
    aliases: ['Schrems II'],
    short: 'EuGH-Urteil 2020: Datentransfer in die USA ist nur unter strengen Auflagen erlaubt. Macht US-Cloud-Avatare (HeyGen, Synthesia, Tavus) für deutsche Behörden und regulierte Branchen rechtlich problematisch. AVA on-prem umgeht das Problem.',
    category: 'recht',
  },
  {
    key: 'dpia',
    display: 'DPIA',
    aliases: ['Datenschutz-Folgenabschätzung'],
    short: 'Data Protection Impact Assessment — Pflicht-Dokument für sensible Datenverarbeitung. Bei AVA-Einsatz in Behörden/Banken/Pharma zwingend. AVA-Pack liefert ein Template, das du dem Kunden mitgibst — spart ihm 2–4 Wochen Compliance-Arbeit.',
    category: 'recht',
  },
  {
    key: 'bnetza',
    display: 'BNetzA',
    aliases: ['Bundesnetzagentur'],
    short: 'Bundesnetzagentur. Verfolgt UWG-Verstöße bei E-Mail-Spam. Wer Volumen-Cold-Mails versendet, riskiert ~50k–500k € Bußgeld. Hyperpersonalisierte Outreach mit Trigger umgeht das Risiko.',
    category: 'recht',
  },
  {
    key: 'kokivo',
    display: 'KoKIVO',
    short: 'Koordinierungsstelle Künstliche Intelligenz Verordnung. Die deutsche EU-AI-Act-Aufsichtsbehörde ab 2026. Verantwortlich für Reallabore (KI-Sandboxes), in denen Avatar-Pilots regulatorisch geschützt laufen können.',
    category: 'recht',
  },

  // === Tech / AI ===
  {
    key: 'ava',
    display: 'AVA',
    aliases: ['Added Value Avatar', 'Added Value Avatars'],
    short: 'Euer Flagship-Produkt: fotorealistische KI-Avatare auf Unreal Engine/MetaHuman, mit Fraunhofer IAO co-entwickelt. EU-AI-Act-konform by design, On-Prem-fähig, lokale LLMs. Verkauft sich für 30k–500k €/Pilot.',
    category: 'tech-ai',
  },
  {
    key: 'llm',
    display: 'LLM',
    aliases: ['Large Language Model'],
    short: 'Large Language Model — großes Sprachmodell wie GPT, Claude, Gemma. Die "Sprach-Engine" hinter KI-Avataren. AVA nutzt Google Gemma quantisiert, vom Fraunhofer IAO speziell für Avatar-Dialog fine-tuned.',
    category: 'tech-ai',
  },
  {
    key: 'rag',
    display: 'RAG',
    aliases: ['Retrieval-Augmented Generation'],
    short: 'Methode, bei der das LLM vor jeder Antwort relevante Quellen aus einer Datenbank holt. Verhindert Halluzinationen, ermöglicht Quellenangabe in jeder Antwort. AVA-USP: lokales RAG-System mit Fraunhofer-IAO-Tuning.',
    category: 'tech-ai',
  },
  {
    key: 'on-prem',
    display: 'On-Prem',
    aliases: ['On-Premise', 'On Premise', 'on premise', 'on prem'],
    short: 'Software läuft auf den eigenen Servern des Kunden, nicht in der Cloud. Pflicht für Behörden, Banken, Pharma (Schrems-II, DSGVO). AVA kann on-prem laufen — Cloud-Anbieter HeyGen/Synthesia/Tavus können das NICHT.',
    category: 'tech-ai',
  },
  {
    key: 'unreal-engine',
    display: 'Unreal Engine',
    aliases: ['Unreal'],
    short: 'Foto-realistische 3D-Render-Engine von Epic Games. Bruce B. ist Epic Games Silver Partner. AVA wird auf Unreal gerendert — wesentlich realistischer als 2D-Video-Avatare (HeyGen, Synthesia).',
    category: 'tech-ai',
  },
  {
    key: 'metahuman',
    display: 'MetaHuman',
    short: 'Fotorealistische 3D-Charakter-Technologie von Epic Games (Teil von Unreal Engine). Macht AVA so realistisch — Mimik, Hauttextur, Lichtreaktion auf MetaHuman-Niveau ist 2026 das obere Ende des Spielbaren.',
    category: 'tech-ai',
  },
  {
    key: 'laia2',
    display: 'LAIA²',
    aliases: ['LAIA-2', 'LAIA2'],
    short: 'Level-based AI-Avatar Assessment — Reifegrad-Modell für KI-Avatare, das ihr mit Fraunhofer IAO entwickelt habt. 7 Stufen vom Chatbot bis zum Multi-Präsenz-Avatar. Analog zu SAE-Leveln im autonomen Fahren. Verkaufs-Asset in jedem Pitch-Deck.',
    category: 'tech-ai',
  },
  {
    key: 'gpai',
    display: 'GPAI',
    aliases: ['General Purpose AI'],
    short: 'General Purpose AI — Sammelbegriff im EU AI Act für Großmodelle wie GPT, Claude, Gemini. Wer ein GPAI-Modell als Backend nutzt, muss zusätzliche Dokumentationspflichten erfüllen.',
    category: 'tech-ai',
  },

  // === Vergabe / Behörden ===
  {
    key: 'dtvp',
    display: 'DTVP',
    aliases: ['Deutsches Vergabeportal'],
    short: 'Deutsches Vergabeportal — die wichtigste Vergabe-Plattform für Bund + Länder + Kommunen. Premium-Tier ~39 €/Monat. Ergänzend zu deinem eigenen Scraper auf 16 Portalen.',
    category: 'org',
  },
  {
    key: 'ted',
    display: 'TED',
    aliases: ['Tenders Electronic Daily'],
    short: 'EU-weite Vergabeplattform. Pflicht-Veröffentlichung für Aufträge über 221k €. Kostenfrei recherchierbar. Für Bruce B. relevant für Bundes-Avatar-Aufträge und multinationale Behörden-Ausschreibungen.',
    category: 'org',
  },
  {
    key: 'kgst',
    display: 'KGSt',
    aliases: ['Kommunale Gemeinschaftsstelle'],
    short: 'Kommunale Gemeinschaftsstelle für Verwaltungsmanagement — Beratungs- und Vergabe-Netzwerk deutscher Kommunen. Wichtiger Multiplikator für kommunale Avatar-Aufträge.',
    category: 'org',
  },
  {
    key: 'bmds',
    display: 'BMDS',
    aliases: ['Bundesministerium für Digitales'],
    short: 'Bundesministerium für Digitales und Staatsmodernisierung. Betreibt den Agentic AI Hub — Welle 1 (März 2026) hatte 17 Kommunen + 10 Start-ups. Welle 2 erwartbar Q4 2026 — Bruce B. muss dabei sein.',
    category: 'org',
  },
  {
    key: 'bsi',
    display: 'BSI',
    aliases: ['Bundesamt für Sicherheit in der Informationstechnik'],
    short: 'Bundesamt für Sicherheit in der Informationstechnik. Definiert IT-Sicherheits-Standards für Behörden ("Schutzbedarf hoch"). AVA muss BSI-Kriterien erfüllen, um an deutsche Behörden verkauft zu werden.',
    category: 'org',
  },
  {
    key: 'iaa',
    display: 'IAA',
    aliases: ['Internationale Automobilausstellung'],
    short: 'Internationale Automobilausstellung (München seit 2021). Größter europäischer Auto-Messe-Auftritt. Atelier Markgraph hat Mercedes-IAA-Etat seit 1993, Jangled Nerves seit 2017 als Architektur-Konsortialpartner.',
    category: 'org',
  },
  {
    key: 'dach',
    display: 'DACH',
    short: 'Deutschland · Österreich · Schweiz. Euer primäres Markt-Gebiet. AVA-Differenzierung gegenüber US-Anbietern besonders stark in DACH wegen DSGVO + EU-AI-Act.',
    category: 'org',
  },
  {
    key: 'bw',
    display: 'BW',
    aliases: ['Baden-Württemberg'],
    short: 'Baden-Württemberg — euer Heimatmarkt. Stuttgart-Nähe als unausgespielter Wettbewerbsvorteil bei Live-Communication-Projekten (Mercedes, Porsche, Trumpf, Häfele).',
    category: 'org',
  },
];

// Lookup-Map für schnellen Zugriff
const LOOKUP = new Map<string, GlossaryEntry>();
GLOSSARY.forEach(g => {
  LOOKUP.set(g.display.toLowerCase(), g);
  g.aliases?.forEach(a => LOOKUP.set(a.toLowerCase(), g));
});

export function lookupTerm(text: string): GlossaryEntry | undefined {
  return LOOKUP.get(text.toLowerCase());
}

// Regex für alle Begriffe (sortiert nach Länge desc, damit längere zuerst matchen)
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const ALL_PATTERNS = Array.from(
  new Set(
    GLOSSARY.flatMap(g => [g.display, ...(g.aliases ?? [])]),
  ),
).sort((a, b) => b.length - a.length);

// Regex: case-insensitive, word boundaries, group capture
// Multi-word phrases mit Leerzeichen werden auch korrekt erfasst
export const TERM_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}])(${ALL_PATTERNS.map(escapeRegex).join('|')})(?![\\p{L}\\p{N}])`,
  'giu',
);
