# Grenzen

**Doel**  
Beschrijven welke grenzen er zijn aan conclusies die uit Time Gap Cash Flow-analyses getrokken kunnen worden. Deze pagina helpt misinterpretatie te voorkomen.

---

## Typische interpretatiegrenzen

1. **Averagedata verhult staarten**  
   - Gemiddelden kunnen positieve uitkomsten laten zien terwijl staarten (P5) ernstige risico’s verbergen.

2. **Correlatie ≠ causaliteit**  
   - Observaties dat langere intervals samengaan met hogere opbrengst bewijzen geen causaal effect; andere factoren kunnen mediëren.

3. **Overfitting van historische patronen**  
   - Uitkomsten die sterk afhangen van historische regulariteiten verliezen waarde als die regulariteiten veranderen.

4. **Data- en implementatieverschil**  
   - Een rekenmodel dat werkt op gezuiverde data kan falen in operationele systemen waar boekingsdatums en valutadatums afwijken.

5. **Scope-uitbreiding verandert betekenis**  
   - Extensies zoals het betrekken van niet-vrij besteedbare ontvangsten of het vormen van afhankelijkheden op nieuwe instroom veranderen het model fundamenteel.

---

## Waarschuwingssignalen voor overschrijding van grenzen

- Enkelvoudige scenario’s worden gepresenteerd zonder sensitivity checks.  
- Percentielen in de staart (P1–P5) zijn niet gerapporteerd.  
- Modelresultaten hangen sterk af van één ongeteste parameter.  
- Er is geen traceerbare versiehistorie van modelconfiguratie en data.

---

## Praktische tips (interpretatie-gedreven)

- Focus op staartstatistiek (P5) naast mediaan/gemiddelde.  
- Vraag altijd: welke aannames, en hoe gevoelig is het resultaat voor die aannames?  
- Vermijd extrapolatie buiten de historische bandbreedtes zonder expliciete motivering en extra tests.

---

## Conclusie

Interpretatie zonder aandacht voor grenzen leidt tot overschatting van informatiewaarde. Deze pagina ondersteunt herkenning van die grenzen en het voorkomen van onterechte generalisatie.

_Last updated: [datum invullen]._
