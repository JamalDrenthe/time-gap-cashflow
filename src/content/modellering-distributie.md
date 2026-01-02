# Distributie

**Doel**  
Aanwijzingen voor het kiezen, fitten en diagnostiseren van kansverdelingen voor inputvariabelen in TGC-simulaties.

Correcte specificatie van distributies is cruciaal: verkeerde distributies leiden tot foutieve kansinschattingen.

---

## Veelgebruikte distributies (en toepassingen)

- **Normale verdeling (Gaussian)** — gebruikelijk voor fouten die symmetrisch rond een gemiddelde zijn; niet geschikt voor sterke scheefheid of niet-negatieve grootheden.  
- **Log-normaal** — geschikt voor strikt positieve, scheve grootheden (bijv. doorlooptijden, positieve rendementen).  
- **Beta** — bruikbaar voor verhoudingen/percentages (bijv. f inzetbaar tussen 0 en 1).  
- **Gamma / Exponentieel** — voor positieve, rechtsscheve wachttijden of durations.  
- **Discrete verdelingen** — voor telvariabelen of scenario-indexen.

---

## Stappen voor fitten

1. **Verzamel historische data** (N≥30 aanbevolen).  
2. **Visualiseer**: histogram en Q-Q plot.  
3. **Kies kandidaatverdelingen** op basis van vorm (scheefheid, tail behaviour).  
4. **Fit parameters** via maximum likelihood of moment-matching.  
5. **Diagnostiek**: gebruik KS-test, Anderson-Darling of visuele Q-Q inspectie.  
6. **Validatie**: out-of-sample checks of k-fold cross-validation indien datavolume toereikend.

---

## Praktische adviezen

- Modeliseer fracties (zoals f) bij voorkeur met Beta-distributies, niet met ongeconstrueerde normals.  
- Voor rendementen: let op kans op negatieve waarden; gebruik geschikte onderste- en bovengrenzen.  
- Vermijd het blind gebruiken van normale verdelingen voor strikt positieve variabelen.  
- Documenteer fit-statistieken en visuele checks in je rapport.

---

## Onzekerheid in distributies

- Als data schaars is: gebruik breder vertrouwen (conservatieve parameters) of expert-elicitation.  
- Overweeg robustheidschecks met alternatieve distributies (sensitivity to family).

---

## Metadata en opslag

- Bewaar fitparameters, fitmethoden en diagnostic outputs in je modelconfig.  
- Versienummer de fit en noteer de datum waarop data is verzameld.

_Last updated: [datum invullen]._
