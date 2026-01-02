# Geldigheid

**Doel**  
Uitleggen in welke omstandigheden berekeningen en simulaties binnen het Time Gap Cash Flow-model als geldig en informatief kunnen worden beschouwd.

---

## Criteria voor geldigheid

Een resultaat is methodologisch geldig wanneer aan alle volgende voorwaarden is voldaan:

1. **Datakwaliteit**  
   - tijdstempels en bedragen correct en consistent vastgelegd;  
   - voldoende observaties voor statistische schattingen (aanbeveling: N ≥ 30 voor veelvoorkomende variabelen).

2. **Aannames expliciet en traceerbaar**  
   - alle aannames (distributies, verwerkingstijden, f, K_op) zijn gedocumenteerd en opgeslagen;  
   - versiebeheer van modelconfiguratie aanwezig.

3. **Modeltoepassing binnen scope**  
   - het geval valt binnen de scope die op de site beschreven wordt (zie Oriëntatie → Scope);  
   - ontvangsten zijn vrij besteedbaar of condities zijn expliciet gemodelleerd.

4. **Robuustheidstests uitgevoerd**  
   - eenvoudige stresstesten en eenelementige gevoeligheidsanalyses zijn uitgevoerd;  
   - percentielen (P5, P50, P95) gerapporteerd, niet alleen gemiddelden.

5. **Reproduceerbaarheid**  
   - runs/analyses zijn reproduceerbaar (seed, code, data en constants beschikbaar).

---

## Aanbevolen statistische output (minimaal)

- Mediaan en gemiddelde van netto-opbrengst (Π)  
- P5 en P95 percentielen van Π  
- Kans op tekort / default (default_rate)  
- Mediane en P5 timingmarge (TM)  
- Sensitiviteitsranking (welke inputs verklaren variantie)

Deze set geeft zowel centrale tendentie als staartrisico’s inzicht.

---

## Wanneer resultaten **niet** als geldig moeten worden beschouwd

- Data ontbreekt of is niet gevalideerd (onvolledige tijdstempels).  
- Distributies zijn gefit met onvoldoende datapunten zonder vermeldelijke onzekerheidsmarges.  
- Resultaten presenteren enkel gemiddelden zonder percentielen of faalkansen.  
- Modellering is uitgevoerd buiten de scope (bijv. conditionele ontvangsten zonder juridische toets).

---

## Conclusie

Geldigheid is een samenspel van data-, model- en rapportagekwaliteit. Zonder expliciete documentatie van aannames en zonder robuustheidsanalyse zijn uitkomsten hoogst onzeker en mogen ze niet als betrouwbare basis voor besluitvorming worden gebruikt.

_Last updated: [datum invullen]._
