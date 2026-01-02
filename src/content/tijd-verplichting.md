# Verplichting

**Doel**  
Deze pagina behandelt de kenmerken van de uitgaande kasverplichtingen die in Time Gap Cash Flow relevant zijn. De fixiteit, condities en timing van verplichtingen bepalen wanneer beschikbare middelen terugbetaald of aangewend moeten zijn.

---

## Kernvragen

- Wanneer is de uitgaande betaling verschuldigd (exacte datum, termijn, window)?  
- Is de verplichting vast (nominaal bedrag) of variabel (afhankelijk van prestaties)?  
- Zijn er juridische sancties bij late betaling?  
- Kan de verplichting worden uitgesteld of gestructureerd (heronderhandeling)?

---

## Variabelen en attributen

| Attribuut | Uitleg |
|---|---|
| `O` | Verplichting (bedrag op `t₀+T`) |
| `Due window` | Exacte datum vs. betalingswindow (bv. binnen 5 werkdagen) |
| Fixiteit | Vast bedrag / variabel bedrag |
| Conditie | Voorwaarde voor betaling (bv. oplevering, goedkeuring) |
| Sancties | Kosten/boetes bij late betaling |

---

## Typen verplichtingen

1. **Contractueel vaststaande verplichting**  
   - Duidelijke due date; voorspelbaarheid hoog.  
   - Best mogelijke condities voor TGC-analyse.

2. **Conditionele verplichting**  
   - Afhankelijk van triggers (acceptatie, milestone); vereist analyse van kans op trigger.

3. **Variabele verplichting**  
   - Bedrag niet volledig vaststaand (bv. volumegerelateerd); vereist scenario-analyse.

---

## Praktische checklist voor verplichtingen

- [ ] `O` is gedocumenteerd met due date (`t₀+T`).  
- [ ] Eventuele variabiliteit in `O` is gekwantificeerd (sensitiviteitsanalyse).  
- [ ] Contractuele sancties bij vertraging zijn bekend en opgenomen in kosten.  
- [ ] Mogelijkheid tot herstructurering of uitstel is juridisch en praktisch beoordeeld.

Als verplichting variabel of voorwaardelijk is, moet de TGC-analyse scenario’s bevatten en extra buffer inrekenen.

---

## Voorbeeld (kort)

- **Case A:** Leverancier X factureert op 30 dagen netto; `O` is contractueel en voorspelbaar.  
- **Case B:** Betaling afhankelijk van klantacceptatie; `O` is conditioneel en vereist kansinschatting.

---

## Notities

- In rekenmodellen verdient het de voorkeur verplichtingen als vaste datapunten op te slaan (datum + bedrag) zodat simulaties eenduidig werken.  
- Houd rekening met administratieve vertragingen (boekingsdatum ≠ valutadatum).

_Last updated: 1 januari 2026._  
Zie ook: **Vereisten** en **Berekening**.
