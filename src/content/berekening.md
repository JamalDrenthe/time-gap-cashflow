# Berekening

**Doel**  
Deze sectie beschrijft de rekenkundige methodiek voor Time Gap Cash Flow: welke grootheden worden gebruikt, in welke volgorde berekeningen plaatsvinden en welke parameters als constant worden behandeld. De bedoeling is reproduceerbaarheid en eenduidigheid van modellen.

---

## Inhoud van deze sectie

- **Variabelen** — lijst van alle gebruikte symbolen en hun betekenis.  
- **Volgorde** — stap-voor-stap procedure voor het uitvoeren van een cycle-berekening.  
- **Constanten** — aannames en parameters die per analyse vastliggen (bijv. valuta, afrondingsregels, tijdseenheid).

Voor concrete formules en voorbeelden zie de subpagina’s. Hieronder volgen de kernformules die in vrijwel ieder model terugkomen.

---

## Kernformules (conceptueel)

**Netto-opbrengst per cycle**
\[
\Pi = R(T) - C_{use} - K_{op}
\]

**Rendement op ingezet kapitaal (per cycle)**
\[
\mathrm{ROC} = \frac{\Pi}{C_{use}}
\]

**Rendement per dag (lineair benadering)**
\[
\mathrm{ROC}_{\text{dag}} \approx \frac{\mathrm{ROC}}{T}
\]

**Annualisatie (herhaalbare cycli, herbelegging)**
\[
\text{Annualized} = (1+\mathrm{ROC})^{\frac{365}{T}} - 1
\]

**Break-even time gap (lineair dagrendement \(r_d\))**
\[
T_{\text{break-even}} = \frac{K_{op}}{C_{use}\cdot r_{d}}
\]

---

## Gebruik en waarschuwingen

- Rekenmodellen zijn helderder en betrouwbaarder wanneer alle tijdstempels in dezelfde tijdseenheid (dagen) en dezelfde tijdzone zijn opgeslagen.  
- R(T) is in de praktijk vaak niet perfect lineair; gebruik empirische data of scenario’s indien beschikbaar.  
- Annualisatie impliceert herbelegging in identieke cycli en is alleen geschikt als die veronderstelling realistisch is.

---

_Last updated: [datum invullen]._  
Zie ook: **Berekening → Variabelen**, **Berekening → Volgorde**, **Berekening → Constanten**.
