# Cumulatief

**Situatie**  
Meerdere Time Gap Cash Flow-cycli waarbij netto-opbrengsten uit eerdere cycli beschikbaar blijven en de totale beschikbare middelen beïnvloeden.

---

## Gegeven

- Startparameters gelijk aan het enkelvoudige voorbeeld.  
- Netto-opbrengsten worden niet onttrokken maar blijven beschikbaar.  
- Inzetbare fractie (`f`) blijft constant.  
- Verplichtingen blijven gelijk per cyclus.

---

## Cumulatief effect

Na elke cyclus neemt de totale beschikbare buffer toe:

| Cyclus | Beschikbare buffer na afwikkeling |
|------:|----------------------------------:|
| 1 | 2.400 |
| 2 | 4.800 |
| 3 | 7.200 |
| 4 | 9.600 |
| 5 | 12.000 |

---

## Observatie

- De reserve groeit zonder extra externe instroom.  
- De kans op liquiditeitsproblemen neemt af naarmate meer cycli succesvol zijn afgerond.  
- Het systeem vertoont pad-afhankelijkheid: vroege uitkomsten beïnvloeden latere robuustheid.

---

## Interpretatie

Cumulatie introduceert een nieuwe dimensie: tijdsafhankelijke versterking. Dit maakt het model gevoeliger voor aannames, maar ook robuuster tegen incidentele verstoringen.

Tegelijkertijd geldt dat fouten of negatieve afwijkingen zich eveneens kunnen opstapelen.

---

Voor analyse van variatie en faalkansen bij cumulatie, zie **Modellering → Simulatie** en **Risico → Structureel**.
