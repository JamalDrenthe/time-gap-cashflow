# Inzet

**Doel**  
Deze pagina beschrijft wat onder 'inzet' verstaan wordt, welke beperkingen en eigenschappen van invloed zijn op de inzetbaarheid van middelen, en welke operationele en juridische factoren de keuze van \(C_{use}\) bepalen.

---

## Definitie

- **Inzet** (symbolen):  
  - \(C_{use} = f \cdot C_{in}\)  
  - Waarbij \(0 < f \le 1\) de fractie is van de ontvangst die juridisch en operationeel inzetbaar is binnen de time gap.

Inzet is het deel van de binnenkomende kasstroom dat effectief wordt toegepast in activiteiten of instrumenten tijdens de tussenperiode.

---

## Relevante attributen

- **Fractie (f)** — percentage van \(C_{in}\) dat vrij inzetbaar is.  
- **Liquiditeitsvrijheid** — juridische en contractuele ruimte om het geld te gebruiken.  
- **Snelheid van inzet** — de mate waarin middelen snel en efficiënt kunnen worden gealloceerd.  
- **Opschalingskosten** — transactiekosten of marginale kosten verbonden aan inzet.

---

## Operationele en juridische restricties

- Contractclausules kunnen inzet beperken (escrow, retentie).  
- Bank- of betaalvoorwaarden (verwerkingstijd, valuta) beïnvloeden effectieve inzetbaarheid.  
- Interne goedkeuringsprocessen (bijv. manual sign-offs) vergroten doorlooptijd en verlagen \(f\).

---

## Toetsingschecklist voor inzet

- [ ] Is \(f\) expliciet gedocumenteerd en gecontroleerd?  
- [ ] Zijn juridische beperkingen op \(C_{in}\) geverifieerd?  
- [ ] Zijn transactiekosten en uitvoeringskosten gekwantificeerd (K_op)?  
- [ ] Is een operationeel proces beschikbaar om inzet binnen T te realiseren?  
- [ ] Is er een fallback-procedure als inzet niet het verwachte resultaat oplevert?

---

## Voorbeeld (kort)

- **Case:** \(C_{in} = €100.000\); contract laat 80% gebruik toe → \(f = 0{,}8\) → \(C_{use} = €80.000\).  
- **Opmerking:** indien bankprocessing 3 werkdagen duurt, reduceert dat effectief de inzetbare tijd binnen \(T\).

---

## Notities voor modellering

- Modelleer \(f\) als variabele met distributie in simulaties indien onzeker.  
- Houd onderscheid tussen bruto inzet en netto inzet (na fees).  
- Documenteer alle aannames rond juridische vrijgave en verwerkingstijd.

_Last updated: [datum invullen]._  
Zie ook: **Vereisten** en **Tijd → Ontvangst**.
