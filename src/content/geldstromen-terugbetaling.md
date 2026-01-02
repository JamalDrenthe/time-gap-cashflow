# Terugbetaling

**Doel**  
Deze pagina behandelt de uitgaande kasstroom (verplichting) die op het einde van het time gap moet worden voldaan: de eigenschappen van de verplichting, timingcondities, en welke implicaties deze hebben voor ontwerp en toetsing van TGC-structuren.

---

## Definitie

- **Verplichting / Terugbetaling** (symbolen):  
  - \(O\) = bedrag dat verschuldigd is op \(t₀ + T\).  
  - Dit kan een vaste betaling zijn, een variabele afrekening of een conditionele claim.

---

## Eigenschappen en attribuutlijst

| Attribuut | Uitleg |
|---|---|
| `O` | Nominaal bedrag (EUR) |
| `t_due` | Exacte due date of betalingswindow |
| `fixiteit` | Vast / variabel |
| `condities` | Voorwaarden (bv. oplevering, acceptatie) |
| `sancties` | Boetes of extra kosten bij late betaling |

---

## Gevolgen voor modelontwerp

- **Vaste verplichtingen** vergemakkelijken planning en reduceren scenariocomplexiteit.  
- **Variabele of conditionele verplichtingen** vereisen scenario-analyse en extra buffers.  
- **Sancties bij late betaling** verhogen de kost van faalgevallen en moeten als kostenpost in modellen (K_op) worden opgenomen.

---

## Toetsingschecklist voor terugbetaling

- [ ] Is `O` duidelijk gedocumenteerd met datum of window?  
- [ ] Zijn eventuele variaties of condities gekwantificeerd?  
- [ ] Zijn sancties en incassokosten meegenomen in kostenbegroting?  
- [ ] Bestaat er mogelijkheid tot uitstel of heronderhandeling en is deze beoordeeld?

---

## Voorbeeld (kort)

- **Vast:** leverancierfactuur €50.000 met 30 dagen netto — `O=€50.000`, `t_due=t₀+30`.  
- **Variabel:** prestatiebonus afhankelijk van KPI; `O` heeft kansdistributie.

---

## Notities voor implementatie

- Sla `O` en `t_due` structureel op in datasets om simulaties en stresstesten actief te kunnen uitvoeren.  
- Houd administratieve latencies (boekingsdatum vs. valutadatum) apart in modellen: deze kunnen het effectieve dekkingsmoment verschuiven.

_Last updated: [datum invullen]._  
Zie ook: **Tijd → Verplichting**, **Vereisten**, **Berekening**.
