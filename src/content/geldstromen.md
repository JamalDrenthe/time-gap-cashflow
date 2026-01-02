# Geldstromen

**Doel**  
Deze sectie behandelt de financiële componenten van het Time Gap Cash Flow-model: welke geldstromen relevant zijn, welke rollen zij vervullen en hoe ze elkaar beïnvloeden. De pagina biedt een compact overzicht van de subonderwerpen: inzet, reserve en terugbetaling.

---

## Inhoud van deze sectie

- **Inzet** — het deel van de ontvangst dat operationeel wordt ingezet binnen de time gap.  
- **Reserve** — het deel van de ontvangst dat niet wordt ingezet en fungeert als eerste buffer.  
- **Terugbetaling** — de uitgaande kasstroom die op het einde van de time gap voldaan moet worden.

Deze componenten vormen samen de financiële flows die centraal staan in het model. Begrip van hun eigenschappen en interacties is noodzakelijk voor correcte rekenmodellen en toetsing.

---

## Kernrelaties (kort)

```
C_in = totaal ontvangen bedrag (t₀)
C_use = inzetbaar deel = f · C_in
S = reserve = C_in − C_use
R(T) = opbrengst uit C_use binnen T
O = uitgaande verplichting op t₀+T

Op moment t₀+T moet gelden:
Beschikbaar_at_due = S + R(T) + buffer >= O
```

- `C_use` is de motor van opbrengst binnen de time gap.  
- `S` biedt directe bescherming tegen laat binnenkomende opbrengsten.  
- `O` bepaalt de benodigde dekking op het moment van verplichting.

---

## Wanneer raadpleeg je deze pagina?

- Als je wilt bepalen welk deel van ontvangsten inzetbaar is.  
- Als je reserve- en bufferbeleid gaat beoordelen.  
- Als je wilt begrijpen welke eisen terugbetalingstermijnen opleggen.

_Last updated: [datum invullen]._  
Zie ook: **Tijd → Ontvangst**, **Fundament → Definitie**, **Berekening**.
