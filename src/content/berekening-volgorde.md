# Volgorde

**Doel**  
Bied een ondubbelzinnige, reproduceerbare volgorde van rekenstappen voor een enkele Time Gap Cash Flow-cycle. Volg deze stappen in scripts of spreadsheets om inconsistenties te voorkomen.

---

## Aanpak (stap-voor-stap)

1. **Verifieer data**  
   - Controleer aanwezigheid en format van `C_in`, `t₀`, `O`, `t₀+T`, en contractuele status.  
   - Valideer dat `t₀` < `t₀+T`.  

2. **Bepaal fractie inzetbaar (`f`)**  
   - Lees contractuele beperkingen en bepaal of `f` = contractual fraction of empirische schatting.  
   - Documenteer bron van `f`.

3. **Bereken inzet en reserve**  
   - `C_use = f · C_in`  
   - `S = C_in − C_use` 

4. **Schat opbrengstprofiel binnen T**  
   - Bepaal `R(T)` (kan deterministisch scenario of stochastisch).  
   - Indien dagrendement `r_d` verondersteld: `R(T) = C_use · (1 + r_d · T)` (lineair).  

5. **Houd operationele kosten en extra lasten bij**  
   - Tel `K_op` op bij directe kosten.  
   - Voeg eventuele contractuele sancties toe aan K_op indien relevant.

6. **Bereken netto-opbrengst**  
   - `Π = R(T) − C_use − K_op` 

7. **Evalueer beschikbaarheid bij due date**  
   - `Beschikbaar_at_due = S + R(T) + buffer` (buffer = extra reserve of fallback)  
   - Vergelijk `Beschikbaar_at_due` met `O` → tekorten of overschotten.

8. **Rapporteer KPI’s**  
   - Netto-opbrengst `Π` (EUR)  
   - `ROC = Π / C_use` (%)  
   - `ROC_dag ≈ ROC / T` (%/dag)  
   - `TM = T − realisatietijd(OP)` (dagen)  
   - Faalkans / scenario-uitkomsten (indien gesimuleerd)

9. **Documenteer en archiveer**  
   - Sla alle aannames (rendemementen, verwerkingstijden, f) op samen met run-id en inputdata.

---

## Spreadsheet-check (praktisch)

Kolommen per cycle:
- A: `C_in`  
- B: `f`  
- C: `C_use = A * B`  
- D: `S = A - C`  
- E: `r_c` of `r_d`  
- F: `R = C * (1 + r_c)`  
- G: `K_op`  
- H: `Π = F - C - G`  
- I: `Beschikbaar_at_due = D + F + buffer`  
- J: `Tekort = MAX(0, O - I)` 

---

## Notities en valkuilen

- Volgorde niet omkeren: `C_use` en `S` eerst bepalen voordat je rendementen en kosten berekent.  
- Valideer verwerkingstijden (bankprocessing) vóór berekenen van effectieve inzetduur binnen `T`.  
- Bij conditionele `O` of variabele opbrengst: voer scenario- of stochastische runs uit in stap 4 en 7.

---

_Last updated: [datum invullen]._  
Zie ook: **Berekening → Variabelen** en **Modellering → Simulatie**.
