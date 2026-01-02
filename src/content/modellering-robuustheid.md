# Robuustheid

**Doel**  
Robuustheidsanalyse onderzoekt of en wanneer een Time Gap Cash Flow-constructie stabiel blijft onder onzekerheid. Dit onderdeel draait om stresstesten, gevoeligheidsanalyse en beleidslimieten.

---

## Componenten van robuustheidsanalyse

1. **Stresstesten**  
   - Deterministische schokken (bijv. +25% realisatietijd, −50% opbrengst).  
   - Scenario’s die plausibele extreme situaties modelleren.

2. **Gevoeligheidsanalyse**  
   - Eenvoudige één-factor-variaties (one-way sensitivity).  
   - Multi-factor regressie of waarderingssensitiviteit (variance-based methods).

3. **Policylimieten en operating bands**  
   - Formuleer heldere limieten: maximale acceptabele faalkans, minimale TM, minimale reserve.  
   - Definieer triggers en escalatieregels (niet technisch maar conceptueel).

---

## Praktische aanpak

- **Definieer kritieke KPI’s**: kans op tekort, P5 netto-opbrengst, mediane TM.  
- **Voer stresstesten uit**: fixed shocks en combinaties die plausibel zijn binnen de bedrijfscontext.  
- **Voer gevoeligheidsdiagrammen uit**: tornado charts of spider plots om dominante inputs te identificeren.  
- **Stel policies**: bepaal acceptatiecriteria op basis van KPI’s (bv. accepteerbaar als default_rate < X%).

---

## KPI-voorbeelden en grenswaarden (conceptueel)

- `default_rate` (kans op tekort): beleidsdrempel bv. ≤ 1% (contextafhankelijk).  
- `TM_median` (median timingmarge): beleidsdrempel bv. ≥ 3 dagen.  
- `P5_Pi` (5e percentiel van netto-opbrengst): moet > 0 of boven acceptabele verlieslijn.

**Opmerking:** exacte grenswaarden zijn context- en risicocultuur-afhankelijk; de site presenteert concepten, geen beleidsdrempels.

---

## Rapportage en governance

- Rapporteer robuustheidsresultaten in een overzichtstabel per scenario.  
- Documenteer aannames en conversietabellen.  
- Versiebeheer van scenario-definities is essentieel voor audit and traceability.

---

## Interpretatie en beperkingen

- Robuustheid is geen garantie; het geeft inzicht in waar en hoe het systeem breekt.  
- Stresstesten moeten realistische en relevante schokken gebruiken; onrealistische extreme shocks zeggen weinig over operationele haalbaarheid.

_Last updated: [datum invullen]._ 
