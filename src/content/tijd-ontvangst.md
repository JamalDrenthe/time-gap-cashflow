# Ontvangst

**Doel**  
Deze pagina beschrijft de karakteristieken van inkomende kasstromen die relevant zijn voor Time Gap Cash Flow-analyses. Niet alleen het bedrag telt: het tijdstip, de juridische status en de voorspelbaarheid bepalen of het geld inzetbaar is.

---

## Kernvragen

- Wanneer komt het geld beschikbaar (exacte datum of onbepaalde periode)?  
- Is de ontvangst vrij besteedbaar of gebonden (escrow, retentie, voorwaardelijkheid)?  
- Hoe voorspelbaar is de ontvangst (contractueel, herhalend, historisch)?

---

## Variabelen en attributen

| Attribuut | Uitleg |
|---|---|
| `t₀` | Datum/tijdstip ontvangst (minimaal dag-niveau) |
| `C_in` | Bedrag van ontvangst (EUR) |
| Contractstatus | Onvoorwaardelijk / voorwaardelijk / tijdelijk geblokkeerd |
| Terugvorderingsrisico | Kans op chargeback, retour of reclamatie |
| Voorspelbaarheid | Statistische maat (bv. CV van ontvangsttijden) |

---

## Categorisering van ontvangsten

1. **Onvoorwaardelijke ontvangst**  
   - Direct vrij besteedbaar, laag terugvorderingsrisico.  
   - Hoogst geschikt voor inzet binnen Time Gap Cash Flow.

2. **Voorwaardelijke ontvangst**  
   - Mogelijke terugvordering (chargeback, retentie).  
   - Vereist aanvullende juridische toetsing; vaak niet inzetbaar.

3. **Escrow of geblokkeerde ontvangst**  
   - Juridisch gebonden; niet inzetbaar totdat vrijgave plaatsvindt.

---

## Praktische checklist voor ontvangst

- [ ] `t₀` is gedocumenteerd en gevalideerd.  
- [ ] Contractuele status is gecontroleerd (vrij besteedbaar?).  
- [ ] Historische frequentie en variantie van ontvangsttijden is bekend.  
- [ ] Terugvorderingsrisico is kwantitatief of kwalitatief beoordeeld.  
- [ ] Bedrag en valuta zijn expliciet vastgelegd.

Als een van deze vragen negatief beantwoord wordt, is `C_in` mogelijk niet inzetbaar binnen de bedoelde time gap.

---

## Voorbeeld (kort)

- **Case A:** Klant A betaalt een aanbetaling van €10.000 op `t₀`; contract bevat geen retentieclausule. `C_in` is in beginsel inzetbaar.  
- **Case B:** Voorverkooptickets in escrow till evenementdatum; ontvangst is niet inzetbaar.

---

## Notities

- Voor modellen: onderscheid tussen bruto `C_in` en netto vrij besteedbaar bedrag (na retenties of fees).  
- Documenteer bron en bewijslast van `t₀` (bankmutatie, contractbevestiging).

_Last updated: 1 januari 2026._  
Zie ook: **Fundament → Definitie**, **Vereisten**.
