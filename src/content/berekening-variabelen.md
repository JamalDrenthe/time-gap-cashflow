# Variabelen

**Doel**  
Een eenduidige en toepassingsgerichte lijst van alle variabelen die in berekeningen terugkomen, inclusief datatype, toelichting en voorbeeldwaarden. Gebruik deze notatie consequent in spreadsheets, scripts en simulaties.

---

## Tabel met variabelen

| Symbool | Naam | Beschrijving | Type / voorbeeld |
|---:|---|---|---|
| `C_in` | Inkomende kasstroom | Bruto ontvangen bedrag op \(t_0\) | EUR, numeriek (100000) |
| `f` | Fractie inzetbaar | Deel van `C_in` dat juridisch/operationeel inzetbaar is | 0 < f ≤ 1 (0.8) |
| `C_use` | Ingezet kapitaal | `C_use = f · C_in` | EUR (80000) |
| `S` | Reserve | `S = C_in − C_use` (niet ingezet) | EUR (20000) |
| `T` | Time gap / interval | Dagen tussen ontvangst en verplichting | integer (30) |
| `O` | Uitgaande verplichting | Bedrag verschuldigd op \(t_0+T\) | EUR (100000) |
| `R(T)` | Bruto opbrengst | Bruto resultaat van inzet binnen \(T\) | EUR (bijv. 82400) |
| `K_op` | Operationele kosten | Directe kosten verbonden aan inzet | EUR (400) |
| `Π` | Netto-opbrengst | `Π = R(T) − C_use − K_op` | EUR (2000) |
| `ROC` | Rendement per cycle | `ROC = Π / C_use` | decimaal (0.025) |
| `r_d` | Dagelijks rendement | Bij benadering `r_d ≈ ROC / T` | decimaal (0.00083) |
| `TM` | Timingmarge | `TM = T − realisatietijd(OP)` | dagen (5) |

---

## Aanvullende opmerkingen per variabele

- **C_in**: sla zowel brutobedrag als valuta en transactiedatum op (bank- vs. boekingsdatum).  
- **f**: kan contractueel bepaald of empirisch geschat zijn; in simulaties modelleer `f` als distributie indien onzeker.  
- **R(T)**: kan bestaan uit meerdere componenten (omzet uit dienst, rente, kortlopende handelswinst); modelleer componenten apart indien relevant.  
- **K_op**: includeer transactiekosten, fees, operationele overhead en potentiële sanctiekosten bij vertraging.

---

## Datatypen en opslagadvies

- Gebruik ISO 8601-timestamps voor datumvelden.  
- Bedragen: decimaal met twee decimalen; voorkom floats die afrondingsfouten introduceren (gebruik decimal libraries indien programmeertaal vereist).  
- Documenteer bron van elke variabele (contract, bankmutatie, handeling) en versioneer aannames.

---

_Last updated: [datum invullen]._  
Zie ook: **Berekening → Volgorde** voor concrete rekenstappen.
