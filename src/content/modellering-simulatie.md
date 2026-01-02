# Simulatie

**Doel**  
Uitleg en methodiek voor het simuleren van onzekerheid binnen Time Gap Cash Flow-analyses. Simulatie helpt bij het inschatten van kansverdelingen van uitkomsten (bijv. kans op tekort, P5/P95 netto-opbrengst).

---

## Typen simulatie

1. **Deterministische scenario’s**  
   - Handmatig gedefinieerde scenario’s (baseline, stress, recovery).  
   - Geschikt voor verkennende analyse en communicatie.

2. **Monte Carlo-simulatie**  
   - Herhaalde random sampling uit gespecificeerde distributies voor inputvariabelen.  
   - Resultaat: empirische verdeling van uitkomstvariabelen.

3. **What-if en mechanische stress-runs**  
   - Systematisch variëren van één parameter (gevoeligheidsanalyse) om marginale effecten zichtbaar te maken.

---

## Stappen voor een Monte Carlo-aanpak

1. **Definieer doel**: wat wil je weten (bv. kans op buffertekort)?  
2. **Selecteer inputvariabelen**: T, r_d of r_c, f, K_op, realisatietijd, etc.  
3. **Specificeer distributies**: bepaal type en parameters (zie Distributie).  
4. **Kies N runs**: meestal ≥ 10.000 voor stabiele percentielen.  
5. **Implementeer logica per run**: volg Volgorde (Berekening→Volgorde).  
6. **Verzamel uitkomsten**: Π, tekort, buffergebruik, TM etc.  
7. **Analyseer en rapporteer**: gemiddelde, mediaan, P5, P95, kans op default.

---

## Pseudocode (hoog niveau)

```
voor i in 1..N:
  draw T_r ~ Dist_T
  draw r_c ~ Dist_r
  draw K_op_i ~ Dist_K
  bereken C_use, S
  bereken R = function(C_use, r_c, T_r)
  Pi = R - C_use - K_op_i
  beschikbaar = S + R + buffer
  default = beschikbaar < O
  bewaar (Pi, default, beschikbaar, T_r)
samenvatten resultaten: mean, median, P5, P95, default_rate
```

*Opmerking:* de functie `R` kan deterministisch (lineair) of op componenten gebaseerd zijn (omzet, fees, etc.).

---

## Output en rapportage

Rapporteer minimaal:
- Gemiddelde en mediaan van netto-opbrengst (Π).  
- Percentielen: P5, P25, P75, P95.  
- Kans op tekort/default.  
- Distributieplots (histogram, ECDF).  
- Sensitiviteitsmatrix (welke inputvariabelen verklaren de meeste variantie).

---

## Interpretatie en valkuilen

- Kijk naar zowel centrale tendentie als staartgedrag; P5 en P95 geven risico-op-staart inzicht.  
- Wees terughoudend bij interpretatie als inputdistributies slecht gefit zijn of dataset te klein is.  
- Documenteer alle seeds, versies en constante instellingen voor reproduceerbaarheid.

_Last updated: [datum invullen]._
