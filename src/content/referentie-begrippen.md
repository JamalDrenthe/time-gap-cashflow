# Begrippen

**Doel**  
Eén gemeenschappelijke bron van waarheid voor termen en symbolen die in alle documenten en scripts worden gebruikt. Gebruik exact deze benamingen in spreadsheets, code en rapporten.

---

## Kerntermen en notatie

- `C_in` — Ontvangst; bruto ontvangen bedrag op t₀; decimaal (bijv. 100000.00).
- `f` — Fractie inzetbaar; deel van C_in dat juridisch/operationeel inzetbaar is; 0 < f ≤ 1 (bijv. 0,8).
- `C_use` — Inzet; C_use = f · C_in; daadwerkelijk ingezet bedrag; decimaal (bijv. 80000.00).
- `S` — Reserve; S = C_in − C_use; niet-ingezet deel; decimaal (bijv. 20000.00).
- `T` — Interval / Time gap; dagen tussen ontvangst en verplichting; integer (bijv. 30).
- `O` — Verplichting; bedrag verschuldigd op t₀+T; decimaal (bijv. 100000.00).
- `R(T)` — Opbrengst; bruto opbrengst gerealiseerd binnen T; decimaal.
- `K_op` — Operationele kosten; directe kosten per cycle; decimaal.
- `Π` — Netto-opbrengst; Π = R(T) − C_use − K_op; decimaal.
- `ROC` — Rendement per cycle; ROC = Π / C_use; decimaal.
- `r_d` — Dagelijks rendement; r_d ≈ ROC / T; decimaal/dag.
- `TM` — Timingmarge; TM = T − realisatietijd(OP); dagen.
- `B` — Buffer; additionele liquiditeitsbuffer (extern of intern); decimaal.
- `LSI` — Liquiditeitsstress-index; LSI = (O − B) / O; decimaal.

---

## Notatie- en opslagrichtlijnen

- Tijdstempels: ISO 8601 met offset (aanbevolen: `YYYY-MM-DDTHH:MM:SS±HH:MM`).
- Valuta: ISO 4217 (bv. EUR). Sla bedrag en valuta apart op.
- Numeriek: decimaal-type (geen float) met 2 decimalen voor euro-waarden.
- Bronvermelding: elke variabele heeft een `source` attribuut (bv. `bank_mutatie`, `contract`, `manual_input`).
- Versiebeheer: wijzigingen in definities documenteren in `/docs/changelog.md`.

_Last updated: [datum invullen]._ 
