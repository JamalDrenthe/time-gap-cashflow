# Interval

**Doel**  
Deze pagina behandelt de time gap of interval `T` — de periode tussen ontvangst (`t₀`) en verplichting (`t₀+T`). Het interval is de operationele ruimte van het model: lengte, voorspelbaarheid en timingmarge bepalen bruikbaarheid.

---

## Kerncomponenten van het interval

- **Lengte (T)** — absolute duur in dagen (of andere tijdseenheid).  
- **Variabiliteit** — spreiding van effectieve beschikbare tijd over vergelijkbare cycli.  
- **Timingmarge (TM)** — verschil tussen `T` en de realisatietijd van de inzetactiviteiten.  
- **Operationele lead time** — gemiddelde tijd die benodigde activiteiten vereisen.

---

## Variabelen en formules

- `T` — interval (dagen).  
- `Realisatietijd(OP)` — verwachte tijd om inzet te realiseren (dagen).  
- `TM = T − Realisatietijd(OP)` — timingmarge; TM > 0 vereist voor veilige inzet.

**Regel:** voor plausibele inzet is `TM` positief en liefst > 0 met voldoende buffer (aanbeveling: TM ≥ 1–3 dagen afhankelijk van proceskritikaliteit).

---

## Beoordeling van bruikbaarheid

1. **T kort (< 2 dagen)** — meestal geen operationele inzet; enkel liquiditeitsrouting of very short-term instruments.  
2. **T medium (7–30 dagen)** — veel toepasbaar voor kortcyclische activiteiten (promoties, korte dienstverlening).  
3. **T lang (> 30 dagen)** — meer ruimte maar verhoogde onzekerheid; non-lineaire risico’s kunnen toenemen.

Let op: de grenswaarden zijn indicatief; sector- en procesafhankelijkheid bepaalt bruikbaarheid.

---

## Checklist voor intervalanalyse

- [ ] `T` is eenduidig gedefinieerd en gedocumenteerd.  
- [ ] `Realisatietijd(OP)` is empirisch geschat (historische data).  
- [ ] `TM` is berekend en positief in de meeste historische gevallen (≥ 75%).  
- [ ] Variabiliteit van `T` and realisatietijden is gekwantificeerd (standaardafwijking, percentielen).  
- [ ] Stress-cases (vertragingen) zijn gesimuleerd (b.v. +25% realisatietijd, +50% T).

---

## Voorbeeldberekening (kort)

- `T = 30` dagen  
- `Realisatietijd(OP) = 25` dagen  
- `TM = 30 − 25 = 5` dagen → operationeel uitvoerbaar (positief margin).

Stress-scenario: als realisatietijd = 33 dagen → `TM = −3` dagen → vereist buffer of alternatieve oplossing.

---

## Notities en operationalisatie

- Bij modellering: model zowel variatie in `T` (contractuele onduidelijkheid) als variatie in realisatietijd (procesonzekerheid).  
- TM is centrale KPI: rapporteer mediane TM en P5/TM percentiel voor conservatieve planning.  
- Houd rekening met administratieve latencies (boekhoudkundige verwerking en valutadatum).

_Last updated: 1 januari 2026._  
Zie ook: **Ontvangst**, **Verplichting**, **Vereisten**, **Modellering**.
