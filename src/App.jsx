import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink, useLocation, useParams } from 'react-router-dom'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
} from 'recharts'
import { Calculator, Info, Activity, Lock, Unlock, Zap, ChevronRight, Globe, Users, Sun, Moon, Search, X, Play, Pause } from 'lucide-react'
import './index.css'

const navStructure = [
  {
    title: 'Home',
    slug: 'home',
    descriptionNl: 'Overzicht van de documentatiestructuur.',
    descriptionEn: 'Overview of the documentation structure.',
    bodyNl:
      'Kies een hoofdstuk in de navigatie om de onderliggende onderwerpen te bekijken. Deze site is documentair en bevat geen call-to-actions.',
    bodyEn:
      'Select a chapter in the navigation to view its topics. This site is documentary in nature and contains no calls-to-action.',
    children: [],
  },
  {
    title: 'Orientatie',
    slug: 'orientatie',
    descriptionNl: 'Kader en doelstelling van de analyse.',
    descriptionEn: 'Frame and objectives of the analysis.',
    children: [
      {
        title: 'Scope',
        slug: 'scope',
        introNl:
          'Deze documentatie behandelt het Time Gap Cash Flow-concept uitsluitend binnen een theoretisch, rekenkundig en beschrijvend kader. De scope is expliciet begrensd om interpretatie- en toepassingsfouten te voorkomen.',
        introEn:
          'This documentation addresses the Time Gap Cash Flow concept strictly within a theoretical, computational, and descriptive frame. The scope is bounded to avoid interpretation and application errors.',
        blocks: {
          nl: [
            {
              heading: 'Afbakening van het onderwerp',
              items: [
                'het analyseren van tijdelijke verschillen tussen kasinstroom en kasuitstroom;',
                'het formeel beschrijven van sequenties van geldstromen in de tijd;',
                'het modelleren van interne samenhang tussen timing, omvang en volgorde van kasbewegingen.',
                'De focus ligt op structuur, niet op resultaat.',
              ],
            },
            {
              heading: 'Wat valt binnen scope',
              items: [
                'conceptuele definities van tijdsgebonden kasstromen;',
                'abstracte rekenmethodieken voor temporele verschuivingen;',
                'illustratieve voorbeelden ter verduidelijking van het model;',
                'simulaties en vereenvoudigde modellen ter toetsing van interne consistentie;',
                'expliciete randvoorwaarden en foutgevoeligheden.',
                'Alle voorbeelden zijn didactisch en uitsluitend ter illustratie.',
              ],
            },
            {
              heading: 'Wat valt expliciet buiten scope',
              items: [
                'investeringsadvies of financiële aanbevelingen;',
                'rendement, winstgevendheid of optimalisatie;',
                'fiscale, juridische of boekhoudkundige toepassingen;',
                'commerciële producten, diensten of strategieën;',
                'persoonlijke of institutionele besluitvorming.',
                'Eventuele gelijkenis met praktijken of modellen is niet normatief en impliceert geen toepasbaarheid.',
              ],
            },
            {
              heading: 'Interpretatiebeperkingen',
              items: [
                'Het raamwerk garandeert geen uitkomsten.',
                'Het voorspelt geen toekomstige gebeurtenissen.',
                'Het veronderstelt geen marktomstandigheden.',
                'Het abstraheert van externe onzekerheden.',
                'Het model is intern consistent, maar niet allesomvattend.',
              ],
            },
            {
              heading: 'Doel van de afbakening',
              items: [
                'analytische helderheid waarborgen;',
                'semantische verwarring voorkomen;',
                'scheiding houden tussen beschrijving en toepassing;',
                'overdracht van het concept reproduceerbaar maken.',
                'Toepassing buiten deze scope vereist eigen interpretatie en aanvullende toetsing.',
              ],
            },
            {
              heading: 'Relatie tot andere hoofdstukken',
              items: [
                'Fundament definieert de kernbegrippen die binnen deze scope gelden.',
                'Tijd en Geldstromen werken de afzonderlijke dimensies uit.',
                'Berekening formaliseert de rekenkundige relaties.',
                'Beperkingen & Risico beschrijft waar het model faalt of misleidend kan worden.',
              ],
            },
            {
              heading: 'Slotopmerking',
              body:
                'Deze scope is bewust restrictief. Uitbreiding of interpretatie buiten dit kader valt buiten de verantwoordelijkheid van deze documentatie.',
            },
          ],
          en: [
            {
              heading: 'Subject delineation',
              items: [
                'analyzing timing gaps between cash inflows and outflows;',
                'formally describing sequences of cash movements over time;',
                'modelling internal coherence between timing, size, and order of cash movements.',
                'Focus is on structure, not outcome.',
              ],
            },
            {
              heading: 'Within scope',
              items: [
                'conceptual definitions of time-bound cash flows;',
                'abstract computational methods for temporal shifts;',
                'illustrative examples clarifying the model;',
                'simulations and simplified models to test internal consistency;',
                'explicit boundary conditions and error sensitivities.',
                'All examples are didactic and illustrative only.',
              ],
            },
            {
              heading: 'Explicitly out of scope',
              items: [
                'investment advice or financial recommendations;',
                'return, profitability, or optimization;',
                'tax, legal, or accounting applications;',
                'commercial products, services, or strategies;',
                'personal or institutional decision-making.',
                'Any resemblance to existing practices or models is non-normative and implies no applicability.',
              ],
            },
            {
              heading: 'Interpretation limits',
              items: [
                'The framework guarantees no outcomes.',
                'It does not predict future events.',
                'It assumes no market conditions.',
                'It abstracts from external uncertainties.',
                'The model is internally consistent but not exhaustive.',
              ],
            },
            {
              heading: 'Purpose of delineation',
              items: [
                'ensure analytical clarity;',
                'avoid semantic confusion;',
                'maintain separation between description and application;',
                'make transmission of the concept reproducible.',
                'Use outside this scope requires own interpretation and added validation.',
              ],
            },
            {
              heading: 'Relation to other chapters',
              items: [
                'Foundation defines the core concepts within this scope.',
                'Time and Cashflows elaborate the individual dimensions.',
                'Calculation formalizes computational relations.',
                'Limitations & Risk describe where the model fails or misleads.',
              ],
            },
            {
              heading: 'Closing note',
              body: 'This scope is intentionally restrictive. Extending or interpreting beyond it is outside this documentation’s responsibility.',
            },
          ],
        },
      },
      {
        title: 'Relevantie',
        slug: 'relevantie',
        introNl:
          'Deze pagina beschrijft de omstandigheden waaronder het concept Time Gap Cash Flow analytisch relevant is. Relevantie betekent: onderscheidende uitleg of praktische waarde bij het analyseren van kasstroompatronen. Relevantie is geen aanbeveling voor toepassing.',
        introEn:
          'This page describes when the Time Gap Cash Flow concept is analytically relevant. Relevance here means distinctive explanatory or practical value in analysing cash-flow patterns. Relevance is not a recommendation to apply.',
        blocks: {
          nl: [
            {
              heading: 'Centrale criteria voor relevantie',
              body:
                'Een scenario is analytisch relevant wanneer aan ten minste twee van de volgende drie voorwaarden wordt voldaan:',
              items: [
                'Temporale discrepantie — er bestaat een duidelijk, structureel verschil tussen ontvangst en uitstroom.',
                'Voorspelbaarheid van kasstromen — ontvangsten en verplichtingen zijn voldoende voorspelbaar (contractueel, recurrent of historisch betrouwbaar).',
                'Beknopt operationeel tijdsvenster — de tussenperiode is lang genoeg om binnen die tijd een beheersbare activiteit uit te voeren.',
                'Bij twee van de drie voorwaarden helpt TGC onderscheid te maken tussen wat tijdelijk benutbaar is en wat niet.',
              ],
            },
            {
              heading: 'Meetbare indicatoren (sneltoets)',
              items: [
                'T (dagen) — lengte van de tussenperiode; te kort < 2, relevant ≥ 7–14 (afhankelijk van activiteit).',
                'CV (ontvangst) — variantie in ontvangsttijden (laag = voorspelbaar).',
                'CV (verplichting) — variantie in verplichtingstijden (laag = vaste due dates).',
                'f inzetbaar — fractie van ontvangst die zonder restricties inzetbaar is.',
                'Operationele doorlooptijd — gemiddelde tijd die inzetactiviteiten kosten.',
                'Als T ≥ doorlooptijd, CV’s laag en f inzetbaar > 0,5 → analytische relevantie is hoog.',
              ],
            },
            {
              heading: 'Typische situaties waarin het concept relevant is',
              items: [
                'Aanbetalingen en vooruitbetalingen — ontvangst vooraf, levering later.',
                'Leverancierskrediet / betalingstermijnen — inkoop op krediet, snellere verkoop dan betalingstermijn.',
                'Projectaanbetalingen — tranche binnen fase ontvangen, uitgaven en marge in fase gerealiseerd.',
                'Abonnementen / prepaid services — periodieke ontvangst, latere levering van diensten.',
                'Event- of ticketing-voorverkoop — ontvangst ruim voor uitvoering, kortcyclische inzet mogelijk.',
                'Relevantie blijft voorwaardelijk: voorspelbaarheid en marge op inzet moeten aanwezig zijn.',
              ],
            },
            {
              heading: 'Voorbeeld-checklist (praktisch, snel)',
              items: [
                'Ontvangst is contractueel of herhaalbaar → ja / nee',
                'Betalingstermijn of verplichting is vast/bekend → ja / nee',
                'Er is binnen het interval een kortcyclische activiteit met opbrengst → ja / nee',
                'Een substantieel deel van de ontvangsten mag worden ingezet (geen juridische belemmeringen) → ja / nee',
                'Twee of meer ja-antwoorden → verhoogde analytische relevantie.',
              ],
            },
            {
              heading: 'Snel waarschuwingskader (wanneer relevantie misleidend is)',
              items: [
                'Voorwaardelijke ontvangsten (terugvorderbaar, chargebacks) — niet vrij besteedbaar.',
                'Hoge operationele onzekerheid — uitvoeringstijd varieert sterk.',
                'Juridische beperkingen — contractuele clausules verbieden tijdelijke inzet.',
                'Afhankelijkheid van nieuwe instroom — continuïteit vereist steeds nieuwe ontvangst (geen duurzame TGC-constructie).',
              ],
            },
            {
              heading: 'Wat maakt relevantie sterker (kwalitatieve factoren)',
              items: [
                'Stabiliteit van tegenpartijen (lage default-historie).',
                'Eenvoudige operationele processen (korte doorlooptijden, weinig handmatig).',
                'Toegankelijke liquiditeitsbuffers (reserves of goedgekeurde back-up lijnen).',
                'Meetbare KPI’s per cycle (netto opbrengst, kosten, faalkans).',
              ],
            },
            {
              heading: 'Conclusie (samenvattend)',
              body:
                'TGC is relevant wanneer er een structureel en voorspelbaar tijdsverschil bestaat dat groot genoeg is om binnen die periode een reproduceerbare, beheersbare inzet te realiseren. Relevantie is conditioneel en impliceert geen toepasbaarheid; aanvullende toetsing blijft noodzakelijk.',
            },
          ],
          en: [
            {
              heading: 'Central relevance criteria',
              body: 'A scenario is analytically relevant when at least two of the following three conditions hold:',
              items: [
                'Temporal discrepancy — clear, structural difference between inflow timing and outflow timing.',
                'Predictability of cash flows — inflows and obligations are sufficiently predictable (contractual, recurrent, historically reliable).',
                'Manageable operational window — gap is long enough to execute a controllable activity within it.',
                'If two of three are present, TGC helps distinguish what is temporarily usable versus not.',
              ],
            },
            {
              heading: 'Measurable indicators (quick check)',
              items: [
                'T (days) — gap length; too short < 2, relevant ≥ 7–14 (activity-dependent).',
                'CV(inflow) — variance of inflow timing (low = predictable).',
                'CV(obligation) — variance of obligation timing (low = fixed due dates).',
                'f deployable — fraction of inflow deployable without restrictions.',
                'Operational cycle time — average time needed for the deploy/use activity.',
                'If T ≥ cycle time, CVs low, and f deployable > 0.5 → high analytical relevance.',
              ],
            },
            {
              heading: 'Typical situations where it applies',
              items: [
                'Deposits / prepayments — inflow upfront, delivery later.',
                'Supplier credit / payment terms — purchase on credit, faster resale than term.',
                'Project deposits — tranche received in a phase, spending and margin realized in-phase.',
                'Subscriptions / prepaid services — periodic inflow, later service delivery.',
                'Event or ticket pre-sales — inflow well before execution, short-cycle deployment possible.',
                'Relevance is conditional: predictability and margin on deployment must be present.',
              ],
            },
            {
              heading: 'Checklist (practical, quick)',
              items: [
                'Inflow is contractual or repeatable → yes / no',
                'Payment term or obligation is fixed/known → yes / no',
                'There is a short-cycle activity with yield within the gap → yes / no',
                'A substantial share of inflow may be deployed (no legal blocks) → yes / no',
                'Two or more yes → elevated analytical relevance.',
              ],
            },
            {
              heading: 'Warning frame (when relevance misleads)',
              items: [
                'Conditional inflows (clawbacks, chargebacks) — not freely spendable.',
                'High operational uncertainty — execution time is highly variable.',
                'Legal constraints — clauses forbid temporary deployment.',
                'Dependence on new inflow — requires constant new receipts (not a durable TGC construct).',
              ],
            },
            {
              heading: 'What strengthens relevance (qualitative factors)',
              items: [
                'Counterparty stability (low default history).',
                'Simple operational processes (short cycles, low manual load).',
                'Accessible liquidity buffers (reserves or approved backup lines).',
                'Measurable KPIs per cycle (net yield, cost, failure probability).',
              ],
            },
            {
              heading: 'Conclusion',
              body:
                'TGC is relevant when a structural, predictable time gap exists that is long enough to execute a reproducible, controllable deployment. Relevance is conditional and does not imply applicability; further validation remains required.',
            },
          ],
        },
      },
      {
        title: 'Uitsluiting',
        slug: 'uitsluiting',
        introNl:
          'Kader en doelstelling van de analyse. Factoren of situaties die expliciet niet worden meegenomen.',
        introEn:
          'Frame and purpose of the analysis. Factors or situations explicitly out of scope.',
        blocks: {
          nl: [
            {
              heading: 'Expliciete uitsluitingen',
              items: [
                'Investerings- of handelsadvies (geen aankooppunten, verkoop of portfoliostrategieën).',
                'Hefboom- of schuldconstructies (leverage-opzet wordt niet behandeld).',
                'Fiscale of juridische duiding (raadpleeg specialisten).',
                'Technische implementatie/automatisering (buiten documentatiescope).',
                'Garanties of rendementspredicties (voorbeelden zijn illustratief).',
              ],
            },
            {
              heading: 'Schijnbare overlaps (maar buiten scope)',
              items: [
                'Continu doorrollen van instroom — afhankelijkheid van nieuwe ontvangsten is geen duurzame TGC-toepassing.',
                'Speculatieve handel — prijsafhankelijk, valt buiten beoogd gebruik.',
              ],
            },
            {
              heading: 'Implicaties voor de lezer',
              items: [
                'Toepassing buiten deze grenzen vraagt eigen due diligence.',
                'Materiaal is documentair en bedoeld voor begrip/toetsing, niet als besluitvormingsbasis.',
              ],
            },
          ],
          en: [
            {
              heading: 'Explicit exclusions',
              items: [
                'Investment or trading advice (no buy/sell points or portfolio strategies).',
                'Leverage or debt constructs (not covered).',
                'Tax or legal interpretation (consult specialists).',
                'Technical implementation/automation (out of documentation scope).',
                'Guarantees or return predictions (examples are illustrative only).',
              ],
            },
            {
              heading: 'Apparent overlaps (still out of scope)',
              items: [
                'Continuously rolling inflows — dependence on new receipts is not a durable TGC application.',
                'Speculative trading — price-dependent, outside intended scope.',
              ],
            },
            {
              heading: 'Implications for readers',
              items: [
                'Using this beyond these boundaries requires your own due diligence.',
                'Material is documentary for understanding/testing, not a decision basis.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Fundament',
    slug: 'fundament',
    descriptionNl: 'Formeel fundament: begrippen, aannames en minimale voorwaarden.',
    descriptionEn: 'Formal foundation: concepts, assumptions, and minimum conditions.',
    introNl:
      'Deze sectie vormt het formele fundament van het Time Gap Cash Flow-kader. Hier werken we begrippen, aannames en minimale voorwaarden uit voor toetsbare rekenmodellen.',
    introEn:
      'This section is the formal foundation of the Time Gap Cash Flow frame. It spells out concepts, assumptions, and minimum conditions for testable computational models.',
    blocks: {
      nl: [
        {
          heading: 'Inhoud van deze sectie',
          items: [
            'Overzicht — compact schema van de bouwstenen en hun relaties.',
            'Definitie — tekstuele en formele definities van centrale termen.',
            'Afbakening — expliciete grenzen van het model; wat niet wordt behandeld.',
            'Vereisten — minimale data-, operationele en juridische condities voor validiteit.',
          ],
        },
        {
          heading: 'Relatie tot overige documentatie',
          body:
            'Het fundament ondersteunt de hoofdstukken Berekening, Voorbeelden, Modellering en Risico. Voor praktische voorbeelden en simulaties: zie die hoofdstukken; hier ligt de nadruk op interne consistentie en reproduceerbaarheid.',
        },
        {
          heading: 'Status',
          items: [
            'Laatst bijgewerkt: [datum invullen].',
            '[Overzicht](/fundament/overzicht), [Definitie](/fundament/definitie), [Afbakening](/fundament/afbakening), [Vereisten](/fundament/vereisten).',
          ],
        },
      ],
      en: [
        {
          heading: 'Contents of this section',
          items: [
            'Overview — compact schema of building blocks and relationships.',
            'Definition — textual and formal definitions of core terms.',
            'Delineation — explicit model boundaries; what is not covered.',
            'Requirements — minimum data, operational, and legal conditions for validity.',
          ],
        },
        {
          heading: 'Relation to other documentation',
          body:
            'The foundation supports Calculation, Examples, Modeling, and Risk. For practical cases and simulations, see those chapters; here the focus is internal consistency and reproducibility.',
        },
        {
          heading: 'Status',
          items: [
            'Last updated: [add date].',
            '[Overview](/fundament/overzicht), [Definition](/fundament/definitie), [Delineation](/fundament/afbakening), [Requirements](/fundament/vereisten).',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Overzicht',
        slug: 'overzicht',
        introNl:
          'Snelreferentie voor de kernbouwstenen van Time Gap Cash Flow en hun onderlinge relaties. Gebruik dit als eerste oriëntatiepunt binnen het formele model.',
        introEn:
          'Quick reference for the core building blocks of Time Gap Cash Flow and their relationships. Read this first to orient within the formal model.',
        blocks: {
          nl: [
            {
              heading: 'Kerncomponenten (kort)',
              items: [
                'Ontvangst — moment en bedrag van binnenkomende kasstroom.',
                'Inzet — deel van de ontvangst dat tijdelijk operationeel wordt gebruikt.',
                'Reserve — niet-ingezette deel van de ontvangst als buffer.',
                'Time gap / Interval — periode tussen ontvangst en uitgaande verplichting.',
                'Verplichting — bedrag dat op of vóór een moment betaald moet worden.',
                'Opbrengst — bruto resultaat van inzet binnen de time gap.',
                'Netto-uitkomst — opbrengst minus inzet en operationele kosten.',
                'Buffer — additionele liquiditeitsreserve los van de reserve.',
              ],
            },
            {
              heading: 'Relaties en afhankelijkheden',
              items: [
                'Lengte van T bepaalt uitvoerbaarheid van operationele inzet.',
                'Reserve en buffer bepalen robuustheid bij vertraging.',
                'Voorspelbaarheid van ontvangsten en verplichtingen is essentieel.',
                'Operationele kosten reduceren netto-uitkomst en moeten expliciet mee.',
              ],
            },
            {
              heading: 'Wanneer raadpleeg je deze pagina?',
              items: [
                'Snel begrijpen welke entiteiten in het model bestaan.',
                'Checklist vóór je in rekenmodellen duikt.',
                'Verifiëren of je dataset de juiste velden bevat.',
              ],
            },
            {
              heading: 'Eenvoudig schematisch overzicht',
              pre: `t0 (Ontvangst: C_in) ── inzet (C_use) ──[ time gap: T ]── verplichting (O) op t0+T\n│\n└─ reserve (S = C_in - C_use)\n\nInterpretatie: binnen T wordt inzet uitgevoerd en realiseert deze een opbrengst. Op moment van verplichting moeten O en operationele vereisten gedekt zijn door opbrengst, reserve en buffer.`,
            },
            {
              heading: 'Status',
              items: ['Laatst bijgewerkt: [datum invullen].'],
            },
          ],
          en: [
            {
              heading: 'Core components (short)',
              items: [
                'Inflow — timing and amount of incoming cash.',
                'Deployment — portion temporarily used operationally.',
                'Reserve — undeployed portion as buffer.',
                'Time gap / Interval — period between inflow and obligation.',
                'Obligation — amount due at or before a set time.',
                'Return — gross result of deployment within the gap.',
                'Net outcome — return minus deployment and operating costs.',
                'Buffer — additional liquidity reserve beyond reserve.',
              ],
            },
            {
              heading: 'Relations and dependencies',
              items: [
                'Length of T sets feasibility of deployment.',
                'Reserve and buffer drive robustness to delays.',
                'Predictability of inflows/obligations is essential.',
                'Operating costs reduce net outcome and must be explicit.',
              ],
            },
            {
              heading: 'When to use this page',
              items: [
                'To quickly grasp which entities exist in the model.',
                'As a checklist before diving into calculations.',
                'To verify your dataset has the right fields.',
              ],
            },
            {
              heading: 'Simple schematic',
              pre: `t0 (Inflow: C_in) ── deploy (C_use) ──[ time gap: T ]── obligation (O) at t0+T\n│\n└─ reserve (S = C_in - C_use)\n\nInterpretation: within T the deployment runs and yields a return. At obligation time, O and operational needs must be covered by return, reserve, and buffer.`,
            },
            {
              heading: 'Status',
              items: ['Last updated: [add date].'],
            },
          ],
        },
      },
      {
        title: 'Definitie',
        slug: 'definitie',
        introNl:
          'Hoofddefinitie en formele notatie van kernbegrippen binnen het Time Gap Cash Flow-kader. Gericht op analytische consistentie en reproduceerbaarheid.',
        introEn:
          'Main definition and formal notation of core concepts within the Time Gap Cash Flow frame, focused on analytical consistency and reproducibility.',
        blocks: {
          nl: [
            {
              heading: 'Hoofddefinitie',
              body:
                'Time Gap Cash Flow is het doelgericht inzetten van tijdelijk beschikbare liquiditeit — voortkomend uit een vastgestelde temporele discrepantie tussen kasontvangst en kasverplichting — met als doel binnen die periode operationele of financiële output te realiseren, waarna de oorspronkelijke verplichting wordt voldaan.',
            },
            {
              heading: 'Formele notatie (kort)',
              items: [
                '**C_in** — inkomende kasstroom (bedrag op t₀).',
                '**f** — fractie inzetbaar van C_in (0 < f ≤ 1).',
                '**C_use** — inzetbaar kapitaal = f · C_in.',
                '**S** — reserve = C_in − C_use.',
                '**T** — time gap (dagen).',
                '**O** — uitgaande kasverplichting op t₀+T.',
                '**R(T)** — bruto opbrengst gerealiseerd binnen T.',
                '**K_op** — operationele kosten per cycle.',
                '**Π** — netto per cycle = R(T) − C_use − K_op.',
                '**TM** — timingmarge = T − realisatietijd(OP).',
              ],
            },
            {
              heading: 'Uitleg kernbegrippen',
              items: [
                'Time gap (T) — periode tussen ontvangst en verplichting; inzetruimte.',
                'Inzet (C_use) — deel van de ontvangst dat wordt ingezet; kan contractueel beperkt zijn.',
                'Reserve (S) — niet-ingezette middelen ter dekking van verplichtingen bij uitblijvende opbrengst.',
                'Netto-opbrengst (Π) — extra cashflow na afronding van de cycle; kernoutput voor evaluatie.',
              ],
            },
            {
              heading: 'Voorbeeldformule (conceptueel)',
              pre: `Netto-opbrengst per cycle:\nΠ = R(T) − C_use − K_op\n\nRendement op ingezet kapitaal:\nROC = Π / C_use\n\nAnnualisatie (herhaalbare cycli):\nAnnualized = (1 + ROC)^(365/T) − 1\n(let op: beperkingen bij herbelegging en operationele herhaalbaarheid)`,
            },
            {
              heading: 'Notities en interpretatie',
              items: [
                'Definities zijn descriptief en bedoeld voor analytische consistentie.',
                'Symbolen zijn aanbevelingen; software-implementatie kan extra velden vereisen (id, counterparty, clausules).',
                'R(T) kan niet-lineair zijn; formules zijn simplificaties voor reproduceerbare toetsing.',
              ],
            },
            {
              heading: 'Status',
              items: [
                'Laatst bijgewerkt: [datum invullen].',
                '[Fundament → Afbakening](/fundament/afbakening)',
                '[Fundament → Vereisten](/fundament/vereisten)',
              ],
            },
          ],
          en: [
            {
              heading: 'Main definition (textual)',
              body:
                'Time Gap Cash Flow is the intentional deployment of temporarily available liquidity—arising from a defined temporal gap between cash inflow and obligation—to realize operational or financial output within that gap, after which the original obligation is settled.',
            },
            {
              heading: 'Formal notation (short)',
              items: [
                '**C_in** — incoming cash at t₀ (EUR, timestamp t₀).',
                '**f** — deployable fraction of C_in (0 < f ≤ 1).',
                '**C_use** — deployed capital = f · C_in.',
                '**S** — reserve = C_in − C_use.',
                '**T** — time gap (days).',
                '**O** — obligation at t₀+T.',
                '**R(T)** — gross return realized within T.',
                '**K_op** — operational costs per cycle.',
                '**Π** — net per cycle = R(T) − C_use − K_op.',
                '**TM** — timing margin = T − realization time(OP).',
              ],
            },
            {
              heading: 'Key terms',
              items: [
                'Time gap (T) — interval between inflow and obligation; usable window.',
                'Deployment (C_use) — portion deployed; may be contractually constrained.',
                'Reserve (S) — undeployed funds to meet obligations if returns lag.',
                'Net output (Π) — incremental cashflow per cycle; core evaluation metric.',
              ],
            },
            {
              heading: 'Example formulas',
              pre: `Net per cycle:\nΠ = R(T) − C_use − K_op\n\nReturn on deployed capital:\nROC = Π / C_use\n\nAnnualized (repeatable cycles):\nAnnualized = (1 + ROC)^(365/T) − 1\n(caution: reinvestment and operational repeatability limits apply)`,
            },
            {
              heading: 'Notes',
              items: [
                'Definitions are descriptive for analytical consistency.',
                'Symbols are recommended; implementations may need extra fields (id, counterparty, clauses).',
                'R(T) can be non-linear; formulas are simplified for reproducible testing.',
              ],
            },
            {
              heading: 'Status',
              items: [
                'Last updated: [add date].',
                '[Foundation → Delineation](/fundament/afbakening)',
                '[Foundation → Requirements](/fundament/vereisten)',
              ],
            },
          ],
        },
      },
      {
        title: 'Afbakening',
        slug: 'afbakening',
        introNl:
          'Expliciete grenzen van het documentaire kader om misinterpretatie en scope-creep te voorkomen. Deze pagina verduidelijkt wat niet wordt behandeld.',
        introEn:
          'Explicit boundaries of the documentary frame to prevent misinterpretation and scope creep. This page clarifies what is not covered.',
        blocks: {
          nl: [
            {
              heading: 'Waarom afbakenen?',
              body:
                'Zonder expliciete grenzen kunnen analytische noties worden gelezen als operationele aanbevelingen, beleggings- of juridisch advies. Deze pagina markeert wat buiten scope valt.',
            },
            {
              heading: 'Expliciete uitsluitingen',
              items: [
                'Investerings- of handelsadvies (geen aankooppunten, verkoop of portfoliostrategieën).',
                'Hefboom- of schuldconstructies (leverage-opzet wordt niet behandeld).',
                'Fiscale en juridische interpretatie (geen advies; laat specialisten toetsen).',
                'Automatiserings-implementatie (technische integratie valt buiten scope).',
                'Garantie of voorspelling van rendement (voorbeelden zijn illustratief, geen garantie).',
              ],
            },
            {
              heading: 'Gevallen van schijnbare overlap',
              items: [
                'Voortdurend rollende ontvangsten — afhankelijk van nieuwe instroom is geen duurzame toepassing.',
                'Speculatieve trading — prijsafhankelijk en buiten de bedoelde reikwijdte.',
              ],
            },
            {
              heading: 'Consequenties voor de gebruiker',
              items: [
                'Praktische toepassing buiten deze afbakening vereist aanvullende due diligence.',
                'Materiaal is bedoeld voor begrip en toetsing; niet als enige basis voor beslissingen.',
              ],
            },
            {
              heading: 'Status',
              items: [
                'Laatst bijgewerkt: [datum invullen].',
                '[Fundament → Vereisten](/fundament/vereisten) voor toepasbaarheidstoetsing.',
              ],
            },
          ],
          en: [
            {
              heading: 'Why delineate?',
              body:
                'Without clear boundaries, analytical notions could be read as operational, investment, or legal advice. This page marks what is out of scope.',
            },
            {
              heading: 'Explicit exclusions',
              items: [
                'Investment or trading advice (no buy/sell points or portfolio strategies).',
                'Leverage or debt constructs (not covered).',
                'Tax and legal interpretation (no advice; consult specialists).',
                'Automation implementation (technical integration is out of scope).',
                'Guarantees or return predictions (examples are illustrative only).',
              ],
            },
            {
              heading: 'Apparent overlaps',
              items: [
                'Continuously rolling inflows — dependence on new receipts is not a durable application.',
                'Speculative trading — price-dependent, outside intended scope.',
              ],
            },
            {
              heading: 'User implications',
              items: [
                'Applying beyond this boundary requires additional due diligence.',
                'Materials are for understanding and testing, not sole basis for decisions.',
              ],
            },
            {
              heading: 'Status',
              items: [
                'Last updated: [add date].',
                '[Foundation → Requirements](/fundament/vereisten) for applicability checks.',
              ],
            },
          ],
        },
      },
      {
        title: 'Vereisten',
        slug: 'vereisten',
        introNl:
          'Toetsbare minimale voorwaarden om Time Gap Cash Flow-berekeningen zinvol en betrouwbaar uit te voeren. Onderverdeeld in data, operationeel en juridisch.',
        introEn:
          'Testable minimum conditions to run Time Gap Cash Flow calculations meaningfully and reliably, grouped into data, operational, and legal.',
        blocks: {
          nl: [
            {
              heading: 'Overzicht vereisten',
              items: ['Data-vereisten', 'Operationele vereisten', 'Juridische/contractuele vereisten'],
            },
            {
              heading: '1. Data-vereisten',
              items: [
                'Tijdstempels: datum van ontvangst (t₀) en verplichting (t₀+T).',
                'Bedragen: C_in, O, expliciete kostenposten (K_op).',
                'Identificatie: unieke id per cycle, counterparty id, contractreferentie.',
                'Historische doorlooptijden: realisatietijden van inzetactiviteiten (distributie over N cycli).',
                'Eventlogs: uitzonderingen, vertragingen, chargebacks.',
                'Dataset-eis: bij voorkeur N ≥ 30 vergelijkbare cycli voor robuuste variantieschatting.',
              ],
            },
            {
              heading: '2. Operationele vereisten',
              items: [
                'Beschikbaarheid van reserve: S = C_in − C_use expliciet en vrij besteedbaar.',
                'Aanwijsbare fallback: interne buffer of goedgekeurde back-up-lijn.',
                'Procesdiscipline: lage menselijke tussenkomst, korte doorlooptijden.',
                'KPI-meting: netto-opbrengst, faalkans, timingmarge per cycle.',
                'Praktisch criterium: ≥ 75% historische gevallen realisatietijd ≤ T; anders is robustheid onvoldoende.',
              ],
            },
            {
              heading: '3. Juridische en contractuele vereisten',
              items: [
                'Vrij besteedbare ontvangst (geen escrow/retentie die inzet verbiedt).',
                'Duidelijke verplichtingstermijnen: O tijdstechnisch afgebakend.',
                'Geen voorwaardelijke ontvangst met hoge kans op terugvordering/chargeback.',
                'Geen juridisch advies: laat specialisten casuïstisch toetsen.',
              ],
            },
            {
              heading: 'Validatie-checklist',
              items: [
                '[ ] Tijdsannotaties aanwezig voor ontvangsten en verplichtingen.',
                '[ ] Operationele doorlooptijden ≥ 30 cycli (of zoveel als praktisch).',
                '[ ] Reserve S expliciet en gedocumenteerd.',
                '[ ] Buffer of fallback aanwezig (bedrag + voorwaarden gedocumenteerd).',
                '[ ] Contractuele vrijgave van C_in bevestigd.',
                '[ ] KPI-definities en meetfrequentie vastgelegd (netto-opbrengst, faalkans, timingmarge).',
              ],
            },
            {
              heading: 'Wat te doen als vereisten niet worden gehaald',
              items: [
                'Niet toepassen — heroverweeg modelgebruik.',
                'Verzamel aanvullende data — prioriteit op tijden en eventlogs.',
                'Simuleer conservatief — verhoog buffers, verlaag verwachte opbrengsten.',
                'Voer pilot uit — kleinschalig, met strikte monitoring en fallback.',
              ],
            },
            {
              heading: 'Status',
              items: [
                'Laatst bijgewerkt: [datum invullen].',
                '[Fundament → Afbakening](/fundament/afbakening)',
              ],
            },
          ],
          en: [
            {
              heading: 'Requirements overview',
              items: ['Data requirements', 'Operational requirements', 'Legal/contractual requirements'],
            },
            {
              heading: '1. Data requirements',
              items: [
                'Timestamps: inflow (t₀) and obligation (t₀+T).',
                'Amounts: C_in, O, explicit cost items (K_op).',
                'Identification: unique cycle id, counterparty id, contract reference.',
                'Historical cycle times: realization times of deployments (distribution over N cycles).',
                'Event logs: exceptions, delays, chargebacks.',
                'Dataset: ideally N ≥ 30 similar cycles for variance estimation.',
              ],
            },
            {
              heading: '2. Operational requirements',
              items: [
                'Reserve availability: S = C_in − C_use explicit and free to use.',
                'Fallback: internal buffer or approved backup line.',
                'Process discipline: low manual intervention, short cycle times.',
                'KPI measurement: net output, failure probability, timing margin per cycle.',
                'Practical criterion: ≥ 75% historical cases realization time ≤ T; otherwise robustness is weak.',
              ],
            },
            {
              heading: '3. Legal and contractual requirements',
              items: [
                'Freely spendable inflow (no escrow/retention blocking deployment).',
                'Clear obligation timing: O time-bounded.',
                'No conditional inflow with high clawback/chargeback risk.',
                'No legal advice: consult specialists for cases.',
              ],
            },
            {
              heading: 'Validation checklist',
              items: [
                '[ ] Time annotations present for inflows and obligations.',
                '[ ] Operational cycle times over ≥ 30 cycles (or as practical).',
                '[ ] Reserve S explicit and documented.',
                '[ ] Buffer or fallback present (amount and terms documented).',
                '[ ] Contractual release of C_in confirmed.',
                '[ ] KPI definitions and measurement frequency set (net output, failure probability, timing margin).',
              ],
            },
            {
              heading: 'If requirements are not met',
              items: [
                'Do not apply — reconsider model use.',
                'Collect additional data — prioritize timings and event logs.',
                'Simulate conservatively — raise buffers, lower expected returns.',
                'Run a pilot — small scale with strict monitoring and fallback.',
              ],
            },
            {
              heading: 'Status',
              items: [
                'Last updated: [add date].',
                '[Foundation → Delineation](/fundament/afbakening)',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Tijd',
    slug: 'tijd',
    descriptionNl: 'Deze sectie behandelt de temporele dimensie van Time Gap Cash Flow. Tijd is de centrale variabele in het model: het verschil in timing tussen ontvangst en verplichting bepaalt of en hoe tijdelijk beschikbare middelen inzetbaar zijn.',
    descriptionEn: 'This section addresses the temporal dimension of Time Gap Cash Flow. Time is the central variable in the model: the difference in timing between receipt and obligation determines if and how temporarily available resources can be deployed.',
    blocks: {
      nl: [
        {
          heading: 'Inhoud van deze sectie',
          items: [
            '[Ontvangst](/tijd/ontvangst) — eigenschappen van inkomende kasstromen (tijdstip, zekerheid, juridische status).',
            '[Verplichting](/tijd/verplichting) — kenmerken van de uitgaande verplichtingen (due date, fixiteit, condities).',
            '[Interval](/tijd/interval) — de tussenperiode (time gap) die de inzetruimte vormt; lengte, variabiliteit en bruikbaarheid.',
          ],
        },
        {
          heading: 'Waarom tijd centraal staat',
          body: 'Waar traditionele financiële modellen vaak focussen op waarde en rendement, staat in dit raamwerk de beschikbaarheid in tijd centraal. Eenzelfde bedrag kan onder verschillende temporele condities compleet andere beslissingen toestaan. Daarom worden hier niet alleen tijdstippen genoteerd maar ook eigenschappen zoals voorspelbaarheid, juridische vrijgave en operationele doorlooptijd.',
        },
        {
          heading: 'Schematische weergave',
          pre: 't₀ (ONT) ----[ Interval: T ]---- t₀+T (VERP)\n│                             ▲\n└─ reserve / buffer ──────────┘',
          items: [
            't₀ — moment van ontvangst (ontvangst).',
            'T — interval / time gap.',
            't₀+T — moment van verplichting (verplichting).',
          ],
        },
      ],
      en: [
        {
          heading: 'Contents of this section',
          items: [
            '[Receipt](/tijd/ontvangst) — properties of incoming cash flows (timing, certainty, legal status).',
            '[Obligation](/tijd/verplichting) — characteristics of outgoing obligations (due date, fixity, conditions).',
            '[Interval](/tijd/interval) — the interim period (time gap) that forms the deployment space; length, variability, and usability.',
          ],
        },
        {
          heading: 'Why time is central',
          body: 'Where traditional financial models often focus on value and return, this framework centers on availability in time. The same amount can allow completely different decisions under different temporal conditions. Therefore, not only timestamps are recorded here, but also properties such as predictability, legal release, and operational lead time.',
        },
        {
          heading: 'Schematic representation',
          pre: 't₀ (REC) ----[ Interval: T ]---- t₀+T (OBL)\n│                             ▲\n└─ reserve / buffer ──────────┘',
          items: [
            't₀ — moment of receipt.',
            'T — interval / time gap.',
            't₀+T — moment of obligation.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Ontvangst',
        slug: 'ontvangst',
        introNl: 'Deze pagina beschrijft de karakteristieken van inkomende kasstromen die relevant zijn voor Time Gap Cash Flow-analyses.',
        introEn: 'This page describes the characteristics of incoming cash flows relevant to Time Gap Cash Flow analyses.',
        blocks: {
          nl: [
            {
              heading: 'Kernvragen',
              items: [
                'Wanneer komt het geld beschikbaar (exacte datum of onbepaalde periode)?',
                'Is de ontvangst vrij besteedbaar of gebonden (escrow, retentie, voorwaardelijkheid)?',
                'Hoe voorspelbaar is de ontvangst (contractueel, herhalend, historisch)?',
              ],
            },
            {
              heading: 'Variabelen en attributen',
              items: [
                't₀: Datum/tijdstip ontvangst (minimaal dag-niveau)',
                'C_in: Bedrag van ontvangst (EUR)',
                'Contractstatus: Onvoorwaardelijk / voorwaardelijk / tijdelijk geblokkeerd',
                'Terugvorderingsrisico: Kans op chargeback, retour of reclamatie',
                'Voorspelbaarheid: Statistische maat (bv. CV van ontvangsttijden)',
              ],
            },
            {
              heading: 'Categorisering van ontvangsten',
              items: [
                '1. Onvoorwaardelijke ontvangst — Direct vrij besteedbaar, laag terugvorderingsrisico.',
                '2. Voorwaardelijke ontvangst — Mogelijke terugvordering (chargeback, retentie).',
                '3. Escrow of geblokkeerde ontvangst — Juridisch gebonden; niet inzetbaar totdat vrijgave plaatsvindt.',
              ],
            },
            {
              heading: 'Praktische checklist voor ontvangst',
              items: [
                't₀ is gedocumenteerd en gevalideerd.',
                'Contractuele status is gecontroleerd (vrij besteedbaar?).',
                'Historische frequentie en variantie van ontvangsttijden is bekend.',
                'Terugvorderingsrisico is kwantitatief of kwalitatief beoordeeld.',
                'Bedrag en valuta zijn expliciet vastgelegd.',
              ],
            },
          ],
          en: [
            {
              heading: 'Key questions',
              items: [
                'When does the money become available (exact date or indefinite period)?',
                'Is the receipt freely spendable or bound (escrow, retention, conditionality)?',
                'How predictable is the receipt (contractual, recurring, historical)?',
              ],
            },
            {
              heading: 'Variables and attributes',
              items: [
                't₀: Date/time of receipt (minimum day-level)',
                'C_in: Amount of receipt (EUR)',
                'Contract status: Unconditional / conditional / temporarily blocked',
                'Clawback risk: Chance of chargeback, return, or reclamation',
                'Predictability: Statistical measure (e.g., CV of receipt times)',
              ],
            },
            {
              heading: 'Categorization of receipts',
              items: [
                '1. Unconditional receipt — Directly spendable, low clawback risk.',
                '2. Conditional receipt — Possible clawback (chargeback, retention).',
                '3. Escrow or blocked receipt — Legally bound; not deployable until release.',
              ],
            },
            {
              heading: 'Practical checklist for receipt',
              items: [
                't₀ is documented and validated.',
                'Contractual status is checked (freely spendable?).',
                'Historical frequency and variance of receipt times is known.',
                'Clawback risk is quantitatively or qualitatively assessed.',
                'Amount and currency are explicitly recorded.',
              ],
            },
          ],
        },
      },
      {
        title: 'Verplichting',
        slug: 'verplichting',
        introNl: 'Deze pagina behandelt de kenmerken van de uitgaande kasverplichtingen die in Time Gap Cash Flow relevant zijn.',
        introEn: 'This page addresses the characteristics of outgoing cash obligations relevant in Time Gap Cash Flow.',
        blocks: {
          nl: [
            {
              heading: 'Kernvragen',
              items: [
                'Wanneer is de uitgaande betaling verschuldigd (exacte datum, termijn, window)?',
                'Is de verplichting vast (nominaal bedrag) of variabel (afhankelijk van prestaties)?',
                'Zijn er juridische sancties bij late betaling?',
                'Kan de verplichting worden uitgesteld of gestructureerd (heronderhandeling)?',
              ],
            },
            {
              heading: 'Variabelen en attributen',
              items: [
                'O: Verplichting (bedrag op t₀+T)',
                'Due window: Exacte datum vs. betalingswindow (bv. binnen 5 werkdagen)',
                'Fixiteit: Vast bedrag / variabel bedrag',
                'Conditie: Voorwaarde voor betaling (bv. oplevering, goedkeuring)',
                'Sancties: Kosten/boetes bij late betaling',
              ],
            },
            {
              heading: 'Typen verplichtingen',
              items: [
                '1. Contractueel vaststaande verplichting — Duidelijke due date; voorspelbaarheid hoog.',
                '2. Conditionele verplichting — Afhankelijk van triggers (acceptatie, milestone).',
                '3. Variabele verplichting — Bedrag niet volledig vaststaand (bv. volumegerelateerd).',
              ],
            },
            {
              heading: 'Praktische checklist voor verplichtingen',
              items: [
                'O is gedocumenteerd met due date (t₀+T).',
                'Eventuele variabiliteit in O is gekwantificeerd.',
                'Contractuele sancties bij vertraging zijn bekend.',
                'Mogelijkheid tot herstructurering is beoordeeld.',
              ],
            },
          ],
          en: [
            {
              heading: 'Key questions',
              items: [
                'When is the outgoing payment due (exact date, term, window)?',
                'Is the obligation fixed (nominal amount) or variable (performance-dependent)?',
                'Are there legal sanctions for late payment?',
                'Can the obligation be deferred or structured (renegotiation)?',
              ],
            },
            {
              heading: 'Variables and attributes',
              items: [
                'O: Obligation (amount at t₀+T)',
                'Due window: Exact date vs. payment window (e.g., within 5 working days)',
                'Fixity: Fixed amount / variable amount',
                'Condition: Condition for payment (e.g., delivery, approval)',
                'Sanctions: Costs/fines for late payment',
              ],
            },
            {
              heading: 'Types of obligations',
              items: [
                '1. Contractually fixed obligation — Clear due date; high predictability.',
                '2. Conditional obligation — Dependent on triggers (acceptance, milestone).',
                '3. Variable obligation — Amount not fully fixed (e.g., volume-related).',
              ],
            },
            {
              heading: 'Practical checklist for obligations',
              items: [
                'O is documented with due date (t₀+T).',
                'Any variability in O is quantified.',
                'Contractual sanctions for delay are known.',
                'Possibility of restructuring is assessed.',
              ],
            },
          ],
        },
      },
      {
        title: 'Interval',
        slug: 'interval',
        introNl: 'Deze pagina behandelt de time gap of interval T — de periode tussen ontvangst (t₀) and verplichting (t₀+T).',
        introEn: 'This page addresses the time gap or interval T — the period between receipt (t₀) and obligation (t₀+T).',
        blocks: {
          nl: [
            {
              heading: 'Kerncomponenten van het interval',
              items: [
                'Lengte (T) — absolute duur in dagen.',
                'Variabiliteit — spreiding van effectieve beschikbare tijd.',
                'Timingmarge (TM) — verschil tussen T en de realisatietijd.',
                'Operationele lead time — gemiddelde tijd die benodigde activiteiten vereisen.',
              ],
            },
            {
              heading: 'Variabelen en formules',
              pre: 'TM = T − Realisatietijd(OP)',
              items: [
                'T — interval (dagen).',
                'Realisatietijd(OP) — verwachte tijd om inzet te realiseren.',
                'TM — timingmarge; TM > 0 vereist voor veilige inzet.',
              ],
            },
            {
              heading: 'Beoordeling van bruikbaarheid',
              items: [
                'T kort (< 2 dagen) — meestal geen operationele inzet.',
                'T medium (7–30 dagen) — veel toepasbaar voor kortcyclische activiteiten.',
                'T lang (> 30 dagen) — meer ruimte maar verhoogde onzekerheid.',
              ],
            },
            {
              heading: 'Checklist voor intervalanalyse',
              items: [
                'T is eenduidig gedefinieerd en gedocumenteerd.',
                'Realisatietijd(OP) is empirisch geschat.',
                'TM is berekend en positief in de meeste gevallen (≥ 75%).',
                'Variabiliteit van T en realisatietijden is gekwantificeerd.',
              ],
            },
          ],
          en: [
            {
              heading: 'Core components of the interval',
              items: [
                'Length (T) — absolute duration in days.',
                'Variability — spread of effective available time.',
                'Timing Margin (TM) — difference between T and realization time.',
                'Operational lead time — average time required for necessary activities.',
              ],
            },
            {
              heading: 'Variables and formulas',
              pre: 'TM = T − Realization time(OP)',
              items: [
                'T — interval (days).',
                'Realization time(OP) — expected time to realize deployment.',
                'TM — timing margin; TM > 0 required for safe deployment.',
              ],
            },
            {
              heading: 'Assessing usability',
              items: [
                'T short (< 2 days) — usually no operational deployment.',
                'T medium (7–30 days) — widely applicable for short-cycle activities.',
                'T lang (> 30 days) — more space but increased uncertainty.',
              ],
            },
            {
              heading: 'Checklist for interval analysis',
              items: [
                'T is uniquely defined and documented.',
                'Realization time(OP) is empirically estimated.',
                'TM is calculated and positive in most cases (≥ 75%).',
                'Variability of T and realization times is quantified.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Geldstromen',
    slug: 'geldstromen',
    descriptionNl:
      'Deze sectie behandelt de financiële componenten van het Time Gap Cash Flow-model: welke geldstromen relevant zijn, welke rollen zij vervullen en hoe ze elkaar beïnvloeden.',
    descriptionEn:
      'This section covers the financial components of the Time Gap Cash Flow model: which cash flows are relevant, which roles they play, and how they interact.',
    blocks: {
      nl: [
        {
          heading: 'Doel',
          body:
            'Deze sectie biedt een compact overzicht van de subonderwerpen: inzet, reserve en terugbetaling. Begrip van hun eigenschappen en interacties is noodzakelijk voor correcte rekenmodellen en toetsing.',
        },
        {
          heading: 'Inhoud van deze sectie',
          items: [
            '**Inzet** — het deel van de ontvangst dat operationeel wordt ingezet binnen de time gap.',
            '**Reserve** — het deel van de ontvangst dat niet wordt ingezet en fungeert als eerste buffer.',
            '**Terugbetaling** — de uitgaande kasstroom die op het einde van de time gap voldaan moet worden.',
          ],
        },
        {
          heading: 'Kernrelaties (kort)',
          pre: 'C_in = totaal ontvangen bedrag (t₀)\nC_use = inzetbaar deel = f · C_in\nS = reserve = C_in − C_use\nR(T) = opbrengst uit C_use binnen T\nO = uitgaande verplichting op t₀+T\n\nOp moment t₀+T moet gelden:\nBeschikbaar_at_due = S + R(T) + buffer >= O',
          items: [
            '`C_use` is de motor van opbrengst binnen de time gap.',
            '`S` biedt directe bescherming tegen laat binnenkomende opbrengsten.',
            '`O` bepaalt de benodigde dekking op het moment van verplichting.',
          ],
        },
        {
          heading: 'Wanneer raadpleeg je deze pagina?',
          items: [
            'Als je wilt bepalen welk deel van ontvangsten inzetbaar is.',
            'Als je reserve- en bufferbeleid gaat beoordelen.',
            'Als je wilt begrijpen welke eisen terugbetalingstermijnen opleggen.',
          ],
        },
      ],
      en: [
        {
          heading: 'Purpose',
          body:
            'This section gives a compact overview of the subtopics: deployment, reserve, and repayment. Understanding their properties and interactions is necessary for sound calculations and checks.',
        },
        {
          heading: 'Contents of this section',
          items: [
            '**Deployment** — the part of the inflow deployed within the time gap.',
            '**Reserve** — the part of the inflow not deployed, acting as the first buffer.',
            '**Repayment** — the outgoing cash flow due at the end of the time gap.',
          ],
        },
        {
          heading: 'Key relations (short)',
          pre: 'C_in = total inflow (t₀)\nC_use = deployable part = f · C_in\nS = reserve = C_in − C_use\nR(T) = return from C_use within T\nO = outgoing obligation at t₀+T\n\nAt time t₀+T we need:\nAvailable_at_due = S + R(T) + buffer >= O',
          items: [
            '`C_use` drives return within the time gap.',
            '`S` gives direct protection against delayed returns.',
            '`O` sets the required coverage at due time.',
          ],
        },
        {
          heading: 'When to consult this page?',
          items: [
            'To decide what portion of inflows is deployable.',
            'When assessing reserve and buffer policy.',
            'To understand constraints from repayment timing.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Inzet',
        slug: 'inzet',
        introNl:
          'Deze pagina beschrijft wat onder inzet wordt verstaan, welke beperkingen en eigenschappen van invloed zijn op de inzetbaarheid van middelen, en welke operationele en juridische factoren de keuze van C_use bepalen.',
        introEn:
          'This page describes what “deployment” means, which constraints and properties affect deployability of funds, and which operational and legal factors determine the choice of C_use.',
        blocks: {
          nl: [
            {
              heading: 'Definitie',
              pre: 'C_use = f · C_in\n0 < f ≤ 1',
              body:
                'Inzet is het deel van de binnenkomende kasstroom dat effectief wordt toegepast in activiteiten of instrumenten tijdens de tussenperiode.',
            },
            {
              heading: 'Relevante attributen',
              items: [
                'Fractie (f) — percentage van C_in dat vrij inzetbaar is.',
                'Liquiditeitsvrijheid — juridische en contractuele ruimte om het geld te gebruiken.',
                'Snelheid van inzet — hoe snel middelen efficiënt kunnen worden gealloceerd.',
                'Opschalingskosten — transactiekosten of marginale kosten verbonden aan inzet.',
              ],
            },
            {
              heading: 'Operationele en juridische restricties',
              items: [
                'Contractclausules kunnen inzet beperken (escrow, retentie).',
                'Bank- of betaalvoorwaarden (verwerkingstijd, valuta) beïnvloeden effectieve inzetbaarheid.',
                'Interne goedkeuringsprocessen (bijv. manual sign-offs) vergroten doorlooptijd en verlagen f.',
              ],
            },
            {
              heading: 'Toetsingschecklist voor inzet',
              items: [
                '[ ] Is f expliciet gedocumenteerd en gecontroleerd?',
                '[ ] Zijn juridische beperkingen op C_in geverifieerd?',
                '[ ] Zijn transactiekosten en uitvoeringskosten gekwantificeerd (K_op)?',
                '[ ] Is een operationeel proces beschikbaar om inzet binnen T te realiseren?',
                '[ ] Is er een fallback-procedure als inzet niet het verwachte resultaat oplevert?',
              ],
            },
            {
              heading: 'Voorbeeld (kort)',
              items: [
                'Case: C_in = €100.000; contract laat 80% gebruik toe → f = 0,8 → C_use = €80.000.',
                'Opmerking: indien bankprocessing 3 werkdagen duurt, reduceert dat effectief de inzetbare tijd binnen T.',
              ],
            },
            {
              heading: 'Notities voor modellering',
              items: [
                'Modelleer f als variabele met distributie in simulaties indien onzeker.',
                'Houd onderscheid tussen bruto inzet en netto inzet (na fees).',
                'Documenteer alle aannames rond juridische vrijgave en verwerkingstijd.',
              ],
            },
          ],
          en: [
            {
              heading: 'Definition',
              pre: 'C_use = f · C_in\n0 < f ≤ 1',
              body:
                'Deployment is the part of the incoming cash flow effectively applied in activities or instruments during the interim period.',
            },
            {
              heading: 'Relevant attributes',
              items: [
                'Fraction (f) — percentage of C_in that is freely deployable.',
                'Liquidity freedom — legal/contractual room to use the funds.',
                'Speed of deployment — how quickly funds can be allocated efficiently.',
                'Scaling costs — transaction or marginal costs tied to deployment.',
              ],
            },
            {
              heading: 'Operational and legal constraints',
              items: [
                'Contract clauses may limit deployment (escrow, retention).',
                'Bank/payment conditions (processing time, currency) affect effective deployability.',
                'Internal approvals (manual sign-offs) increase lead time and reduce f.',
              ],
            },
            {
              heading: 'Deployment checklist',
              items: [
                '[ ] Is f explicitly documented and checked?',
                '[ ] Are legal restrictions on C_in verified?',
                '[ ] Are transaction/execution costs quantified (K_op)?',
                '[ ] Is an operational process available to deploy within T?',
                '[ ] Is there a fallback if deployment underperforms?',
              ],
            },
            {
              heading: 'Example (short)',
              items: [
                'Case: C_in = €100,000; contract allows 80% use → f = 0.8 → C_use = €80,000.',
                'Note: if bank processing takes 3 business days, effective deployable time within T shrinks.',
              ],
            },
            {
              heading: 'Notes for modelling',
              items: [
                'Model f as a variable with distribution in simulations if uncertain.',
                'Distinguish between gross and net deployment (after fees).',
                'Document assumptions about legal release and processing time.',
              ],
            },
          ],
        },
      },
      {
        title: 'Reserve',
        slug: 'reserve',
        introNl:
          'De reserve is het niet-ingezette deel van de ontvangst en vormt de eerste verdedigingslinie tegen timingproblemen.',
        introEn:
          'Reserve is the non-deployed portion of the inflow and serves as the first line of defense against timing issues.',
        blocks: {
          nl: [
            {
              heading: 'Definitie',
              pre: 'S = C_in − C_use',
              body:
                'S is het bedrag dat direct beschikbaar blijft en niet in operationele inzet wordt gestopt. Reserve vangt korte-termijn mismatches op zonder externe financiering.',
            },
            {
              heading: 'Functies van reserve',
              items: [
                'Directe dekking van verplichtingen als opbrengst vertraagt.',
                'Vermindering van afhankelijkheid van externe buffers of noodkredieten.',
                'Tijdelijke liquiditeitsveiligheid tijdens onvoorziene operationele issues.',
              ],
            },
            {
              heading: 'Richtlijnen voor omvang',
              items: [
                'Percentage van O (verplichting) — bv. 10–30% in conservatieve gevallen.',
                'Bedrag gelijk aan worst-case vertraging (verwachte gemiste opbrengst).',
                'Praktisch: bereken B_min = O − S voor volledige zekerheid indien opbrengst uitblijft; S kan hieraan bijdragen.',
              ],
            },
            {
              heading: 'Toetsingschecklist voor reserve',
              items: [
                '[ ] Is S expliciet berekend en gedocumenteerd voor elke cycle?',
                '[ ] Wordt S juridisch en operationeel als direct beschikbaar aangemerkt?',
                '[ ] Is er beleid voor heropbouw van reserve na gebruik?',
                '[ ] Is de relatie tussen reserve en externe buffer(s) vastgelegd?',
              ],
            },
            {
              heading: 'Voorbeeld (kort)',
              items: [
                'C_in = €100.000, C_use = €70.000 → S = €30.000.',
                'Verplichting O = €95.000. Als opbrengst vertraagt, draagt S bij aan dekking; extra buffer nodig indien S + buffer < O.',
              ],
            },
            {
              heading: 'Notities',
              items: [
                'Reserve is een eerste-lijnmaatregel; bufferbeleid complementeert reserve.',
                'Rapportages: toon bruto S en “effectieve” S na geplande verplichtingen of retenties.',
              ],
            },
          ],
          en: [
            {
              heading: 'Definition',
              pre: 'S = C_in − C_use',
              body:
                'S is the amount kept directly available and not deployed operationally. It absorbs short-term mismatches without external financing.',
            },
            {
              heading: 'Functions of reserve',
              items: [
                'Direct coverage of obligations when returns are delayed.',
                'Reduced reliance on external buffers or emergency credit.',
                'Temporary liquidity safety during unforeseen operational issues.',
              ],
            },
            {
              heading: 'Sizing guidelines',
              items: [
                'Percentage of O (obligation) — e.g., 10–30% in conservative cases.',
                'Amount equal to worst-case delay (expected missed return).',
                'Practical: compute B_min = O − S for full certainty if returns fail; S contributes to this.',
              ],
            },
            {
              heading: 'Reserve checklist',
              items: [
                '[ ] Is S explicitly calculated and documented per cycle?',
                '[ ] Is S legally and operationally deemed immediately available?',
                '[ ] Is there a policy to rebuild reserve after use?',
                '[ ] Is the relationship between reserve and external buffers defined?',
              ],
            },
            {
              heading: 'Example (short)',
              items: [
                'C_in = €100,000, C_use = €70,000 → S = €30,000.',
                'Obligation O = €95,000. If returns lag, S aids coverage; extra buffer required if S + buffer < O.',
              ],
            },
            {
              heading: 'Notes',
              items: [
                'Reserve is first-line; buffer policy complements it.',
                'Reporting: show gross S and “effective” S after planned obligations or retentions.',
              ],
            },
          ],
        },
      },
      {
        title: 'Terugbetaling',
        slug: 'terugbetaling',
        introNl:
          'Deze pagina behandelt de uitgaande kasstroom (verplichting) die op het einde van het time gap moet worden voldaan: eigenschappen, timingcondities en implicaties voor ontwerp en toetsing.',
        introEn:
          'This page covers the outgoing cash flow (obligation) due at the end of the time gap: properties, timing conditions, and implications for design and validation.',
        blocks: {
          nl: [
            {
              heading: 'Definitie',
              pre: 'O = bedrag verschuldigd op t₀ + T',
              body:
                'O kan een vaste betaling zijn, een variabele afrekening of een conditionele claim.',
            },
            {
              heading: 'Eigenschappen en attribuutlijst',
              items: [
                'O — nominaal bedrag (EUR).',
                't_due — exacte due date of betalingswindow.',
                'fixiteit — vast / variabel.',
                'condities — voorwaarden (bv. oplevering, acceptatie).',
                'sancties — boetes of extra kosten bij late betaling.',
              ],
            },
            {
              heading: 'Gevolgen voor modelontwerp',
              items: [
                'Vaste verplichtingen vergemakkelijken planning en reduceren scenariocomplexiteit.',
                'Variabele of conditionele verplichtingen vereisen scenario-analyse en extra buffers.',
                'Sancties bij late betaling verhogen de kost van faalgevallen en moeten als kostenpost in modellen (K_op) worden opgenomen.',
              ],
            },
            {
              heading: 'Toetsingschecklist voor terugbetaling',
              items: [
                '[ ] Is O duidelijk gedocumenteerd met datum of window?',
                '[ ] Zijn variaties of condities gekwantificeerd?',
                '[ ] Zijn sancties en incassokosten meegenomen in kostenbegroting?',
                '[ ] Bestaat er mogelijkheid tot uitstel of heronderhandeling en is deze beoordeeld?',
              ],
            },
            {
              heading: 'Voorbeeld (kort)',
              items: [
                'Vast: leverancierfactuur €50.000 met 30 dagen netto — O=€50.000, t_due=t₀+30.',
                'Variabel: prestatiebonus afhankelijk van KPI; O heeft kansdistributie.',
              ],
            },
            {
              heading: 'Notities voor implementatie',
              items: [
                'Sla O en t_due structureel op in datasets voor simulaties en stresstesten.',
                'Houd administratieve latencies (boekingsdatum vs. valutadatum) apart; ze verschuiven het effectieve dekkingsmoment.',
              ],
            },
          ],
          en: [
            {
              heading: 'Definition',
              pre: 'O = amount due at t₀ + T',
              body:
                'O may be a fixed payment, variable settlement, or conditional claim.',
            },
            {
              heading: 'Attributes',
              items: [
                'O — nominal amount (EUR).',
                't_due — exact due date or payment window.',
                'fixity — fixed / variable.',
                'conditions — triggers (e.g., delivery, acceptance).',
                'sanctions — penalties or extra costs for late payment.',
              ],
            },
            {
              heading: 'Implications for model design',
              items: [
                'Fixed obligations ease planning and reduce scenario complexity.',
                'Variable/conditional obligations need scenario analysis and extra buffers.',
                'Sanctions for late payment raise failure costs and must be in K_op.',
              ],
            },
            {
              heading: 'Repayment checklist',
              items: [
                '[ ] Is O clearly documented with date or window?',
                '[ ] Are variations or conditions quantified?',
                '[ ] Are penalties/collection costs included in budgets?',
                '[ ] Is deferral or renegotiation possibility assessed?',
              ],
            },
            {
              heading: 'Example (short)',
              items: [
                'Fixed: supplier invoice €50,000 with 30 days net — O=€50,000, t_due=t₀+30.',
                'Variable: performance bonus with KPI-linked distribution for O.',
              ],
            },
            {
              heading: 'Implementation notes',
              items: [
                'Store O and t_due structurally in datasets for simulations and stress tests.',
                'Track administrative latencies (booking vs. value date) separately; they shift effective coverage timing.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Berekening',
    slug: 'berekening',
    descriptionNl:
      'Deze sectie beschrijft de rekenkundige methodiek voor Time Gap Cash Flow: grootheden, volgorde van berekeningen en welke parameters constant zijn.',
    descriptionEn:
      'This section describes the computational method for Time Gap Cash Flow: quantities, calculation order, and which parameters are treated as constants.',
    blocks: {
      nl: [
        {
          heading: 'Inhoud van deze sectie',
          items: [
            '**Variabelen** — lijst van alle gebruikte symbolen en hun betekenis.',
            '**Volgorde** — stap-voor-stap procedure voor het uitvoeren van een cycle-berekening.',
            '**Constanten** — aannames en parameters die per analyse vastliggen.',
          ],
        },
        {
          heading: 'Kernformules (conceptueel)',
          pre: 'Π = R(T) − C_use − K_op\nROC = Π / C_use\nROC_dag ≈ ROC / T\nAnnualized = (1+ROC)^(365/T) − 1\nT_break-even = K_op / (C_use · r_d)',
          items: [
            'Annualisatie veronderstelt herhaalbare, identieke cycli.',
            'Gebruik consistente tijdseenheid (dagen) en tijdzone voor alle timestamps.',
            'R(T) is niet altijd lineair; gebruik scenario’s of empirische data indien beschikbaar.',
          ],
        },
      ],
      en: [
        {
          heading: 'Contents of this section',
          items: [
            '**Variables** — list of all symbols and meanings.',
            '**Sequence** — step-by-step procedure for a cycle calculation.',
            '**Constants** — assumptions and parameters fixed per analysis.',
          ],
        },
        {
          heading: 'Key formulas (conceptual)',
          pre: 'Π = R(T) − C_use − K_op\nROC = Π / C_use\nROC_day ≈ ROC / T\nAnnualized = (1+ROC)^(365/T) − 1\nT_break-even = K_op / (C_use · r_d)',
          items: [
            'Annualization assumes repeatable, identical cycles.',
            'Use consistent time unit (days) and timezone for all timestamps.',
            'R(T) is often non-linear; use scenarios or empirical data when available.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Variabelen',
        slug: 'variabelen',
        introNl:
          'Eenduidige lijst van alle variabelen die in berekeningen terugkomen, inclusief datatype, toelichting en voorbeeldwaarden.',
        introEn:
          'Unambiguous list of all variables used in calculations, including data type, explanation, and example values.',
        blocks: {
          nl: [
            {
              heading: 'Tabel met variabelen',
              items: [
                '`C_in` — brutobedrag op t₀ (EUR).',
                '`f` — fractie inzetbaar; 0 < f ≤ 1 (bijv. 0,8).',
                '`C_use` — ingezet kapitaal; C_use = f · C_in.',
                '`S` — reserve; S = C_in − C_use.',
                '`T` — time gap in dagen (t₀ → t₀+T).',
                '`O` — uitgaande verplichting op t₀+T.',
                '`R(T)` — bruto opbrengst van inzet binnen T.',
                '`K_op` — operationele kosten verbonden aan inzet.',
                '`Π` — netto-opbrengst; Π = R(T) − C_use − K_op.',
                '`ROC` — rendement per cycle; ROC = Π / C_use.',
                '`r_d` — dagrendement; r_d ≈ ROC / T.',
                '`TM` — timingmarge; TM = T − realisatietijd(OP).',
              ],
            },
            {
              heading: 'Aanvullende opmerkingen',
              items: [
                'C_in: noteer brutobedrag, valuta en transactiedatum (bank vs. boeking).',
                'f: contractueel of empirisch; modelleer als distributie indien onzeker.',
                'R(T): kan meerdere componenten hebben; modelleer apart indien relevant.',
                'K_op: neem fees/overhead/sancties bij vertraging mee.',
              ],
            },
            {
              heading: 'Datatypen en opslag',
              items: [
                'Gebruik ISO 8601 voor datums/tijden.',
                'Bedragen als decimaal met twee decimalen; voorkom float-afrondingsfouten.',
                'Documenteer bron en versieer aannames.',
              ],
            },
          ],
          en: [
            {
              heading: 'Variable table',
              body:
                '| Symbol | Name | Description | Type / example |\\n|---:|---|---|---|\\n| `C_in` | Incoming cash flow | Gross amount received at t₀ | EUR (100000) |\\n| `f` | Deployable fraction | Part of `C_in` legally/operationally deployable | 0 < f ≤ 1 (0.8) |\\n| `C_use` | Deployed capital | `C_use = f · C_in` | EUR (80000) |\\n| `S` | Reserve | `S = C_in − C_use` | EUR (20000) |\\n| `T` | Time gap / interval | Days between receipt and obligation | integer (30) |\\n| `O` | Outgoing obligation | Amount due at t₀+T | EUR (100000) |\\n| `R(T)` | Gross return | Gross result from deployment within T | EUR (e.g., 82400) |\\n| `K_op` | Operating costs | Direct costs tied to deployment | EUR (400) |\\n| `Π` | Net result | `Π = R(T) − C_use − K_op` | EUR (2000) |\\n| `ROC` | Return per cycle | `ROC = Π / C_use` | decimal (0.025) |\\n| `r_d` | Daily return | `r_d ≈ ROC / T` | decimal (0.00083) |\\n| `TM` | Timing margin | `TM = T − realization_time(OP)` | days (5) |',
            },
            {
              heading: 'Additional notes',
              items: [
                'C_in: store gross amount, currency, and transaction date (bank vs. booking).',
                'f: contractual or empirical; model as distribution if uncertain.',
                'R(T): may have multiple components; model separately when relevant.',
                'K_op: include fees/overhead/penalties for delay.',
              ],
            },
            {
              heading: 'Data types and storage',
              items: [
                'Use ISO 8601 for date/times.',
                'Store amounts as decimals with two places; avoid float rounding issues.',
                'Document source and version assumptions.',
              ],
            },
          ],
        },
      },
      {
        title: 'Volgorde',
        slug: 'volgorde',
        introNl:
          'Reproduceerbare volgorde van rekenstappen voor een Time Gap Cash Flow-cycle.',
        introEn:
          'Reproducible calculation sequence for a Time Gap Cash Flow cycle.',
        blocks: {
          nl: [
            {
              heading: 'Aanpak (stap-voor-stap)',
              items: [
                'Verifieer data (C_in, t₀, O, t₀+T, contractstatus); valideer t₀ < t₀+T.',
                'Bepaal f (contractueel of empirisch) en documenteer bron.',
                'Bereken C_use = f · C_in en S = C_in − C_use.',
                'Schat R(T) (deterministisch of scenario); indien r_d: R(T) = C_use · (1 + r_d · T).',
                'Neem K_op en eventuele sancties op.',
                'Bereken Π = R(T) − C_use − K_op.',
                'Evalueer Beschikbaar_at_due = S + R(T) + buffer vs. O.',
                'Rapporteer KPI’s: Π, ROC, ROC_dag ≈ ROC/T, TM = T − realisatietijd(OP), faalkans/scenario’s.',
                'Documenteer en archiveer aannames + input.',
              ],
            },
            {
              heading: 'Spreadsheet-check',
              body:
                'Kolommen: A C_in | B f | C C_use=A*B | D S=A-C | E r_c/r_d | F R=C*(1+r_c) | G K_op | H Π=F-C-G | I Beschikbaar_at_due=D+F+buffer | J Tekort=MAX(0, O−I)',
            },
            {
              heading: 'Notities en valkuilen',
              items: [
                'Volgorde niet omkeren: bepaal C_use en S vóór rendement en kosten.',
                'Check verwerkingstijden (bankprocessing) voor effectieve inzetduur binnen T.',
                'Bij conditionele O of variabele R(T): gebruik scenario/stochastische runs in stap 4 en 7.',
              ],
            },
          ],
          en: [
            {
              heading: 'Step-by-step',
              items: [
                'Verify data (C_in, t₀, O, t₀+T, contract status); ensure t₀ < t₀+T.',
                'Determine f (contractual or empirical) and document source.',
                'Compute C_use = f · C_in and S = C_in − C_use.',
                'Estimate R(T) (deterministic or scenario); if r_d: R(T) = C_use · (1 + r_d · T).',
                'Include K_op and any penalties.',
                'Compute Π = R(T) − C_use − K_op.',
                'Evaluate Available_at_due = S + R(T) + buffer vs. O.',
                'Report KPIs: Π, ROC, ROC_day ≈ ROC/T, TM = T − realization_time(OP), failure/scenario outcomes.',
                'Document and archive assumptions + inputs.',
              ],
            },
            {
              heading: 'Spreadsheet check',
              body:
                'Cols: A C_in | B f | C C_use=A*B | D S=A−C | E r_c/r_d | F R=C*(1+r_c) | G K_op | H Π=F−C−G | I Available_at_due=D+F+buffer | J Shortfall=MAX(0, O−I)',
            },
            {
              heading: 'Notes/pitfalls',
              items: [
                'Do not reverse order: derive C_use and S before returns/costs.',
                'Validate processing times before effective deployment duration in T.',
                'Conditional O or variable R(T): use scenarios/stochastic runs in steps 4 and 7.',
              ],
            },
          ],
        },
      },
      {
        title: 'Constanten',
        slug: 'constanten',
        introNl:
          'Vaste parameters en beleidskeuzes die binnen een analyse als constant worden behandeld.',
        introEn:
          'Fixed parameters and policy choices treated as constants within an analysis.',
        blocks: {
          nl: [
            {
              heading: 'Typische constanten',
              items: [
                '`time_unit` — tijdseenheid voor alle berekeningen (bv. dagen).',
                '`rounding` — afrondingsregel voor valuta (bv. 2 decimalen, bankers rounding).',
                '`currency` — valuta van analyse (bv. EUR).',
                '`buffer_policy` — regels voor externe buffer (percent of absolute), bv. buffer = max(0.05*O, 5000 EUR).',
                '`min_data_points` — minimale N voor variantieschatting (bv. 30).',
                '`confidence_level` — niveau voor betrouwbaarheidsintervallen (bv. 95%).',
                '`processing_days` — bank/boekingslatency die inzet beïnvloedt (bv. 2).',
                '`max_f` — maximale toegestane fractie inzetbaar (bv. 0.90).',
              ],
            },
            {
              heading: 'Gebruik van constanten',
              items: [
                'Leg constants vast in config (JSON/YAML) en README.',
                'Versiebeheer: wijzig via changelog (wie, wat, waarom, datum).',
                'Documenteer rationale per constante.',
              ],
            },
            {
              heading: 'Aanbevolen defaults',
              items: [
                'time_unit = \"dagen\"',
                'rounding = 2 (centen)',
                'currency = \"EUR\"',
                'buffer_policy = \"buffer = max(0.05*O, 5000)\"',
                'min_data_points = 30',
                'confidence_level = 0.95',
                'processing_days = 2',
                'max_f = 0.90',
              ],
            },
            {
              heading: 'Validatie van constants',
              items: [
                'Check per run dat constants overeenkomen met projectversie.',
                'Wijziging? Doe regressietests en update documentatie.',
              ],
            },
          ],
          en: [
            {
              heading: 'Typical constants',
              items: [
                '`time_unit` — time unit for all calculations (e.g., days).',
                '`rounding` — rounding rule for currency (e.g., 2 decimals, bankers rounding).',
                '`currency` — analysis currency (e.g., EUR).',
                '`buffer_policy` — external buffer rules (percent or absolute), e.g., buffer = max(0.05*O, 5000 EUR).',
                '`min_data_points` — minimum N for variance estimation (e.g., 30).',
                '`confidence_level` — for confidence intervals (e.g., 95%).',
                '`processing_days` — bank/booking latency affecting deployment (e.g., 2).',
                '`max_f` — max deployable fraction (e.g., 0.90).',
              ],
            },
            {
              heading: 'Using constants',
              items: [
                'Store constants in config (JSON/YAML) and README.',
                'Version changes via changelog (who/what/why/date).',
                'Document rationale for each constant.',
              ],
            },
            {
              heading: 'Recommended defaults',
              items: [
                'time_unit = \"days\"',
                'rounding = 2',
                'currency = \"EUR\"',
                'buffer_policy = \"buffer = max(0.05*O, 5000)\"',
                'min_data_points = 30',
                'confidence_level = 0.95',
                'processing_days = 2',
                'max_f = 0.90',
              ],
            },
            {
              heading: 'Validation',
              items: [
                'Check constants per run align with project version.',
                'If constants change: run regression tests and update docs.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Voorbeelden',
    slug: 'voorbeelden',
    descriptionNl:
      'Illustratieve voorbeelden om de interne logica van Time Gap Cash Flow te tonen; bewust eenvoudig en niet normatief.',
    descriptionEn:
      'Illustrative examples to show the internal logic of Time Gap Cash Flow; deliberately simple and non-normative.',
    blocks: {
      nl: [
        {
          heading: 'Opbouw van de voorbeelden',
          items: [
            '**Enkelvoudig** — één geïsoleerde cyclus met één ontvangst en één verplichting.',
            '**Herhaald** — meerdere opeenvolgende cycli met identieke structuur.',
            '**Cumulatief** — meerdere cycli waarbij effecten zich opstapelen over tijd.',
          ],
        },
        {
          heading: 'Methodologische uitgangspunten',
          items: [
            'Alle bedragen zijn fictief en afgerond.',
            'Tijd in discrete dagen; geen externe markteffecten.',
            'Kosten, opbrengsten en timing zijn deterministisch tenzij anders vermeld.',
            'Variaties/onzekerheden behandeld in Modellering.',
          ],
        },
        {
          heading: 'Leeswijzer',
          items: [
            'Begin bij Enkelvoudig en volg de volgorde voor opbouwende complexiteit.',
            'Zie Berekening voor rekenstappen; zie Risico voor niet-representatieve situaties.',
          ],
        },
      ],
      en: [
        {
          heading: 'Structure of examples',
          items: [
            '**Single** — one isolated cycle with one receipt and one obligation.',
            '**Repeated** — multiple consecutive cycles with identical structure.',
            '**Cumulative** — multiple cycles with effects compounding over time.',
          ],
        },
        {
          heading: 'Methodological assumptions',
          items: [
            'All amounts are fictional and rounded.',
            'Time in discrete days; no external market effects.',
            'Costs, returns, and timing are deterministic unless stated otherwise.',
            'Variations/uncertainty handled in Modelling.',
          ],
        },
        {
          heading: 'Reading guide',
          items: [
            'Start with Single and follow order for increasing complexity.',
            'See Calculation for steps; see Risk for non-representative situations.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Enkelvoudig',
        slug: 'enkelvoudig',
        introNl:
          'Een enkele Time Gap Cash Flow-cyclus met één ontvangst, een tijdelijke inzet van middelen en één latere verplichting.',
        introEn:
          'A single Time Gap Cash Flow cycle with one receipt, temporary deployment of funds, and one later obligation.',
        blocks: {
          nl: [
            {
              heading: 'Gegeven',
              items: [
                'C_in = 100.000; f = 0,8; C_use = 80.000; S = 20.000.',
                'T = 30 dagen; R(T) = 82.400; K_op = 400; O = 100.000.',
              ],
            },
            {
              heading: 'Berekening',
              items: [
                'Π = R(T) − C_use − K_op = 2.000.',
                'Beschikbaar bij verplichting: S + R(T) = 102.400; na O resteert 2.400.',
              ],
            },
            {
              heading: 'Observatie',
              items: [
                'Verplichting voldaan zonder extra financiering; reserve fungeert als buffer.',
                'Netto-opbrengst puur door tijdsverschil tussen ontvangst en verplichting.',
              ],
            },
            {
              heading: 'Interpretatie',
              body:
                'Minimale structuur, geen interactie tussen cycli; resultaat herleidbaar tot één interval.',
            },
          ],
          en: [
            {
              heading: 'Given',
              items: [
                'C_in = 100,000; f = 0.8; C_use = 80,000; S = 20,000.',
                'T = 30 days; R(T) = 82,400; K_op = 400; O = 100,000.',
              ],
            },
            {
              heading: 'Calculation',
              items: [
                'Π = R(T) − C_use − K_op = 2,000.',
                'Available at due: S + R(T) = 102,400; after O remains 2,400.',
              ],
            },
            {
              heading: 'Observation',
              items: [
                'Obligation fully covered without extra financing; reserve is buffer.',
                'Net result arises from timing gap between receipt and obligation.',
              ],
            },
            {
              heading: 'Interpretation',
              body:
                'Minimal structure, no inter-cycle interaction; outcome tied to one interval.',
            },
          ],
        },
      },
      {
        title: 'Herhaald',
        slug: 'herhaald',
        introNl:
          'Een reeks identieke TGC-cycli die elkaar opvolgen; elke cyclus wordt afgerond voordat de volgende start.',
        introEn:
          'A series of identical TGC cycles executed sequentially; each cycle completes before the next begins.',
        blocks: {
          nl: [
            {
              heading: 'Gegeven',
              items: [
                'Zelfde parameters als Enkelvoudig; geen herbelegging binnen cyclus.',
                'n = 5 cycli; Π per cyclus = 2.000.',
              ],
            },
            {
              heading: 'Resultaat',
              items: [
                'Π_totaal = n · Π = 10.000.',
                'T_totaal = 5 · 30 = 150 dagen.',
              ],
            },
            {
              heading: 'Observatie',
              items: [
                'Cycli onafhankelijk; fouten in één cyclus beïnvloeden de volgende niet structureel.',
                'Opbrengst groeit lineair met aantal cycli.',
              ],
            },
            {
              heading: 'Interpretatie',
              body:
                'Herhaling introduceert geen extra complexiteit zolang cycli strikt gescheiden blijven; model blijft additief en voorspelbaar.',
            },
          ],
          en: [
            {
              heading: 'Given',
              items: [
                'Same parameters as Single; no reinvestment within cycle.',
                'n = 5 cycles; Π per cycle = 2,000.',
              ],
            },
            {
              heading: 'Result',
              items: [
                'Π_total = n · Π = 10,000.',
                'T_total = 5 · 30 = 150 days.',
              ],
            },
            {
              heading: 'Observation',
              items: [
                'Cycles independent; errors in one do not structurally affect the next.',
                'Return grows linearly with number of cycles.',
              ],
            },
            {
              heading: 'Interpretation',
              body:
                'Repetition adds no extra complexity when cycles stay separate; model remains additive and predictable.',
            },
          ],
        },
      },
      {
        title: 'Cumulatief',
        slug: 'cumulatief',
        introNl:
          'Meerdere TGC-cycli waarbij netto-opbrengsten beschikbaar blijven en de totale middelen beïnvloeden.',
        introEn:
          'Multiple TGC cycles where net results remain available and affect total funds.',
        blocks: {
          nl: [
            {
              heading: 'Gegeven',
              items: [
                'Startparameters gelijk aan Enkelvoudig; f constant; verplichtingen gelijk.',
                'Netto-opbrengsten worden niet onttrokken maar blijven beschikbaar.',
              ],
            },
            {
              heading: 'Cumulatief effect',
              items: [
                'Cyclus 1: 2.400 buffer na afwikkeling.',
                'Cyclus 2: 4.800 buffer na afwikkeling.',
                'Cyclus 3: 7.200 buffer na afwikkeling.',
                'Cyclus 4: 9.600 buffer na afwikkeling.',
                'Cyclus 5: 12.000 buffer na afwikkeling.',
              ],
            },
            {
              heading: 'Observatie',
              items: [
                'Reserve groeit zonder extra externe instroom.',
                'Kans op liquiditeitsproblemen daalt naarmate meer cycli slagen.',
                'Pad-afhankelijkheid: vroege uitkomsten beïnvloeden latere robuustheid.',
              ],
            },
            {
              heading: 'Interpretatie',
              body:
                'Cumulatie introduceert tijdsafhankelijke versterking; gevoelig voor aannames, maar robuuster tegen incidentele verstoringen. Negatieve afwijkingen kunnen zich ook opstapelen.',
            },
          ],
          en: [
            {
              heading: 'Given',
              items: [
                'Start parameters as Single; f constant; obligations equal.',
                'Net results are retained and remain available.',
              ],
            },
            {
              heading: 'Cumulative effect',
              items: [
                'Cycle 1: 2,400 buffer after settlement.',
                'Cycle 2: 4,800 buffer after settlement.',
                'Cycle 3: 7,200 buffer after settlement.',
                'Cycle 4: 9,600 buffer after settlement.',
                'Cycle 5: 12,000 buffer after settlement.',
              ],
            },
            {
              heading: 'Observation',
              items: [
                'Reserve grows without additional external inflow.',
                'Liquidity risk decreases as more cycles succeed.',
                'Path dependency: early outcomes affect later robustness.',
              ],
            },
            {
              heading: 'Interpretation',
              body:
                'Cumulative behaviour introduces time-dependent reinforcement; more sensitive to assumptions, but more resilient to incidental shocks. Negative deviations can also stack up.',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Beperkingen',
    slug: 'beperkingen',
    descriptionNl:
      'Structurele beperkingen van het TGC-model; inherent aan de aannames die nodig zijn voor hanteerbaarheid.',
    descriptionEn:
      'Structural limitations of the TGC model; inherent to the assumptions needed for tractability.',
    blocks: {
      nl: [
        {
          heading: 'Typologie van beperkingen',
          items: [
            '**Timing** — afhankelijkheid van exacte tijdstippen en intervallen.',
            '**Liquiditeit** — beperkingen in daadwerkelijke beschikbaarheid van middelen.',
            '**Uitvoering** — afwijkingen tussen modelveronderstellingen en feitelijke handelingen.',
          ],
        },
        {
          heading: 'Relatie tot andere secties',
          items: [
            'Voorbeelden veronderstellen ideaal; hier staat waar die aannames kunnen falen.',
            'Risico analyseert kans/impact; beperkingen beschrijven de structurele oorsprong.',
            'Modellering kan kwantificeren, niet opheffen.',
          ],
        },
        {
          heading: 'Afbakening',
          items: [
            'Geen oplossingen of optimalisaties; uitsluitend geldigheid en interpretatie.',
            'Zie Interpretatie → Grenzen voor consequenties.',
          ],
        },
      ],
      en: [
        {
          heading: 'Typology of limitations',
          items: [
            '**Timing** — dependence on exact timestamps/intervals.',
            '**Liquidity** — constraints on actual availability of funds.',
            '**Execution** — gaps between assumptions and real actions.',
          ],
        },
        {
          heading: 'Relation to other sections',
          items: [
            'Examples assume ideal conditions; here is where those can fail.',
            'Risk covers likelihood/impact; limitations describe structural origin.',
            'Modelling may quantify but not remove them.',
          ],
        },
        {
          heading: 'Scope',
          items: [
            'No solutions or optimizations; only validity and interpretation.',
            'See Interpretation → Limits for consequences.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Timing',
        slug: 'timing',
        introNl:
          'Het model veronderstelt exact bekende en stabiele tijdsintervallen; afwijkingen hierin zijn structurele beperkingen.',
        introEn:
          'The model assumes exact, stable time intervals; deviations are structural limitations.',
        blocks: {
          nl: [
            {
              heading: 'Bron van beperking',
              items: [
                'Vertraagde ontvangst van middelen.',
                'Vervroegde verplichtingen.',
                'Onvoorziene verlenging van intervallen.',
                'Overlappende/niet-lineaire tijdsstructuren.',
              ],
            },
            {
              heading: 'Gevolgen',
              items: [
                'Tijdelijke liquiditeitstekorten.',
                'Onjuiste inschatting van reserves.',
                'Vertekende cumulatieve effecten.',
                'Niet-lineaire impact bij herhaalde cycli.',
              ],
            },
            {
              heading: 'Structureel karakter',
              body:
                'Zodra tijdstippen onzeker worden, verliest het model zijn deterministische karakter en vraagt het om probabilistische uitbreiding.',
            },
            {
              heading: 'Zie ook',
              items: ['[Modellering → Simulatie (timingvariatie)](/modellering/simulatie).'],
            },
          ],
          en: [
            {
              heading: 'Source of limitation',
              items: [
                'Delayed receipts.',
                'Earlier obligations.',
                'Unexpected extension of intervals.',
                'Overlapping/non-linear time structures.',
              ],
            },
            {
              heading: 'Effects',
              items: [
                'Temporary liquidity shortfalls.',
                'Misestimated reserves.',
                'Distorted cumulative effects.',
                'Non-linear impact across repeated cycles.',
              ],
            },
            {
              heading: 'Structural nature',
              body:
                'Once timing is uncertain, the model ceases to be deterministic and needs probabilistic extensions.',
            },
            {
              heading: 'See also',
              items: ['[Modelling → Simulation (timing variation)](/modellering/simulatie).'],
            },
          ],
        },
      },
      {
        title: 'Liquiditeit',
        slug: 'liquiditeit',
        introNl:
          'Liquiditeit wordt binaire beschikbaarheid verondersteld, terwijl middelen vaak gedeeltelijk, vertraagd of conditioneel beschikbaar zijn.',
        introEn:
          'Liquidity is treated as binary availability, while funds are often partial, delayed, or conditional.',
        blocks: {
          nl: [
            {
              heading: 'Modelaanname',
              items: [
                'Directe inzetbaarheid van ontvangen middelen.',
                'Volledige beschikbaarheid van reserves.',
                'Geen externe restricties op gebruik of verplaatsing.',
              ],
            },
            {
              heading: 'Praktische afwijkingen',
              items: [
                'Vaststaan in rekeningen/systemen.',
                'Onderhevig aan goedkeuringen.',
                'Tijdelijk niet verhandelbaar.',
                'Functioneel geblokkeerd ondanks boekhouding.',
              ],
            },
            {
              heading: 'Gevolgen',
              items: [
                'Discrepantie tussen berekende en feitelijke beschikbaarheid.',
                'Rekenkundig correct maar operationeel onuitvoerbaar.',
                'Bufferfunctie van reserves wordt overschat.',
              ],
            },
            {
              heading: 'Afbakening',
              body:
                'TGC beschrijft geldstromen, geen liquiditeitsmanagement; onderscheid bezit/beschikbaarheid valt buiten scope.',
            },
            {
              heading: 'Zie ook',
              items: ['[Geldstromen → Reserve](/geldstromen/reserve).'],
            },
          ],
          en: [
            {
              heading: 'Model assumption',
              items: [
                'Immediate deployability of inflows.',
                'Full availability of reserves.',
                'No external restrictions on use or movement.',
              ],
            },
            {
              heading: 'Practical deviations',
              items: [
                'Locked in accounts/systems.',
                'Subject to approvals.',
                'Temporarily non-tradable.',
                'Functionally blocked despite accounting presence.',
              ],
            },
            {
              heading: 'Effects',
              items: [
                'Gap between computed and actual availability.',
                'Computationally correct yet operationally infeasible cycles.',
                'Reserve buffer role overstated.',
              ],
            },
            {
              heading: 'Scope',
              body:
                'TGC describes cash flows, not liquidity management; distinction between ownership and availability is out of scope.',
            },
            {
              heading: 'See also',
              items: ['[Cash Flows → Reserve](/geldstromen/reserve).'],
            },
          ],
        },
      },
      {
        title: 'Uitvoering',
        slug: 'uitvoering',
        introNl:
          'Het model veronderstelt perfecte uitvoering volgens vooraf vastgestelde stappen; afwijkingen hierin zijn onvermijdelijke beperkingen.',
        introEn:
          'The model assumes perfect execution per predefined steps; deviations are unavoidable limitations.',
        blocks: {
          nl: [
            {
              heading: 'Veronderstellingen',
              items: [
                'Handelingen exact op gepland moment.',
                'Beslissingen volgen vastgelegde volgorde.',
                'Geen interpretatieverschillen.',
                'Geen gedragsafwijking over tijd.',
              ],
            },
            {
              heading: 'Bronnen van uitvoeringsafwijking',
              items: [
                'Menselijke fouten of interpretatieverschillen.',
                'Vertraagde of vervroegde acties.',
                'Onvolledige informatie op beslismoment.',
                'Discipline neemt af bij herhaling.',
              ],
            },
            {
              heading: 'Effect op het systeem',
              items: [
                'Verstoort tijdstructuur.',
                'Versterkt of onderbreekt cumulatieve effecten.',
                'Introduceert onzichtbare risico’s buiten de berekening.',
              ],
            },
            {
              heading: 'Relatie tot risico',
              items: ['Risico → Gedrag behandelt probabilistische gevolgen.'],
            },
            {
              heading: 'Zie ook',
              items: ['[Berekening → Volgorde](/berekening/volgorde) (stappen die exact gevolgd moeten worden).'],
            },
          ],
          en: [
            {
              heading: 'Assumptions',
              items: [
                'Actions exactly at planned time.',
                'Decisions follow the set order.',
                'No interpretation differences.',
                'No behavioural drift over time.',
              ],
            },
            {
              heading: 'Sources of execution deviation',
              items: [
                'Human error or interpretation differences.',
                'Delayed or early actions.',
                'Incomplete information at decision time.',
                'Discipline erosion across repetition.',
              ],
            },
            {
              heading: 'System effects',
              items: [
                'Disrupts time structure.',
                'Amplifies or interrupts cumulative effects.',
                'Introduces hidden risks not visible in calculations.',
              ],
            },
            {
              heading: 'Relation to risk',
              items: ['Risk → Behaviour covers probabilistic consequences.'],
            },
            {
              heading: 'See also',
              items: ['[Calculation → Sequence](/berekening/volgorde) (steps to follow exactly).'],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Risico',
    slug: 'risico',
    descriptionNl:
      'Risico beschrijft onzekerheden binnen de modelgrenzen; ontstaan door variatie en afwijking, niet door model-fouten.',
    descriptionEn:
      'Risk describes uncertainties within model bounds; driven by variation and deviation, not by model errors.',
    blocks: {
      nl: [
        {
          heading: 'Onderscheid tussen beperking en risico',
          items: [
            '**Beperking** — vaste eigenschap, niet weg te nemen.',
            '**Risico** — onzekere factor met bandbreedte aan uitkomsten.',
            'Beperkingen definiëren waar risico kan ontstaan; risico bepaalt de omvang van afwijking.',
          ],
        },
        {
          heading: 'Categorieën van risico',
          items: [
            '**Operationeel** — voortkomend uit uitvoering en proces.',
            '**Structureel** — uit opzet/parameters van het systeem.',
            '**Gedrag** — uit menselijk handelen en besluitvorming.',
          ],
        },
        {
          heading: 'Scope en afbakening',
          items: [
            'Conceptuele beschrijving; geen mitigaties of optimalisaties.',
            'Zie Beperkingen → Uitvoering, Modellering → Onzekerheid.',
          ],
        },
      ],
      en: [
        {
          heading: 'Limitation vs risk',
          items: [
            '**Limitation** — fixed property, cannot be removed.',
            '**Risk** — uncertain factor with a range of outcomes.',
            'Limitations define where risk can arise; risk defines the magnitude of deviation.',
          ],
        },
        {
          heading: 'Risk categories',
          items: [
            '**Operational** — execution/process driven.',
            '**Structural** — from system design/parameters.',
            '**Behavioural** — from human decisions and actions.',
          ],
        },
        {
          heading: 'Scope',
          items: [
            'Conceptual description; no mitigations/optimizations.',
            'See Limitations → Execution, Modelling → Uncertainty.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Operationeel',
        slug: 'operationeel',
        introNl:
          'Operationeel risico komt uit afwijkingen in uitvoering van processen die het model veronderstelt.',
        introEn:
          'Operational risk stems from deviations in executing the processes assumed by the model.',
        blocks: {
          nl: [
            {
              heading: 'Oorsprong',
              items: [
                'Technische storingen.',
                'Procesvertragingen.',
                'Onvolledige/verouderde informatie.',
                'Externe afhankelijkheden.',
              ],
            },
            {
              heading: 'Typen operationeel risico',
              items: [
                'Procesrisico — volgorde/timing van handelingen.',
                'Systeemrisico — beperkingen/storingen in systemen.',
                'Coördinatierisico — afstemming tussen actoren/systemen.',
              ],
            },
            {
              heading: 'Effect op time gaps',
              items: [
                'Time gaps verlengen of verkorten.',
                'Tijdelijke mismatches tussen ontvangst en verplichting.',
                'Cumulatieve verstoringen bij herhaling.',
              ],
            },
            {
              heading: 'Afbakening',
              items: ['Variatie in uitvoering, niet de structurele geldigheid van het model.'],
            },
            {
              heading: 'Zie ook',
              items: ['[Beperkingen → Timing](/beperkingen/timing).'],
            },
          ],
          en: [
            {
              heading: 'Origin',
              items: [
                'Technical failures.',
                'Process delays.',
                'Incomplete/outdated information.',
                'External dependencies.',
              ],
            },
            {
              heading: 'Types of operational risk',
              items: [
                'Process risk — order/timing deviations.',
                'System risk — limitations/failures in systems.',
                'Coordination risk — alignment across actors/systems.',
              ],
            },
            {
              heading: 'Effect on time gaps',
              items: [
                'Extend or shorten time gaps.',
                'Create temporary mismatches between receipt and obligation.',
                'Cause cumulative disruptions over repeated cycles.',
              ],
            },
            {
              heading: 'Scope',
              items: ['Variation in execution, not structural model validity.'],
            },
            {
              heading: 'See also',
              items: ['[Limitations → Timing](/beperkingen/timing).'],
            },
          ],
        },
      },
      {
        title: 'Structureel',
        slug: 'structureel',
        introNl:
          'Structureel risico komt uit de gekozen opzet, aannames en parameters van het TGC-model.',
        introEn:
          'Structural risk arises from the chosen design, assumptions, and parameters of the TGC model.',
        blocks: {
          nl: [
            {
              heading: 'Bron',
              items: [
                'Lengte van time gaps.',
                'Hoogte van ontvangsten en verplichtingen.',
                'Startmoment/cyclische herhaling.',
                'Veronderstelde stabiliteit van patronen.',
              ],
            },
            {
              heading: 'Kenmerken',
              items: [
                'Langzame opbouw, moeilijk vroeg te detecteren.',
                'Versterkend effect bij herhaling.',
                'Beperkte beïnvloedbaarheid tijdens uitvoering.',
              ],
            },
            {
              heading: 'Typische uitingen',
              items: [
                'Cumulatief tekort door kleine consistente afwijkingen.',
                'Overmatige afhankelijkheid van reserves.',
                'Verlies van robuustheid bij externe schokken.',
                'Onbedoelde synchronisatie van verplichtingen.',
              ],
            },
            {
              heading: 'Relatie tot modellering',
              items: [
                'Analyse via simulatie of gevoeligheid mogelijk, eliminatie niet volledig.',
              ],
            },
          ],
          en: [
            {
              heading: 'Source',
              items: [
                'Length of time gaps.',
                'Size of inflows and obligations.',
                'Start time and cycle repetition.',
                'Assumed stability of patterns.',
              ],
            },
            {
              heading: 'Characteristics',
              items: [
                'Slow buildup, hard to spot early.',
                'Amplifies with repetition.',
                'Limited controllability during execution.',
              ],
            },
            {
              heading: 'Typical manifestations',
              items: [
                'Cumulative shortfall from small consistent deviations.',
                'Over-reliance on reserves.',
                'Loss of robustness to external shocks.',
                'Unintended synchronization of obligations.',
              ],
            },
            {
              heading: 'Relation to modelling',
              items: [
                'Simulation/sensitivity can assess, but not fully eliminate.',
              ],
            },
          ],
        },
      },
      {
        title: 'Gedrag',
        slug: 'gedrag',
        introNl:
          'Gedragsrisico ontstaat doordat menselijk handelen afwijkt van de rationele en consistente aannames van het model.',
        introEn:
          'Behavioural risk arises when human actions deviate from the model’s rational/consistent assumptions.',
        blocks: {
          nl: [
            {
              heading: 'Veronderstelde rationaliteit',
              items: [
                'Consistente besluitvorming.',
                'Volledige naleving van geplande stappen.',
                'Onveranderde risicotolerantie.',
                'Geen emotionele beïnvloeding.',
              ],
            },
            {
              heading: 'Bronnen van afwijking',
              items: [
                'Overconfidence bij positieve uitkomsten.',
                'Vermijding/uitstel bij negatieve signalen.',
                'Discipline neemt af over tijd.',
                'Contextuele druk of externe prikkels.',
              ],
            },
            {
              heading: 'Effect op het systeem',
              items: [
                'Systematische timingafwijkingen.',
                'Andere interpretatie van buffers.',
                'Verhoogde gevoeligheid voor kleine schokken.',
                'Verschuiving van het oorspronkelijke doel.',
              ],
            },
            {
              heading: 'Onderscheid met operationeel risico',
              items: [
                'Operationeel risico komt uit processen; gedragsrisico uit beslissingen. Beide kunnen elkaar versterken.',
              ],
            },
            {
              heading: 'Zie ook',
              items: ['[Beperkingen → Uitvoering](/beperkingen/uitvoering)'],
            },
          ],
          en: [
            {
              heading: 'Assumed rationality',
              items: [
                'Consistent decision-making.',
                'Full adherence to planned steps.',
                'Stable risk tolerance.',
                'No emotional influence.',
              ],
            },
            {
              heading: 'Sources of deviation',
              items: [
                'Overconfidence on positive outcomes.',
                'Avoidance/deferral on negative signals.',
                'Discipline erosion over time.',
                'Contextual pressure or external cues.',
              ],
            },
            {
              heading: 'System impact',
              items: [
                'Systematic timing deviations.',
                'Changed interpretation of buffers.',
                'Higher sensitivity to small shocks.',
                'Shift from the model’s original intent.',
              ],
            },
            {
              heading: 'Distinction vs operational risk',
              items: [
                'Operational risk is process-driven; behavioural risk is decision-driven. They can reinforce each other.',
              ],
            },
            {
              heading: 'See also',
              items: ['[Limitations → Execution](/beperkingen/uitvoering)'],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Modellering',
    slug: 'modellering',
    descriptionNl:
      'Methoden om TGC-constructies kwantitatief te analyseren: onzekerheid kwantificeren, gevoeligheden toetsen, robuustheid evalueren.',
    descriptionEn:
      'Methods to quantitatively analyze TGC constructs: quantify uncertainty, test sensitivities, evaluate robustness.',
    blocks: {
      nl: [
        {
          heading: 'Kernonderdelen',
          items: [
            '**Simulatie** — onzekerheid en variatie (Monte Carlo, scenario-runs).',
            '**Distributie** — keuze/fit van kansverdelingen voor inputs.',
            '**Robuustheid** — stresstesten, sensitiviteit, beleidslimieten.',
          ],
        },
        {
          heading: 'Wanneer gebruik je modellering?',
          items: [
            'Materiële variatie in tijdstippen, opbrengsten of kosten.',
            'Conditionele of variabele verplichtingen.',
            'Beschikbare historische data om distributies te schatten.',
            'Validatie van aannames vóór pilot of opschaling.',
          ],
        },
        {
          heading: 'Beperkingen',
          items: [
            'Garbage in → garbage out; aannames/data bepalen kwaliteit.',
            'Modellering reduceert onzekerheid niet, maakt haar zichtbaar.',
            'Resultaten zijn probabilistisch, geen garanties.',
          ],
        },
        {
          heading: 'Leeswijzer',
          items: [
            'Start bij Simulatie, gebruik Distributie voor inputspecificatie.',
            'Pas Robuustheid toe voor policies en stresstesten.',
          ],
        },
      ],
      en: [
        {
          heading: 'Core parts',
          items: [
            '**Simulation** — uncertainty/variation (Monte Carlo, scenarios).',
            '**Distribution** — choose/fit probability distributions for inputs.',
            '**Robustness** — stress tests, sensitivity, policy limits.',
          ],
        },
        {
          heading: 'When to use modelling?',
          items: [
            'Material variation in timings, returns, or costs.',
            'Conditional/variable obligations.',
            'Historical data available to fit inputs.',
            'Validate assumptions before pilot/scale-up.',
          ],
        },
        {
          heading: 'Limitations',
          items: [
            'Garbage in → garbage out; quality depends on assumptions/data.',
            'Modelling doesn’t remove uncertainty; it exposes it.',
            'Outputs are probabilistic, not guarantees.',
          ],
        },
        {
          heading: 'Reading guide',
          items: [
            'Start with Simulation; use Distribution to specify inputs.',
            'Use Robustness for policies and stress testing.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Simulatie',
        slug: 'simulatie',
        introNl:
          'Simulatie om onzekerheid te kwantificeren (kans op tekort, P5/P95 Pi).',
        introEn:
          'Simulation to quantify uncertainty (default probability, P5/P95 Pi).',
        blocks: {
          nl: [
            {
              heading: 'Typen simulatie',
              items: [
                'Deterministische scenario’s (baseline/stress/recovery).',
                'Monte Carlo met gespecificeerde inputdistributies.',
                'What-if / mechanische stress-runs (gevoeligheden).',
              ],
            },
            {
              heading: 'Stappen (Monte Carlo)',
              items: [
                'Doel definiëren (bv. kans op buffertekort).',
                'Inputvariabelen kiezen: T, r_d/r_c, f, K_op, realisatietijd, etc.',
                'Distributies specificeren (zie Distributie).',
                'N runs kiezen (≥10.000 voor stabiele percentielen).',
                'Logica per run: volg Berekening → Volgorde.',
                'Uitkomsten verzamelen: Π, tekort, buffergebruik, TM.',
                'Samenvatten: mean, median, P5, P95, default rate.',
              ],
            },
            {
              heading: 'Pseudocode',
              pre: 'for i in 1..N:\\n  draw T_r, r_c, K_op_i\\n  compute C_use, S\\n  R = f(C_use, r_c, T_r)\\n  Pi = R - C_use - K_op_i\\n  beschikbaar = S + R + buffer\\n  default = beschikbaar < O\\ncollect (Pi, default, beschikbaar, T_r)\\nsummarize: mean, median, P5, P95, default_rate',
            },
            {
              heading: 'Output/rapportage',
              items: [
                'Mean/median Π, percentielen (P5/25/75/95).',
                'Default/tekort kans.',
                'Plots: histogram/ECDF.',
                'Sensitiviteit: welke inputs verklaren variantie.',
              ],
            },
            {
              heading: 'Interpretatie & valkuilen',
              items: [
                'Bekijk staarten (P5/P95), niet alleen gemiddelden.',
                'Voorzichtig bij zwak gefitte distributies of kleine datasets.',
                'Documenteer seeds/versies/constanten voor reproduceerbaarheid.',
              ],
            },
          ],
          en: [
            {
              heading: 'Simulation types',
              items: [
                'Deterministic scenarios (baseline/stress/recovery).',
                'Monte Carlo with specified input distributions.',
                'What-if/mechanical stress runs (sensitivities).',
              ],
            },
            {
              heading: 'Steps (Monte Carlo)',
              items: [
                'Define goal (e.g., probability of shortfall).',
                'Pick inputs: T, r_d/r_c, f, K_op, realization time, etc.',
                'Specify distributions (see Distribution).',
                'Choose N (≥10,000 for stable percentiles).',
                'Per-run logic: follow Calculation → Sequence.',
                'Collect outputs: Π, shortfall, buffer use, TM.',
                'Summarize: mean, median, P5, P95, default rate.',
              ],
            },
            {
              heading: 'Pseudocode',
              pre: 'for i in 1..N:\\n  draw T_r, r_c, K_op_i\\n  compute C_use, S\\n  R = f(C_use, r_c, T_r)\\n  Pi = R - C_use - K_op_i\\n  available = S + R + buffer\\n  default = available < O\\ncollect (Pi, default, available, T_r)\\nsummarize: mean, median, P5, P95, default_rate',
            },
            {
              heading: 'Output/reporting',
              items: [
                'Mean/median Π; percentiles (P5/25/75/95).',
                'Default/shortfall probability.',
                'Plots: histogram/ECDF.',
                'Sensitivity: which inputs explain variance.',
              ],
            },
            {
              heading: 'Interpretation & pitfalls',
              items: [
                'Check tails (P5/P95), not just averages.',
                'Caution if distributions are poorly fit or data is scarce.',
                'Document seeds/versions/constants for reproducibility.',
              ],
            },
          ],
        },
      },
      {
        title: 'Distributie',
        slug: 'distributie',
        introNl:
          'Kiezen, fitten en diagnosticeren van kansverdelingen voor inputvariabelen.',
        introEn:
          'Choosing, fitting, and diagnosing probability distributions for input variables.',
        blocks: {
          nl: [
            {
              heading: 'Veelgebruikte distributies',
              items: [
                'Normaal: symmetrische fouten; niet voor strikte positiviteit/scheefheid.',
                'Log-normaal: strikt positief, scheef (doorlooptijden, positieve rendementen).',
                'Beta: verhoudingen/percentages (f tussen 0 en 1).',
                'Gamma/Exponentieel: wachttijden/durations, rechtsscheef.',
                'Discrete: telvariabelen of scenario-indexen.',
              ],
            },
            {
              heading: 'Stappen voor fitten',
              items: [
                'Data verzamelen (N≥30).',
                'Visualiseer (histogram, Q-Q).',
                'Kies kandidaten op vorm (scheefheid, tail).',
                'Fit parameters (MLE/momenten).',
                'Diagnostiek: KS/AD of visueel Q-Q.',
                'Validatie: out-of-sample of k-fold indien mogelijk.',
              ],
            },
            {
              heading: 'Praktische adviezen',
              items: [
                'Fracties (f) met Beta, niet ongeconstrueerde normaal.',
                'Rendementen: let op negatieve waarden; definieer grenzen.',
                'Vermijd normaal voor strikt positieve variabelen.',
                'Documenteer fit-statistieken en visuele checks.',
              ],
            },
            {
              heading: 'Onzekerheid in distributies',
              items: [
                'Bij schaarse data: bredere intervalparameters of expert-elicitation.',
                'Doe robustheidscheck met alternatieve families.',
              ],
            },
            {
              heading: 'Metadata/opslag',
              items: [
                'Bewaar fitparameters, methode, diagnostic outputs in config.',
                'Versioneer fit en noteer datadatum.',
              ],
            },
          ],
          en: [
            {
              heading: 'Common distributions',
              items: [
                'Normal: symmetric errors; not for strictly positive/skewed data.',
                'Log-normal: strictly positive, skewed (durations, positive returns).',
                'Beta: ratios/percentages (f between 0 and 1).',
                'Gamma/Exponential: waiting times/durations, right-skewed.',
                'Discrete: counts or scenario indices.',
              ],
            },
            {
              heading: 'Fitting steps',
              items: [
                'Collect data (N≥30).',
                'Visualize (histogram, Q-Q).',
                'Pick candidate families by shape (skew/tails).',
                'Fit parameters (MLE/moments).',
                'Diagnostics: KS/AD or visual Q-Q.',
                'Validate: out-of-sample or k-fold if feasible.',
              ],
            },
            {
              heading: 'Practical advice',
              items: [
                'Use Beta for fractions (f), not unconstrained normals.',
                'For returns: handle negative possibilities; set bounds.',
                'Avoid normals for strictly positive variables.',
                'Document fit stats and visual checks.',
              ],
            },
            {
              heading: 'Uncertainty in distributions',
              items: [
                'If data is scarce: widen parameters or use expert elicitation.',
                'Test robustness with alternative families.',
              ],
            },
            {
              heading: 'Metadata/storage',
              items: [
                'Store fit params/method/diagnostics in config.',
                'Version the fit and record data date.',
              ],
            },
          ],
        },
      },
      {
        title: 'Robuustheid',
        slug: 'robuustheid',
        introNl:
          'Robuustheidsanalyse: stresstesten, gevoeligheden, beleidslimieten om stabiliteit te beoordelen.',
        introEn:
          'Robustness analysis: stress tests, sensitivities, policy limits to assess stability.',
        blocks: {
          nl: [
            {
              heading: 'Componenten',
              items: [
                'Stresstesten: deterministische schokken, plausibele extreme scenario’s.',
                'Gevoeligheidsanalyse: one-way en multi-factor variaties.',
                'Policylimieten/operating bands: faalkans, TM, reserve, triggers.',
              ],
            },
            {
              heading: 'Praktische aanpak',
              items: [
                'Definieer kritieke KPI’s (tekortkans, P5 Π, mediane TM).',
                'Voer stresstesten uit (fixed shocks, combinaties).',
                'Maak tornado/spider plots voor dominante inputs.',
                'Stel acceptatiecriteria (bv. default_rate < X%).',
              ],
            },
            {
              heading: 'KPI-voorbeelden',
              items: [
                'default_rate ≤ 1% (contextafhankelijk).',
                'TM_median ≥ 3 dagen (voorbeeld).',
                'P5_Pi > 0 of boven verlieslijn.',
              ],
            },
            {
              heading: 'Rapportage & governance',
              items: [
                'Overzichtstabel per scenario.',
                'Documenteer aannames en conversies.',
                'Versioneer scenario-definities voor auditability.',
              ],
            },
            {
              heading: 'Interpretatie',
              items: [
                'Robuustheid is geen garantie; toont breekpunten.',
                'Gebruik realistische shocks; extreme irrelevante shocks helpen niet.',
              ],
            },
          ],
          en: [
            {
              heading: 'Components',
              items: [
                'Stress tests: deterministic shocks, plausible extreme scenarios.',
                'Sensitivity: one-way and multi-factor variations.',
                'Policy limits/bands: default prob, TM, reserve, triggers.',
              ],
            },
            {
              heading: 'Practical approach',
              items: [
                'Define key KPIs (shortfall prob, P5 Π, median TM).',
                'Run stress tests (fixed shocks, combinations).',
                'Use tornado/spider plots for dominant inputs.',
                'Set acceptance criteria (e.g., default_rate < X%).',
              ],
            },
            {
              heading: 'KPI examples',
              items: [
                'default_rate ≤ 1% (context-dependent).',
                'TM_median ≥ 3 days (example).',
                'P5_Pi > 0 or above loss line.',
              ],
            },
            {
              heading: 'Reporting & governance',
              items: [
                'Summary table per scenario.',
                'Document assumptions and conversions.',
                'Version scenario definitions for auditability.',
              ],
            },
            {
              heading: 'Interpretation',
              items: [
                'Robustness is not a guarantee; it shows breakpoints.',
                'Use realistic shocks; irrelevant extremes add little.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Interpretatie',
    slug: 'interpretatie',
    descriptionNl:
      'Richtlijnen voor duiding van berekeningen/simulaties: welke metrics tellen, wanneer conclusies gerechtvaardigd zijn, en binnen welke grenzen.',
    descriptionEn:
      'Guidelines for interpreting calculations/simulations: which metrics matter, when conclusions are warranted, and within what bounds.',
    blocks: {
      nl: [
        {
          heading: 'Kernvragen',
          items: [
            'Wanneer is een uitkomst statistisch en praktisch relevant?',
            'Welke metrics/percentielen zijn het meest informatief?',
            'Wanneer leidt een resultaat niet tot een robuuste conclusie?',
            'Hoe koppel je modelresultaten aan besluitvorming zonder aanbevelingen?',
          ],
        },
        {
          heading: 'Wat behandeld wordt',
          items: [
            'Geldigheid — wanneer resultaten betrouwbaar zijn of niet.',
            'Grenzen — interpretatievalkuilen en hoe ze te herkennen.',
            'Context — organisatorische/juridische/operationele inkadering.',
          ],
        },
        {
          heading: 'Scope',
          items: [
            'Interpretatie is geen beleidsadvies.',
            'Verwijs naar Berekening/Modellering voor methode; hier gaat het om duiding.',
          ],
        },
      ],
      en: [
        {
          heading: 'Key questions',
          items: [
            'When is an outcome statistically and practically relevant?',
            'Which metrics/percentiles are most informative?',
            'When does a result fail to justify a robust conclusion?',
            'How to link model results to decisions without making recommendations?',
          ],
        },
        {
          heading: 'What is covered',
          items: [
            'Validity — when results are reliable or not.',
            'Limits — interpretation pitfalls and how to spot them.',
            'Context — organizational/legal/operational framing.',
          ],
        },
        {
          heading: 'Scope',
          items: [
            'Interpretation is not policy advice.',
            'See Calculation/Modelling for method; this page is about reading outputs.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Geldigheid',
        slug: 'geldigheid',
        introNl:
          'Wanneer berekeningen/simulaties binnen TGC methodologisch geldig zijn.',
        introEn:
          'When TGC calculations/simulations are methodologically valid.',
        blocks: {
          nl: [
            {
              heading: 'Criteria voor geldigheid',
              items: [
                'Datakwaliteit: correcte tijdstempels/bedragen, voldoende observaties (N ≥ 30 aanbevolen).',
                'Aannames expliciet/traceerbaar (distributies, verwerkingstijd, f, K_op) met versiebeheer.',
                'Binnen scope (zie Oriëntatie → Scope); condities gemodelleerd indien niet vrij besteedbaar.',
                'Robuustheidstests: basis stresstest + eenvoudige sensitiviteit; rapport P5/P50/P95.',
                'Reproduceerbaarheid: seed/code/data/constants beschikbaar.',
              ],
            },
            {
              heading: 'Aanbevolen output',
              items: [
                'Mediaan en gemiddelde Π.',
                'P5 en P95 van Π.',
                'Kans op tekort/default.',
                'Mediane en P5 TM.',
                'Sensitiviteitsranking (variantiebijdrage).',
              ],
            },
            {
              heading: 'Wanneer niet geldig',
              items: [
                'Onvolledige/ongevalideerde data.',
                'Distributies gefit met te weinig data zonder onzekerheidsmarge.',
                'Alleen gemiddelden, geen percentielen/faalkans.',
                'Buiten scope gemodelleerd (bijv. conditionele ontvangsten zonder juridische toets).',
              ],
            },
            {
              heading: 'Conclusie',
              body:
                'Zonder expliciete aannames en robuustheidsanalyse zijn uitkomsten onzeker en niet geschikt als beslisbasis.',
            },
          ],
          en: [
            {
              heading: 'Validity criteria',
              items: [
                'Data quality: correct timestamps/amounts; enough observations (N ≥ 30 recommended).',
                'Assumptions explicit/traceable (distributions, processing time, f, K_op) with versioning.',
                'Within scope (see Orientation → Scope); conditions modelled if not freely spendable.',
                'Robustness: basic stress + simple sensitivity; report P5/P50/P95.',
                'Reproducibility: seed/code/data/constants available.',
              ],
            },
            {
              heading: 'Recommended output',
              items: [
                'Median and mean Π.',
                'P5 and P95 of Π.',
                'Shortfall/default probability.',
                'Median and P5 TM.',
                'Sensitivity ranking (variance contribution).',
              ],
            },
            {
              heading: 'When not valid',
              items: [
                'Incomplete/unvalidated data.',
                'Fits with too little data and no uncertainty bounds.',
                'Only averages, no percentiles/default prob.',
                'Out-of-scope modelling (e.g., conditional receipts without legal treatment).',
              ],
            },
            {
              heading: 'Conclusion',
              body:
                'Without explicit assumptions and robustness checks, results are uncertain and not decision-grade.',
            },
          ],
        },
      },
      {
        title: 'Grenzen',
        slug: 'grenzen',
        introNl:
          'Waar interpretaties misgaan: grenzen aan conclusies uit TGC-analyses.',
        introEn:
          'Where interpretations fail: limits to conclusions from TGC analyses.',
        blocks: {
          nl: [
            {
              heading: 'Typische grenzen',
              items: [
                'Gemiddelden verhullen staarten (P5).',
                'Correlatie is geen causaliteit.',
                'Overfitting op historische patronen.',
                'Model werkt op schone data, faalt bij boekings/valutadatum-mismatch.',
                'Scope-uitbreiding (niet-vrij besteedbaar of nieuwe afhankelijkheden) verandert het model.',
              ],
            },
            {
              heading: 'Waarschuwingssignalen',
              items: [
                'Geen sensitivities, alleen enkelvoudig scenario.',
                'P1–P5 niet gerapporteerd.',
                'Sterke afhankelijkheid van één ongeteste parameter.',
                'Geen versiehistorie van modelconfig/data.',
              ],
            },
            {
              heading: 'Praktische tips',
              items: [
                'Kijk naar staartstatistiek (P5) naast mediaan/gemiddelde.',
                'Vraag: welke aannames, hoe gevoelig is de uitkomst?',
                'Vermijd extrapolatie buiten historische bandbreedtes zonder extra tests.',
              ],
            },
            {
              heading: 'Conclusie',
              body:
                'Zonder aandacht voor grenzen wordt informatiewaarde overschat; herken valkuilen om onterechte generalisatie te voorkomen.',
            },
          ],
          en: [
            {
              heading: 'Typical limits',
              items: [
                'Averages hide tails (P5).',
                'Correlation ≠ causation.',
                'Overfitting to historical patterns.',
                'Model on clean data may fail with booking/value-date mismatches.',
                'Scope creep (non-free inflows or new dependencies) changes the model.',
              ],
            },
            {
              heading: 'Warning signs',
              items: [
                'No sensitivities; single scenario only.',
                'Tails (P1–P5) not reported.',
                'Heavy reliance on one untested parameter.',
                'No version history of model config/data.',
              ],
            },
            {
              heading: 'Practical tips',
              items: [
                'Inspect tails (P5) alongside median/mean.',
                'Always ask: which assumptions, and sensitivity to them?',
                'Avoid extrapolation beyond historical bands without extra tests.',
              ],
            },
            {
              heading: 'Conclusion',
              body:
                'Ignoring limits overstates information value; spotting pitfalls avoids unjustified generalization.',
            },
          ],
        },
      },
      {
        title: 'Context',
        slug: 'context',
        introNl:
          'Plaats modelresultaten in operationele, organisatorische en juridische context voordat je conclusies trekt.',
        introEn:
          'Place model results in operational, organizational, and legal context before concluding.',
        blocks: {
          nl: [
            {
              heading: 'Drie contextlagen',
              items: [
                'Operationeel: processen/systemen, buffers, fallback.',
                'Organisatorisch: risicotolerantie, governance, rapportage/mandaten.',
                'Juridisch/contractueel: vrijgave, retenties, terugvordering, sancties.',
              ],
            },
            {
              heading: 'Vragen bij contextualisatie',
              items: [
                'Zijn data/aannames representatief voor huidige processen?',
                'Is er mandaat/buffer/fallback beschikbaar?',
                'Welke stakeholders informeren bij risico?',
                'Juridische barrières voor inzetten van C_use?',
              ],
            },
            {
              heading: 'Voorbeeldinterpretatie',
              items: [
                'Median Π positief, P5 licht negatief → check buffer/procedure (operationeel).',
                'Is incidenteel verlies acceptabel (governance)?',
                'Zijn ontvangsten vrij inzetbaar of terugvorderbaar (juridisch)?',
              ],
            },
            {
              heading: 'Relatie tot rapportage',
              items: [
                'Voeg contextnota toe: data-eigenaar, aannames, stakeholders, procedures.',
              ],
            },
          ],
          en: [
            {
              heading: 'Three context layers',
              items: [
                'Operational: processes/systems, buffers, fallback.',
                'Organizational: risk tolerance, governance, reporting/mandates.',
                'Legal/contractual: release, retentions, clawback, penalties.',
              ],
            },
            {
              heading: 'Context questions',
              items: [
                'Are data/assumptions representative of current processes?',
                'Is mandate/buffer/fallback available?',
                'Which stakeholders to inform on risk?',
                'Any legal barriers to deploying C_use?',
              ],
            },
            {
              heading: 'Example interpretation',
              items: [
                'Median Π positive, P5 slightly negative → check buffer/procedure (operational).',
                'Is occasional loss acceptable (governance)?',
                'Are inflows freely deployable or clawback-prone (legal)?',
              ],
            },
            {
              heading: 'Relation to reporting',
              items: [
                'Include context note: data owner, assumptions, stakeholders, procedures.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Referentie',
    slug: 'referentie',
    descriptionNl:
      'Formeel naslagwerk: definities, bronbestanden en methodische regels voor reproduceerbare analyses.',
    descriptionEn:
      'Formal reference: definitions, source files, and methodological rules for reproducible analyses.',
    blocks: {
      nl: [
        {
          heading: 'Structuur van deze sectie',
          items: [
            '**Begrippen** — exacte definities, symbolen en datatype-aanbevelingen.',
            '**Documenten** — downloadbare artefacten (whitepapers, rekenbladen, notebooks) met gebruiksinstructie.',
            '**Methodiek** — projectstructuur, config-conventies, reproducibility-checklist, governance-adviezen.',
          ],
        },
        {
          heading: 'Gebruik',
          items: [
            'Controleer eerst Begrippen voor notatie/datamapping.',
            'Gebruik Documenten voor voorbeelden/notebooks.',
            'Volg Methodiek voor versiebeheer, config en reproducibility.',
          ],
        },
      ],
      en: [
        {
          heading: 'Section structure',
          items: [
            '**Definitions** — exact terms, symbols, and data type guidance.',
            '**Documents** — downloadable artifacts (whitepapers, sheets, notebooks) with usage notes.',
            '**Methodology** — project structure, config conventions, reproducibility checklist, governance advice.',
          ],
        },
        {
          heading: 'How to use',
          items: [
            'Check Definitions first for notation/data mapping.',
            'Use Documents to download examples/notebooks.',
            'Follow Methodology for versioning, config, and reproducibility.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Begrippen',
        slug: 'begrippen',
        introNl:
          'Gemeenschappelijke bron van waarheid voor termen en symbolen; gebruik deze benamingen consequent.',
        introEn:
          'Single source of truth for terms and symbols; use these names consistently.',
        blocks: {
          nl: [
            {
              heading: 'Kerntermen en notatie',
              items: [
                '`C_in` — ontvangst; bruto bedrag op t₀ (decimaal, bijv. 100000.00).',
                '`f` — fractie inzetbaar; 0 < f ≤ 1 (bijv. 0,8).',
                '`C_use` — inzet; C_use = f · C_in.',
                '`S` — reserve; S = C_in − C_use.',
                '`T` — interval/time gap in dagen (t₀ → t₀+T).',
                '`O` — verplichting op t₀+T.',
                '`R(T)` — opbrengst binnen T.',
                '`K_op` — operationele kosten per cycle.',
                '`Π` — netto-opbrengst; Π = R(T) − C_use − K_op.',
                '`ROC` — rendement per cycle; ROC = Π / C_use.',
                '`r_d` — dagrendement; r_d ≈ ROC / T.',
                '`TM` — timingmarge; TM = T − realisatietijd(OP).',
                '`B` — buffer (extern of intern).',
                '`LSI` — liquiditeitsstress-index; LSI = (O − B) / O.',
              ],
            },
            {
              heading: 'Notatie- en opslagrichtlijnen',
              items: [
                'Tijdstempels: ISO 8601 met offset.',
                'Valuta: ISO 4217 (bv. EUR); bedrag en valuta apart opslaan.',
                'Numeriek: decimaal met 2 decimalen voor EUR; geen floats.',
                'Bronvermelding: elke variabele heeft `source` (bank_mutatie/contract/manual_input).',
                'Versiebeheer: definities bijhouden in /docs/changelog.md.',
              ],
            },
          ],
          en: [
            {
              heading: 'Key terms and notation',
              items: [
                '`C_in` — receipt; gross at t₀ (decimal, e.g., 100000.00).',
                '`f` — deployable fraction; 0 < f ≤ 1 (e.g., 0.8).',
                '`C_use` — deployed; C_use = f · C_in.',
                '`S` — reserve; S = C_in − C_use.',
                '`T` — interval/time gap in days (t₀ → t₀+T).',
                '`O` — obligation at t₀+T.',
                '`R(T)` — return within T.',
                '`K_op` — operating costs per cycle.',
                '`Π` — net result; Π = R(T) − C_use − K_op.',
                '`ROC` — return per cycle; ROC = Π / C_use.',
                '`r_d` — daily return; r_d ≈ ROC / T.',
                '`TM` — timing margin; TM = T − realization_time(OP).',
                '`B` — buffer (external or internal).',
                '`LSI` — liquidity stress index; LSI = (O − B) / O.',
              ],
            },
            {
              heading: 'Notation/storage guidelines',
              items: [
                'Timestamps: ISO 8601 with offset.',
                'Currency: ISO 4217 (e.g., EUR); store amount and currency separately.',
                'Numeric: decimal with 2 places for EUR; avoid floats.',
                'Source tagging: each variable has `source` (bank_mutatie/contract/manual_input).',
                'Versioning: track definition changes in /docs/changelog.md.',
              ],
            },
          ],
        },
      },
      {
        title: 'Documenten',
        slug: 'documenten',
        introNl:
          'Kernbestanden voor reproduceerbaarheid: whitepapers, rekenbladen, notebooks, dataschema’s, changelogs.',
        introEn:
          'Core files for reproducibility: whitepapers, spreadsheets, notebooks, data schemas, changelogs.',
        blocks: {
          nl: [
            {
              heading: 'Beschikbare artefacten',
              items: [
                '`whitepaper-core.pdf` — theorie/kernformules; citeerbaar.',
                '`examples.xlsx` / `examples.csv` — ingevulde voorbeelden (Enkelvoudig/Herhaald/Cumulatief).',
                '`mc_notebook.ipynb` — Monte Carlo referentie; met requirements + README.',
                '`dataschema.csv` — kolom → symbool → type → voorbeeld → toelichting.',
                '`config.example.json` — template voor modelconfig (constants, seed).',
                '`changelog.md` — versiebeheer content/modellen/constants.',
                '`license.txt` — gebruiksvoorwaarden/licentie.',
              ],
            },
            {
              heading: 'Download & gebruik',
              items: [
                'Bestanden per versie in `/downloads/{version}/`.',
                'Match met `changelog.md` voor juiste pairing.',
                'Notebooks leveren `requirements.txt` en `README.md` met run-instructies.',
              ],
            },
            {
              heading: 'Aanbeveling voor publicatie',
              items: [
                'Publiceer versie-tag en `config.json` bij resultaten.',
                'Bundel `data/raw/` (geanonimiseerd waar nodig), `config.json`, seed en notebook/script in een run-folder.',
              ],
            },
          ],
          en: [
            {
              heading: 'Available artifacts',
              items: [
                '`whitepaper-core.pdf` — theory/core formulas; citable.',
                '`examples.xlsx` / `examples.csv` — filled examples (Single/Repeated/Cumulative).',
                '`mc_notebook.ipynb` — Monte Carlo reference; with requirements + README.',
                '`dataschema.csv` — column → symbol → type → example → notes.',
                '`config.example.json` — config template (constants, seed).',
                '`changelog.md` — versioning for content/models/constants.',
                '`license.txt` — terms/license.',
              ],
            },
            {
              heading: 'Download & usage',
              items: [
                'Files per version in `/downloads/{version}/`.',
                'Pair with `changelog.md` for correct matching.',
                'Notebooks include `requirements.txt` and `README.md` for runs.',
              ],
            },
            {
              heading: 'Publishing recommendations',
              items: [
                'Publish version tag and `config.json` with results.',
                'Bundle `data/raw/` (anonymized where needed), `config.json`, seed, notebook/script in a run folder.',
              ],
            },
          ],
        },
      },
      {
        title: 'Methodiek',
        slug: 'methodiek',
        introNl:
          'Checklists en richtlijnen voor reproduceerbare, traceerbare en verantwoorde analyses binnen TGC.',
        introEn:
          'Checklists and guidelines for reproducible, traceable, and accountable analyses within TGC.',
        blocks: {
          nl: [
            {
              heading: 'Kernprincipes',
              items: [
                'Traceerbaarheid: bewaar brondata, transforms en config per run.',
                'Transparantie: documenteer aannames (distributies, seeds, constants).',
                'Reproduceerbaarheid: zelfde config + seed → zelfde uitkomst.',
                'Conservatieve rapportage: mediaan én staarten (P5, P95).',
              ],
            },
            {
              heading: 'Aanbevolen projectstructuur',
              pre: 'project-root/\\n├─ data/\\n│   ├─ raw/\\n│   └─ processed/\\n├─ notebooks/\\n├─ src/\\n│   ├─ model.py\\n│   └─ simulate.py\\n├─ config/\\n│   └─ config.json\\n├─ outputs/\\n│   └─ runs/{timestamp_seed}/\\n├─ docs/\\n│   └─ changelog.md\\n└─ tests/\\n└─ unit_tests.py',
            },
            {
              heading: 'Voorbeeldconfig',
              pre: '{\\n  \"version\": \"1.0.0\",\\n  \"time_unit\": \"dagen\",\\n  \"currency\": \"EUR\",\\n  \"buffer_policy\": {\"type\":\"relative\",\"value\":0.05},\\n  \"min_data_points\": 30,\\n  \"confidence_level\": 0.95,\\n  \"processing_days\": 2,\\n  \"max_f\": 0.9,\\n  \"random_seed\": 123456\\n}',
            },
            {
              heading: 'Reproduceerbaarheids-checklist',
              items: [
                '[ ] Raw data in data/raw/ met checksum.',
                '[ ] Cleaning script + processed outputs gelogd.',
                '[ ] config.json + random_seed in run folder.',
                '[ ] Notebook/script runt met requirements.txt.',
                '[ ] Percentielen (P1, P5, P50, P95, P99) gerapporteerd.',
                '[ ] meta.json bevat input-hash, config-versie, run-seed.',
                '[ ] Changelog geüpdatet met rationale.',
              ],
            },
            {
              heading: 'Data governance & privacy',
              items: [
                'Anonimiseer persoonsgegevens; mappings in beveiligde vault.',
                'Voldoe aan regelgeving (bv. GDPR) bij opslag/delen.',
                'Publieke downloads: alleen geanonimiseerde/synthetische data.',
              ],
            },
            {
              heading: 'Versiebeheer & change control',
              items: [
                'Semver voor modellen/config.',
                'Impactanalyse documenteren bij elke wijziging.',
                'Oude runs bewaren conform retentiebeleid.',
              ],
            },
          ],
          en: [
            {
              heading: 'Core principles',
              items: [
                'Traceability: keep raw data, transforms, config per run.',
                'Transparency: document assumptions (distributions, seeds, constants).',
                'Reproducibility: same config + seed → same result.',
                'Conservative reporting: median and tails (P5, P95).',
              ],
            },
            {
              heading: 'Recommended project structure',
              pre: 'project-root/\\n├─ data/\\n│   ├─ raw/\\n│   └─ processed/\\n├─ notebooks/\\n├─ src/\\n│   ├─ model.py\\n│   └─ simulate.py\\n├─ config/\\n│   └─ config.json\\n├─ outputs/\\n│   └─ runs/{timestamp_seed}/\\n├─ docs/\\n│   └─ changelog.md\\n└─ tests/\\n└─ unit_tests.py',
            },
            {
              heading: 'Example config',
              pre: '{\\n  \"version\": \"1.0.0\",\\n  \"time_unit\": \"days\",\\n  \"currency\": \"EUR\",\\n  \"buffer_policy\": {\"type\":\"relative\",\"value\":0.05},\\n  \"min_data_points\": 30,\\n  \"confidence_level\": 0.95,\\n  \"processing_days\": 2,\\n  \"max_f\": 0.9,\\n  \"random_seed\": 123456\\n}',
            },
            {
              heading: 'Reproducibility checklist',
              items: [
                '[ ] Raw data in data/raw/ with checksum.',
                '[ ] Cleaning script + processed outputs logged.',
                '[ ] config.json + random_seed in run folder.',
                '[ ] Notebook/script runs with requirements.txt.',
                '[ ] Percentiles (P1, P5, P50, P95, P99) reported.',
                '[ ] meta.json has input-hash, config version, run-seed.',
                '[ ] Changelog updated with rationale.',
              ],
            },
            {
              heading: 'Data governance & privacy',
              items: [
                'Anonymize personal data; mappings in secure vault.',
                'Comply with regulations (e.g., GDPR) when storing/sharing.',
                'Public downloads: only anonymized or synthetic data.',
              ],
            },
            {
              heading: 'Versioning & change control',
              items: [
                'Use semver for models/config.',
                'Document impact analysis for each change.',
                'Retain old runs per retention policy.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Disclaimer',
    slug: 'disclaimer',
    descriptionNl:
      'Overzicht van juridische, inhoudelijke en niet-adviesdisclaimers die gelden voor alle teksten, modellen en downloads.',
    descriptionEn:
      'Overview of legal, content, and no-advice disclaimers covering all texts, models, and downloads.',
    blocks: {
      nl: [
        {
          heading: 'Subpagina’s',
          items: [
            '**Juridisch** — aansprakelijkheid, intellectueel eigendom, toepasselijk recht.',
            '**Inhoudelijk** — aard van de content, bronnen, actualiteit/correctheid.',
            '**Niet-advies** — expliciete niet-adviesverklaring (financieel/fiscaal/juridisch).',
          ],
        },
        {
          heading: 'Overige bepalingen (kort)',
          items: [
            'Geen garanties over juistheid of volledigheid.',
            'Gebruik op eigen risico; teksten kunnen worden geüpdatet/gecorrigeerd.',
            'Raadpleeg gespecialiseerde adviseurs bij twijfel.',
          ],
        },
      ],
      en: [
        {
          heading: 'Subpages',
          items: [
            '**Legal** — liability, intellectual property, applicable law.',
            '**Content** — nature of content, sources, freshness/accuracy.',
            '**No-advice** — explicit statement of no financial/tax/legal advice.',
          ],
        },
        {
          heading: 'Other provisions (short)',
          items: [
            'No guarantees on accuracy or completeness.',
            'Use at your own risk; texts may be updated/corrected.',
            'Consult specialized advisors when in doubt.',
          ],
        },
      ],
    },
    children: [
      {
        title: 'Juridisch',
        slug: 'juridisch',
        introNl:
          'Juridische afbakening rond aansprakelijkheid, intellectueel eigendom en toepasselijk recht.',
        introEn:
          'Legal boundaries on liability, intellectual property, and applicable law.',
        blocks: {
          nl: [
            {
              heading: 'Aansprakelijkheid',
              items: [
                'Inhoud wordt aangeboden “zoals deze is”, zonder garanties.',
                'Geen aansprakelijkheid voor directe/indirecte schade; gebruik op eigen risico.',
              ],
            },
            {
              heading: 'Intellectueel eigendom',
              items: [
                'Alle content beschermd door auteursrecht tenzij anders vermeld.',
                'Citeren mag met bron en zonder wijziging.',
                'Commercieel hergebruik/verspreiding alleen met schriftelijke toestemming.',
              ],
            },
            {
              heading: 'Links en derde partijen',
              items: [
                'Externe bronnen vallen buiten onze controle; geen garanties.',
                'Referenties impliceren geen goedkeuring/partnerschap.',
              ],
            },
            {
              heading: 'Toepasselijk recht en jurisdictie',
              items: [
                'Toepasselijk recht van [invullen]; geschillen naar bevoegde rechtbank (voor zover toegestaan).',
              ],
            },
            {
              heading: 'Contact',
              items: [
                'Juridische vragen/verwijderingsverzoeken: gebruik contactadres met onderwerp en onderbouwing.',
              ],
            },
          ],
          en: [
            {
              heading: 'Liability',
              items: [
                'Content provided “as is”, without warranties.',
                'No liability for direct/indirect damages; use at your own risk.',
              ],
            },
            {
              heading: 'Intellectual property',
              items: [
                'All content copyright-protected unless stated otherwise.',
                'Quoting allowed with attribution and without alteration.',
                'Commercial reuse/distribution requires written permission.',
              ],
            },
            {
              heading: 'Links and third parties',
              items: [
                'External resources outside our control; no guarantees.',
                'References do not imply endorsement/partnership.',
              ],
            },
            {
              heading: 'Governing law and jurisdiction',
              items: [
                'Law of [fill in jurisdiction] applies; disputes to competent court (unless mandatory law dictates otherwise).',
              ],
            },
            {
              heading: 'Contact',
              items: [
                'IP takedowns/legal inquiries: use contact address with subject and rationale.',
              ],
            },
          ],
        },
      },
      {
        title: 'Inhoudelijk',
        slug: 'inhoudelijk',
        introNl:
          'Aard, beperkingen en betrouwbaarheid van gepubliceerde teksten, formules, voorbeelden en modellen.',
        introEn:
          'Nature, limits, and reliability of published texts, formulas, examples, and models.',
        blocks: {
          nl: [
            {
              heading: 'Informatieve aard',
              items: [
                'Descriptief, bedoeld voor uitleg/toetsing van TGC-ramenwerk.',
                'Voorbeelden zijn didactisch; geen representatie van specifieke operationele uitkomsten.',
              ],
            },
            {
              heading: 'Actualiteit en correctheid',
              items: [
                'We streven naar juistheid/consistentie; fouten kunnen voorkomen.',
                'Pagina’s worden periodiek geactualiseerd; check datum laatste update.',
              ],
            },
            {
              heading: 'Datagebruik en aannames',
              items: [
                'Modellen zijn zo goed als data en aannames.',
                'Resultaten zijn probabilistisch/oefenmatig onder gespecificeerde aannames, geen voorspellingen.',
              ],
            },
            {
              heading: 'Downloads en scripts',
              items: [
                'Scripts/notebooks/spreadsheets als hulpmiddel; gebruik/wijziging op eigen risico.',
                'Voor reproduceerbaarheid: documenteer aanpassingen en versies/seeds.',
              ],
            },
            {
              heading: 'Correcties en feedback',
              items: [
                'Meld onjuistheden via contactkanaal met onderbouwing en paginareferentie.',
              ],
            },
          ],
          en: [
            {
              heading: 'Informational nature',
              items: [
                'Descriptive, meant for explaining/testing the TGC framework.',
                'Examples are didactic; not representative of specific operational outcomes.',
              ],
            },
            {
              heading: 'Freshness and accuracy',
              items: [
                'We aim for correctness/consistency; errors may exist.',
                'Pages are periodically updated; always check last update date.',
              ],
            },
            {
              heading: 'Data use and assumptions',
              items: [
                'Models are only as good as data and assumptions.',
                'Outputs are probabilistic/exploratory under stated assumptions, not predictions.',
              ],
            },
            {
              heading: 'Downloads and scripts',
              items: [
                'Scripts/notebooks/spreadsheets as tools; use/modify at own risk.',
                'For reproducibility: document changes and versions/seeds.',
              ],
            },
            {
              heading: 'Corrections and feedback',
              items: [
                'Report inaccuracies via contact channel with justification and page reference.',
              ],
            },
          ],
        },
      },
      {
        title: 'Niet-advies',
        slug: 'niet-advies',
        introNl:
          'Expliciete niet-adviesverklaring: geen juridisch/fiscaal/financieel of ander professioneel advies.',
        introEn:
          'Explicit no-advice statement: no legal/tax/financial or other professional advice.',
        blocks: {
          nl: [
            {
              heading: 'Geen professioneel advies',
              items: [
                'Informatie is geen professioneel advies; auteurs/beheerders zijn geen adviseur/fiduciair.',
                'Raadpleeg bevoegde adviseurs voor operationele, juridische, financiële beslissingen.',
              ],
            },
            {
              heading: 'Geen relatie of verplichting',
              items: [
                'Informatie of antwoorden creëren geen adviesrelatie.',
                'Begeleiding/advies enkel schriftelijk en onder formele voorwaarden.',
              ],
            },
            {
              heading: 'Aanbeveling bij toepassing',
              items: [
                'Voer due diligence uit: operationele tests, juridische toetsing, onafhankelijk financieel oordeel.',
                'Beschouw content als analytische verkenning, niet als basis voor bindende beslissingen.',
              ],
            },
          ],
          en: [
            {
              heading: 'No professional advice',
              items: [
                'Information is not professional advice; authors/maintainers are not advisors/fiduciaries.',
                'Consult qualified advisors for operational/legal/financial decisions.',
              ],
            },
            {
              heading: 'No relationship or obligation',
              items: [
                'Publishing info or answering general questions does not create an advisory relationship.',
                'Guidance/advice only under written, formal terms.',
              ],
            },
            {
              heading: 'Application recommendations',
              items: [
                'Perform due diligence: operational tests, legal review, independent financial judgment.',
                'Treat content as exploratory analysis, not as binding decision basis.',
              ],
            },
          ],
        },
      },
    ],
  },
]

function collectContentText(node, locale) {
  if (!node) return []
  const texts = []
  const push = (v) => {
    if (typeof v === 'string' && v.trim()) texts.push(v)
  }
  push(node.title)
  push(node.descriptionNl)
  push(node.descriptionEn)
  push(node.introNl)
  push(node.introEn)
  if (node.blocks) {
    const blocks = node.blocks[locale] || []
    blocks.forEach((b) => {
      push(b.heading)
      push(b.body)
      push(b.pre)
      if (Array.isArray(b.items)) b.items.forEach(push)
    })
  }
  return texts
}

function buildSearchIndex(sections, locale) {
  const index = []
  sections.forEach((section) => {
    const sectionPath = `/${section.slug}`
    const baseTexts = collectContentText(section, locale)
    index.push({
      path: sectionPath,
      title: section.title,
      section: section.title,
      content: baseTexts.join(' ').toLowerCase(),
      snippet: (baseTexts.join(' ') || '').slice(0, 180),
    })
    if (Array.isArray(section.children)) {
      section.children.forEach((child) => {
        const childPath = `${sectionPath}/${child.slug}`
        const childTexts = collectContentText(child, locale)
        index.push({
          path: childPath,
          title: child.title,
          section: section.title,
          content: childTexts.join(' ').toLowerCase(),
          snippet: (childTexts.join(' ') || '').slice(0, 180),
        })
      })
    }
  })
  return index
}

function scoreMatch(item, query) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  if (!words.length) return 0
  let score = 0
  words.forEach((w) => {
    if (item.title.toLowerCase().includes(w)) score += 6
    if (item.section.toLowerCase().includes(w)) score += 2
    if (item.content.includes(w)) score += 1
  })
  return score
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function useNavState() {
  const location = useLocation()
  const [openSections, setOpenSections] = useState(() => new Set())
  const parts = location.pathname.split('/').filter(Boolean)
  const activeSectionSlug = parts[0]

  const toggleSection = (slug) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  const isActivePath = (path) => location.pathname === path
  const isWithinSection = (sectionSlug) => location.pathname.startsWith(`/${sectionSlug}`)

  useEffect(() => {
    if (!activeSectionSlug) return
    setOpenSections((prev) => {
      if (prev.has(activeSectionSlug)) return prev
      const next = new Set(prev)
      next.add(activeSectionSlug)
      return next
    })
  }, [activeSectionSlug])

  return { location, openSections, toggleSection, isActivePath, isWithinSection }
}

function LocaleToggle({ locale, onChange }) {
  return (
    <div className="inline-flex gap-1 items-center px-1 py-1 bg-white rounded-md border shadow-sm border-stone-200">
      {['nl', 'en'].map((code) => (
        <button
          key={code}
          onClick={() => onChange(code)}
          className={`px-2 py-1 text-xs font-medium uppercase rounded ${
            locale === code ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle({ theme, onChange }) {
  const options = [
    { code: 'light', label: 'Light' },
    { code: 'dark', label: 'Dark' },
  ]
  return (
    <div className="inline-flex gap-1 items-center px-1 py-1 bg-white rounded-md border shadow-sm border-stone-200">
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => onChange(opt.code)}
          className={`px-2 py-1 text-xs font-medium rounded ${
            theme === opt.code ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function Navigation({ sections, locale, onLocaleChange, theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openSections, toggleSection, isActivePath, isWithinSection } = useNavState()
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const searchIndex = useMemo(() => buildSearchIndex(sections, locale), [sections, locale])
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const scored = searchIndex
      .map((item) => ({ ...item, score: scoreMatch(item, searchQuery) }))
      .filter((i) => i.score > 0)
      .sort((a, b) => b.score - a.score)
    return scored.slice(0, 30)
  }, [searchQuery, searchIndex])

  const highlightSnippet = (text, query) => {
    if (!query.trim()) return text
    const words = query
      .split(/\s+/)
      .filter(Boolean)
      .map(escapeRegExp)
    if (!words.length) return text
    const pattern = new RegExp(`(${words.join('|')})`, 'gi')
    return text.replace(pattern, '<mark>$1</mark>')
  }

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/Geld_laten_werken_tussen_betalen_en_ontvangen.m4a')
    }
    const audio = audioRef.current
    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (e) {
        console.error('Audio play failed', e)
      }
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      {/* Mobile top bar with hamburger + toggles */}
      <div className="flex items-center justify-between border-b border-stone-200 bg-[#fdfcfb] px-4 py-3 md:hidden">
        <h1 className="text-base font-semibold tracking-[0.2em] uppercase text-stone-900">TIME GAP CASHFLOW</h1>
        <div className="flex gap-3 items-center">
          <div className="flex flex-col gap-1 items-end">
            <ThemeToggle theme={theme} onChange={onThemeChange} />
            <LocaleToggle locale={locale} onChange={onLocaleChange} />
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-stone-50 text-stone-800"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? (locale === 'en' ? 'Pause' : 'Pauze') : 'Play'}
            </button>
          </div>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex justify-center items-center w-10 h-10 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50"
            aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-stone-900" />
              <span className="block h-0.5 w-5 bg-stone-900" />
              <span className="block h-0.5 w-5 bg-stone-900" />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && <div className="fixed inset-0 z-10 bg-stone-900/20 md:hidden" onClick={() => setMenuOpen(false)} />}
      <aside
        className={`z-20 border-r border-stone-200 bg-[#fdfcfb] transition-all duration-200 md:static md:block md:h-auto md:w-72 lg:w-80 ${
          menuOpen ? 'fixed inset-y-0 left-0 w-4/5 max-w-xs shadow-lg' : 'hidden md:block'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-stone-200 md:px-5">
          <h1 className="text-base font-semibold tracking-[0.2em] uppercase text-stone-900 md:text-lg">TIME GAP CASHFLOW</h1>
          <div className="hidden flex-col gap-2 items-end md:flex">
            <ThemeToggle theme={theme} onChange={onThemeChange} />
            <LocaleToggle locale={locale} onChange={onLocaleChange} />
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-stone-50 text-stone-800"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? (locale === 'en' ? 'Pause' : 'Pauze') : 'Play'}
            </button>
          </div>
        </div>

        <div className="px-3 pt-3 md:px-4">
          <label className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-stone-400">
            <Search size={16} className="text-stone-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'en' ? 'Search topics…' : 'Zoek onderwerpen…'}
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-600"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </label>
          {searchQuery && (
            <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-stone-200 bg-white shadow-lg">
              {searchResults.length === 0 ? (
                <div className="px-3 py-2 text-sm text-stone-500">
                  {locale === 'en' ? 'No matches' : 'Geen resultaten'}
                </div>
              ) : (
                <ul className="divide-y divide-stone-100">
                  {searchResults.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => {
                          setMenuOpen(false)
                          setSearchQuery('')
                        }}
                        className="block px-3 py-2 hover:bg-stone-50"
                      >
                        <div className="text-sm font-semibold text-stone-900">{item.title}</div>
                        <div className="text-[11px] uppercase tracking-[0.08em] text-stone-400">{item.section}</div>
                        <div
                          className="mt-1 text-sm text-stone-600 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: highlightSnippet(item.snippet, searchQuery) }}
                        />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <nav className="max-h-[calc(100vh-56px)] overflow-y-auto md:max-h-none">
          <ul className="px-2 py-3 space-y-2 md:px-3 md:py-4">
            {sections.map((section) => {
              const sectionPath = `/${section.slug}`
              const activeSection = isWithinSection(section.slug)
              const expanded = openSections.has(section.slug)
              if (section.slug === 'home') {
                const active = isActivePath('/home')
                return (
                  <li key={section.slug} className="rounded-lg border border-transparent hover:border-stone-200">
                    <NavLink
                      to="/home"
                      className={`block rounded-lg px-3 py-2 text-stone-900 hover:bg-stone-50 ${
                        active ? 'font-medium bg-stone-50 text-stone-900' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {section.title}
                    </NavLink>
                  </li>
                )
              }
              return (
                <li key={section.slug} className="rounded-lg border border-transparent hover:border-stone-200">
                  <button
                    onClick={() => toggleSection(section.slug)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-stone-900 hover:bg-stone-50 ${
                      activeSection ? 'bg-stone-50 text-stone-900' : ''}`}
                  >
                    <span className="font-medium">{section.title}</span>
                    <span className="text-sm text-stone-500">{expanded ? '−' : '+'}</span>
                  </button>
                  {expanded && (
                    <ul className="pl-3 mt-1 space-y-1 border-l border-stone-200">
                      <li>
                        {/** Parent page link */}
                        <NavLink
                          to={sectionPath}
                          className={({ isActive }) =>
                            `block rounded-md px-3 py-2 text-sm ${
                              isActive ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-700 hover:bg-stone-50'
                            }`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {section.children.some((c) => ['overzicht', 'overview'].includes(c.slug))
                            ? section.title
                            : locale === 'en'
                              ? 'Overview'
                              : 'Overzicht'}
                        </NavLink>
                      </li>
                      {section.children.map((child) => {
                        const childPath = `/${section.slug}/${child.slug}`
                        const active = isActivePath(childPath)
                        return (
                          <li key={child.slug}>
                            <NavLink
                              to={childPath}
                              className={`block rounded-md px-3 py-2 text-sm ${
                                active ? 'font-medium bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {child.title}
                            </NavLink>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="block px-4 py-3 space-y-2 border-t border-stone-200 md:hidden">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <LocaleToggle locale={locale} onChange={onLocaleChange} />
        </div>
      </aside>
    </>
  )
}

function PageLayout({ sections, locale, onLocaleChange, theme, onThemeChange }) {
  const { sectionSlug, childSlug } = useParams()
  const formatDate = (loc) =>
    new Intl.DateTimeFormat(loc === 'en' ? 'en-GB' : 'nl-NL', { dateStyle: 'long' }).format(new Date())
  const applyStatusDate = (block) => {
    if ((block.heading || '').toLowerCase() !== 'status') return block
    const rest =
      block.items?.filter((item) => {
        const lower = item.toLowerCase()
        return !lower.startsWith('last updated') && !lower.startsWith('laatst bijgewerkt')
      }) || []
    const dateLine = locale === 'en' ? `Last updated: ${formatDate('en')}.` : `Laatst bijgewerkt: ${formatDate('nl')}.`
    return { ...block, items: [dateLine, ...rest] }
  }
  const page = useMemo(() => {
    if (sectionSlug === 'home' || !sectionSlug) {
      const home = sections.find((s) => s.slug === 'home')
      return home
        ? {
            title: 'Home',
            intro:
              locale === 'en'
                ? 'Time Gap Cash Flow is a conceptual and computational framework for analyzing timing gaps between cash inflows and obligations. This site documents the principle systematically without commercial or advisory intent.'
                : 'Time Gap Cash Flow is een conceptueel en rekenkundig raamwerk voor het analyseren van tijdsverschillen tussen kasontvangsten en kasverplichtingen. Deze site documenteert het principe systematisch en zonder commerciële of adviserende intentie.',
            blocks: [
              {
                heading: locale === 'en' ? 'Aim of this documentation' : 'Doel van deze documentatie',
                items: [
                  locale === 'en' ? 'Define the concept unambiguously.' : 'Het concept eenduidig definiëren.',
                  locale === 'en' ? 'Make the computational logic transparent.' : 'De rekenkundige logica transparant maken.',
                  locale === 'en'
                    ? 'Show repeatability and limitations clearly.'
                    : 'Herhaalbaarheid en beperkingen inzichtelijk tonen.',
                  locale === 'en'
                    ? 'No applications, products, or returns are presented.'
                    : 'Er worden geen toepassingen, producten of rendementen gepresenteerd.',
                ],
              },
              {
                heading: locale === 'en' ? 'How to use this documentation' : 'Gebruik van de documentatie',
                body:
                  locale === 'en'
                    ? 'Content is modular; each chapter covers one bounded concept.'
                    : 'De inhoud is modulair opgebouwd; elk hoofdstuk behandelt één afgebakend concept.',
                listTitle: locale === 'en' ? 'Suggested reading order:' : 'Aanbevolen leesvolgorde:',
                items: [
                  locale === 'en' ? 'Orientation — context and scope' : 'Oriëntatie — context en afbakening',
                  locale === 'en' ? 'Foundation — formal definitions' : 'Fundament — formele definities',
                  locale === 'en' ? 'Time & Cashflows — conceptual building blocks' : 'Tijd & Geldstromen — conceptuele bouwstenen',
                  locale === 'en' ? 'Calculation — computational structure' : 'Berekening — rekenkundige structuur',
                  locale === 'en' ? 'Examples — concrete illustrations' : 'Voorbeelden — concrete uitwerking',
                  locale === 'en' ? 'Limitations & Risk — failure mechanisms' : 'Beperkingen & Risico — faalmechanismen',
                  locale === 'en' ? 'Modeling & Interpretation — validation and reading' : 'Modellering & Interpretatie — toetsing en duiding',
                ],
              },
              {
                heading: locale === 'en' ? 'Documentary character' : 'Documentair karakter',
                body:
                  locale === 'en'
                    ? 'This site is documentary. No calls-to-action, no interactive advice, no implicit recommendations. See Reference for background material and downloads.'
                    : 'Deze site is documentair. Geen call-to-actions, geen interactieve adviezen, geen impliciete aanbevelingen. Raadpleeg Referentie voor achtergrondmateriaal en downloads.',
              },
            ],
          }
        : null
    }
    if (sectionSlug === 'orientatie' && !childSlug) {
      return {
        title: locale === 'en' ? 'Orientation' : 'Orientatie',
        intro:
          locale === 'en'
            ? 'This documentation describes the Time Gap Cash Flow concept within a strictly analytical frame. Focus: identifying, formalizing, and testing timing gaps between cash inflows and obligations. No application, advice, or trading guidance is included.'
            : 'Deze documentatie beschrijft het concept Time Gap Cash Flow binnen een strikt analytisch kader. De focus ligt op het identificeren, formaliseren en toetsen van temporele verschillen tussen kasontvangst en kasverplichting. Toepassing, advies of handelswijzen vallen buiten dit document.',
        blocks: [
          {
            heading: locale === 'en' ? 'Scope' : 'Reikwijdte',
            items:
              locale === 'en'
                ? [
                    'Definition and formal delineation of time gaps in cash flows.',
                    'Structural components: inflow, deployment, obligation, reserve.',
                    'Clear computational methods and example calculations.',
                    'Simple validation methods and simulation concepts to illustrate sensitivities.',
                    'Explicit boundary conditions and scenarios where the model is not valid.',
                    'All examples and models are illustrative, not operational instructions.',
                  ]
                : [
                    'De definitie en formele afbakening van time gaps in kasstromen.',
                    'De structurele componenten (ontvangst, inzet, verplichting, reserve).',
                    'Eenduidige rekenmethoden en voorbeeldberekeningen.',
                    'Eenvoudige toetsingsmethoden en simulatieconcepten ter illustratie van gevoeligheden.',
                    'Expliciete randvoorwaarden en scenario’s waarin het model niet valide is.',
                    'Alle voorbeelden en modellen zijn bedoeld ter illustratie en niet als operationele instructies.',
                  ],
          },
          {
            heading: locale === 'en' ? 'Exclusions' : 'Uitsluitingen',
            items:
              locale === 'en'
                ? [
                    'Investment advice, portfolio strategies, or return claims.',
                    'Tax, legal, or accounting interpretations.',
                    'Commercial propositions, product information, or marketing material.',
                    'Implementation guides for business processes or automation.',
                    'Any practical references are illustrative, never normative.',
                  ]
                : [
                    'Investeringsadviezen, portfoliostrategieën of rendementsclaims.',
                    'Fiscale, juridische of boekhoudkundige interpretaties.',
                    'Commerciële proposities, productinformatie of marketingmateriaal.',
                    'Implementatiehandleidingen voor bedrijfsprocessen of automatisering.',
                    'Indien verwijzingen naar praktische toepassingen voorkomen, zijn deze louter illustratief en nooit normatief.',
                  ],
          },
          {
            heading: locale === 'en' ? 'Interpretation limits' : 'Interpretatiebeperkingen',
            items:
              locale === 'en'
                ? [
                    'Models are abstractions: they reduce real-world complexity to show internal consistency.',
                    'Results from examples or simulations are neither predictions nor guarantees.',
                    'Actual use requires additional, case-specific validation (legal, tax, operational).',
                  ]
                : [
                    'De gepresenteerde modellen zijn abstraheringen: ze reduceren real-world complexiteit om interne consistentie te tonen.',
                    'Resultaten uit voorbeelden of simulaties vormen geen voorspelling of garantie.',
                    'Voor daadwerkelijke toepassing is aanvullende, casus-specifieke toetsing vereist (juridisch, fiscaal, operationeel).',
                  ],
          },
          {
            heading: locale === 'en' ? 'Why this delineation' : 'Doel van deze afbakening',
            items:
              locale === 'en'
                ? [
                    'Ensure semantic clarity.',
                    'Separate analytical description from practical application.',
                    'Facilitate replication and testing of computational models.',
                    'Practical application should involve specialist evaluation.',
                  ]
                : [
                    'Semantische helderheid waarborgen.',
                    'Onderscheid maken tussen analytische beschrijving en praktische toepassing.',
                    'Replicatie en toetsing van rekenmodellen faciliteren.',
                    'Wie praktische toepassing nastreeft, wordt geadviseerd aanvullende specialistische evaluatie te raadplegen.',
                  ],
          },
          {
            heading: locale === 'en' ? 'Relation to other parts' : 'Relatie tot andere onderdelen',
            items:
              locale === 'en'
                ? [
                    'Foundation: formal definitions that anchor this scope.',
                    'Calculation: the computational logic within this scope.',
                    'Limitations and Risk: boundary conditions and failure modes affecting feasibility.',
                    'Reference: underlying documents and datasets.',
                  ]
                : [
                    'Fundament bevat de formele definities waarop deze scope rust.',
                    'Berekening presenteert de rekenlogica die binnen deze scope geldt.',
                    'Beperkingen en Risico behandelen de randvoorwaarden en faalmomenten die buiten de scope praktische haalbaarheid beïnvloeden.',
                    'Referentie verzamelt de onderliggende documenten en datasets.',
                  ],
          },
          {
            heading: locale === 'en' ? 'Status' : 'Status',
            items: [
              locale === 'en' ? `Last updated: ${formatDate('en')}.` : `Laatst bijgewerkt: ${formatDate('nl')}.`,
              locale === 'en'
                ? '[Reference → Methodology](/referentie/methodiek)'
                : '[Referentie → Methodiek](/referentie/methodiek)',
            ],
          },
        ],
      }
    }
    const section = sections.find((s) => s.slug === sectionSlug)
    if (!section) return null
    if (!childSlug) {
      const intro =
        section.introEn || section.introNl
          ? locale === 'en'
            ? section.introEn || section.descriptionEn
            : section.introNl || section.descriptionNl
          : locale === 'en'
            ? section.descriptionEn
            : section.descriptionNl
      if (section.blocks) {
        const localizedBlocks = section.blocks[locale === 'en' ? 'en' : 'nl'] || []
        const blocks =
          section.slug === 'fundament'
            ? localizedBlocks.map((b) =>
                b.heading === 'Status' || b.heading === 'Status'
                  ? {
                      ...b,
                      ...applyStatusDate(b),
                      items: [
                        locale === 'en' ? `Last updated: ${formatDate('en')}.` : `Laatst bijgewerkt: ${formatDate('nl')}.`,
                        ...(locale === 'en'
                          ? [
                              '[See also → Overview](/fundament/overzicht)',
                              '[See also → Definition](/fundament/definitie)',
                              '[See also → Delineation](/fundament/afbakening)',
                              '[See also → Requirements](/fundament/vereisten)',
                            ]
                          : [
                              '[Zie ook → Overzicht](/fundament/overzicht)',
                              '[Zie ook → Definitie](/fundament/definitie)',
                              '[Zie ook → Afbakening](/fundament/afbakening)',
                              '[Zie ook → Vereisten](/fundament/vereisten)',
                            ]),
                      ],
                    }
                  : applyStatusDate(b)
              )
            : localizedBlocks.map(applyStatusDate)
        return { title: section.title, intro, blocks }
      }
      const body = locale === 'en' ? `${section.descriptionEn} (overview).` : `${section.descriptionNl} (overzicht).`
      return { title: section.title, intro, body }
    }
    const child = section.children.find((c) => c.slug === childSlug)
    if (!child) return null

    // Use specific blocks if available (new structure)
    if (child.blocks) {
      const rawBlocks = child.blocks[locale === 'en' ? 'en' : 'nl'] || []
      const blocks =
        section.slug === 'fundament' && child.slug === 'overzicht'
          ? rawBlocks.map((b) =>
              (b.heading || '').toLowerCase() === 'status'
                ? {
                    ...b,
                    items: [locale === 'en' ? `Last updated: ${formatDate('en')}.` : `Laatst bijgewerkt: ${formatDate('nl')}.`],
                  }
                : applyStatusDate(b)
            )
          : rawBlocks.map(applyStatusDate)
      const intro =
        (locale === 'en' ? child.introEn : child.introNl) ||
        (locale === 'en' ? section.descriptionEn : section.descriptionNl)
      
      // Add status block if it's a known formal section
      const hasStatusBlock = blocks.some((b) => (b.heading || '').toLowerCase() === 'status')
      if (['tijd', 'fundament', 'orientatie'].includes(section.slug) && !hasStatusBlock) {
        const statusBlock = {
          heading: locale === 'en' ? 'Status' : 'Status',
          items: [
            locale === 'en' ? `Last updated: ${formatDate('en')}.` : `Laatst bijgewerkt: ${formatDate('nl')}.`,
            locale === 'en'
              ? `[${section.title} → Overview](/${section.slug})`
              : `[${section.title} → Overzicht](/${section.slug})`,
          ],
        }
        return { title: `${section.title} · ${child.title}`, intro, blocks: [...blocks, statusBlock] }
      }
      return { title: `${section.title} · ${child.title}`, intro, blocks }
    }
    const body = locale === 'en' ? child.bodyEn : child.bodyNl
    return { title: `${section.title} · ${child.title}`, intro, body }
  }, [sectionSlug, childSlug, sections, locale])

  return (
    <div className={`flex min-h-screen flex-col md:flex-row ${
      theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-[#fdfcfb] text-stone-900'
    }`}>
      <Navigation sections={sections} locale={locale} onLocaleChange={onLocaleChange} theme={theme} onThemeChange={onThemeChange} />
      <main className="overflow-x-hidden flex-1 px-4 py-8 md:px-8 lg:px-12 lg:py-12">
        {page ? (
          <article
            className={`prose max-w-5xl mx-auto ${
              theme === 'dark'
                ? 'prose-invert prose-slate text-slate-100 prose-headings:text-slate-100 prose-strong:text-slate-100 prose-p:text-slate-200 prose-li:text-slate-200 prose-a:text-slate-100'
                : 'prose-stone text-stone-900 prose-headings:text-stone-900 prose-strong:text-stone-900 prose-p:text-stone-700 prose-li:text-stone-800 prose-a:text-stone-900'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 md:text-xs">
              {locale === 'en' ? 'Documentation' : 'Documentatie'}
            </p>
            <h1 className="leading-tight">{page.title}</h1>
            <p className="text-stone-600 dark:text-slate-200">{page.intro}</p>
            {page.blocks ? (
              <div className="space-y-10">
                {page.blocks.map((block, idx) => {
                  const isFundamentOverzicht = sectionSlug === 'fundament' && childSlug === 'overzicht'
                  const isFundamentKern = isFundamentOverzicht && block.heading?.toLowerCase().includes('kerncomponenten')
                  const isFundamentRelaties =
                    isFundamentOverzicht && block.heading?.toLowerCase().includes('relaties en afhankelijkheden')
                  const isFundamentSchema =
                    isFundamentOverzicht && block.heading?.toLowerCase().includes('eenvoudig schematisch overzicht')
                  const isGeldstromenKern =
                    sectionSlug === 'geldstromen' && block.heading?.toLowerCase().includes('kernrelaties')
                  const isRelevantieCriteria =
                    sectionSlug === 'orientatie' &&
                    childSlug === 'relevantie' &&
                    block.heading?.toLowerCase().includes('centrale criteria')
                  const isFundamentVoorbeeld =
                    sectionSlug === 'fundament' &&
                    childSlug === 'definitie' &&
                    block.heading?.toLowerCase().includes('voorbeeldformule')
                  const isNotationBlock =
                    block.heading?.toLowerCase().includes('formele notatie') ||
                    block.heading?.toLowerCase().includes('formal notation')
                  return (
                    <section
                      key={idx}
                      className={`px-5 py-4 space-y-4 rounded-2xl border ring-1 shadow-sm ${
                        theme === 'dark'
                          ? isGeldstromenKern
                            ? 'bg-slate-900/80 border-blue-900 ring-blue-900/70 shadow-blue-900/30'
                            : isRelevantieCriteria
                              ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-900/60 ring-blue-800/60 shadow-blue-900/30'
                              : 'bg-slate-900 border-slate-800 ring-slate-800/80 shadow-black/30'
                          : isGeldstromenKern
                            ? 'bg-gradient-to-br from-white to-blue-50/60 border-blue-100 ring-blue-100/80 shadow-blue-100/40'
                            : isFundamentOverzicht
                              ? 'bg-gradient-to-br from-white to-stone-50/80 border-stone-200 ring-stone-200/80 shadow-stone-100/50'
                              : isRelevantieCriteria
                                ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200 ring-blue-200/80 shadow-blue-100/60'
                                : 'bg-white border-stone-200/80 ring-stone-200/80'
                        }`}
                    >
                      {block.heading && (
                        <h2
                          className={`text-xl font-semibold tracking-tight ${
                            isRelevantieCriteria
                              ? 'text-blue-700 dark:text-blue-200'
                              : ''}`}
                        >
                          {block.heading}
                        </h2>
                      )}
                      {block.body && <p className="leading-relaxed text-stone-700 dark:text-slate-200">{block.body}</p>}
                      {block.pre && (
                        <pre
                          className={`overflow-x-auto px-5 py-4 text-sm rounded-xl ring-1 ${
                            isFundamentSchema || isGeldstromenKern || isFundamentVoorbeeld
                              ? 'bg-gradient-to-br from-stone-50 to-stone-100 ring-stone-200 text-stone-800 dark:from-slate-800 dark:to-slate-900 dark:ring-slate-700 dark:text-slate-50'
                              : 'bg-stone-50 text-stone-800 ring-stone-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700'
                          }`}
                        >
                          <code
                            className={`${
                              isFundamentSchema || isGeldstromenKern || isFundamentVoorbeeld
                                ? 'font-mono text-[13px] leading-relaxed whitespace-pre-wrap block'
                                : ''
                            }`}
                          >
                            {block.pre}
                          </code>
                        </pre>
                      )}
                      {block.listTitle && <p className="text-sm font-semibold text-stone-500 uppercase tracking-[0.2em]">{block.listTitle}</p>}
                      {block.items && (
                        <ul
                          className={`text-stone-800 ${
                            isNotationBlock
                              ? 'grid gap-3 md:grid-cols-2'
                              : isFundamentOverzicht
                                ? `grid ${
                                    isFundamentKern || isFundamentRelaties ? 'gap-1.5 md:gap-2' : 'gap-2 md:gap-3'
                                  } md:grid-cols-2`
                                : isGeldstromenKern
                                  ? 'space-y-1.5'
                                  : 'space-y-2'
                          } dark:text-slate-100`}
                        >
                          {block.items.map((item, i) => {
                            const linkMatch = item.match(/\[(.*?)\]\((.*?)\)/);
                            if (linkMatch) {
                              const [full, text, url] = linkMatch;
                              const rest = item.replace(full, '');
                              return (
                                <li key={i} className="flex gap-2 items-start">
                                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-slate-500" />
                                  <span>
                                    <NavLink to={url} className="font-medium underline text-stone-900 decoration-stone-300 underline-offset-4 hover:decoration-stone-900 dark:text-slate-100">
                                      {text}
                                    </NavLink>
                                    {rest}
                                  </span>
                                </li>
                              );
                            }
                            const html = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          return (
                            <li
                              key={i}
                              className={`flex gap-2 items-start ${
                                isNotationBlock
                                  ? 'px-3 py-2 text-sm font-medium rounded-xl border border-stone-200/80 bg-stone-50/70 dark:border-slate-800 dark:bg-slate-800/50'
                                  : isFundamentOverzicht
                                    ? 'px-3 py-2 rounded-lg border shadow-sm bg-white/60 border-stone-200/60 dark:bg-slate-800/40 dark:border-slate-700/60'
                                    : ''}`}
                            >
                              {isNotationBlock ? (
                                <span className="mt-1 w-1 h-1 bg-blue-400 rounded-full dark:bg-blue-300" />
                              ) : (
                                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-slate-500" />
                              )}
                              <span
                                className={isNotationBlock ? 'font-mono text-[13px] text-stone-800 dark:text-slate-50' : ''}
                                dangerouslySetInnerHTML={{ __html: html }}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </section>
                );
                })}
              </div>
            ) : (
              <p>{page.body}</p>
            )}
          </article>
        ) : (
          <article className={`prose max-w-none ${theme === 'dark' ? 'prose-invert prose-slate' : 'prose-stone'}`}>
            <h1>{locale === 'en' ? 'Not found' : 'Niet gevonden'}</h1>
            <p>{locale === 'en' ? 'The requested page does not exist in this structure.' : 'De opgevraagde pagina bestaat niet in deze structuur.'}</p>
          </article>
        )}
      </main>
    </div>
  )
}

// ---------------- Gemini TGCF Dashboard (calculator overlay) ----------------
const translations = {
  nl: {
    modeBasis: 'BASIS MODUS',
    modeExpert: 'EXPERT MODUS',
    inputHeaderBasis: 'Basis Instellingen',
    inputHeaderExpert: 'Input Matrix',
    inputSubBasis: 'Kernwaarden voor snelle analyse',
    inputSubExpert: 'Volledige parameter set',
    labelCapital: 'Kapitaal',
    labelInflow: 'Inkomende Flow',
    tipCapital: 'Het totale kapitaal (Cin) dat beschikbaar is voor de cyclus.',
    labelMonthlyProfit: 'Winst per maand (p.st.)',
    tipMonthlyProfit: 'De netto opbrengst per eenheid/deelnemer per maand.',
    labelMultiplier: 'Deelnemer Verdubbelaar',
    tipMultiplier: 'Factor (Vd) die het maandrendement vermenigvuldigt (bijv. aantal deelnemers).',
    labelCycleYield: 'Cycle Rendement',
    tipCycleYield: 'Het totale rendement over de hele loopduur (m). Gebruik het slotje voor handmatige input.',
    labelDuration: 'Loopduur',
    tipDuration: 'Het aantal maanden dat het kapitaal wordt ingezet (m).',
    labelTimeGap: 'Betaaltermijn',
    tipTimeGap: 'Aantal dagen tussen de start en de verplichte betaling (T).',
    labelObligation: 'Verplichting',
    tipObligation: 'Het bedrag dat aan het einde van de rit betaald moet worden (O).',
    labelCosts: 'Operationele Kosten',
    tipCosts: 'Vaste kosten (Kop) die van het rendement afgaan.',
    kpiNetProfit: 'Netto Winst',
    subNetProfit: 'Totaal na kosten',
    tipNetProfit: 'Totaal rendement (incl. Vd) minus de operationele kosten.',
    kpiYield: 'Rendement',
    subYield: 'ROI op Kapitaal',
    tipYield: 'Het rendement op het ingezette kapitaal na schaling.',
    kpiBreakEven: 'Break-Even',
    subBreakEven: 'Kosten Gedekt',
    tipBreakEven: 'Dagen tot de operationele kosten (Kop) zijn terugverdiend uit de winst.',
    chartTitle: 'Groeiprognose',
    chartSub: 'Rendementsopbouw inclusief verdubbelaar',
    effTitle: 'Systeem Efficiëntie',
    labelDayYield: 'Dagopbrengst',
    tipDayYield: 'De totale euro-opbrengst per dag (Rem * Vd / 30).',
    labelMarginDays: 'Marge Dagen',
    daysLeft: 'd over',
    annualTitle: 'Jaarprognose',
    tipAnnual: 'Verwacht rendement op jaarbasis (Compounded) bij gelijkblijvende prestaties.',
    costBe: 'Kosten (Kop)',
    unitDays: 'dagen',
    unitMonths: 'mnd',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    cagr: 'CAGR',
  },
  en: {
    modeBasis: 'BASIC MODE',
    modeExpert: 'EXPERT MODE',
    inputHeaderBasis: 'Basic Settings',
    inputHeaderExpert: 'Input Matrix',
    inputSubBasis: 'Key values for quick analysis',
    inputSubExpert: 'Full parameter set',
    labelCapital: 'Capital',
    labelInflow: 'Incoming Flow',
    tipCapital: 'Total capital (Cin) available for the cycle.',
    labelMonthlyProfit: 'Unit Monthly Profit',
    tipMonthlyProfit: 'The net yield per unit/participant per month.',
    labelMultiplier: 'Participant Multiplier',
    tipMultiplier: 'Factor (Vd) that multiplies the monthly yield (e.g., number of participants).',
    labelCycleYield: 'Cycle Yield',
    tipCycleYield: 'Total return over the entire duration (m). Use the lock for manual input.',
    labelDuration: 'Duration',
    tipDuration: 'Number of months the capital is deployed (m).',
    labelTimeGap: 'Payment Term',
    tipTimeGap: 'Days between start and mandatory payment (T).',
    labelObligation: 'Obligation',
    tipObligation: 'The amount that must be paid at the end of the term (O).',
    labelCosts: 'Operational Costs',
    tipCosts: 'Fixed costs (Kop) deducted from yield.',
    kpiNetProfit: 'Net Profit',
    subNetProfit: 'Total after costs',
    tipNetProfit: 'Total yield (incl. Vd) minus operational costs.',
    kpiYield: 'Yield',
    subYield: 'ROI on Capital',
    tipYield: 'Return on the deployed capital after scaling.',
    kpiBreakEven: 'Break-Even',
    subBreakEven: 'Costs Covered',
    tipBreakEven: 'Days until operational costs (Kop) are earned back from profit.',
    chartTitle: 'Growth Forecast',
    chartSub: 'Yield accumulation including multiplier',
    effTitle: 'System Efficiency',
    labelDayYield: 'Daily Income',
    tipDayYield: 'Total euro income per day (Rem * Vd / 30).',
    labelMarginDays: 'Margin Days',
    daysLeft: 'd left',
    annualTitle: 'Annual Forecast',
    tipAnnual: 'Expected annual return (Compounded) at current performance.',
    costBe: 'Costs (Kop)',
    unitDays: 'days',
    unitMonths: 'mo',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    cagr: 'CAGR',
  },
}

const Card = ({ children, className = '', darkMode }) => (
  <div
    className={`backdrop-blur-xl rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-500/10 hover:-translate-y-1 ${
      darkMode ? 'bg-slate-800/50 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-blue-200'
    } ${className}`}
  >
    {children}
  </div>
)

const CardHeader = ({ title, icon: Icon, subtitle, darkMode }) => (
  <div className={`p-6 border-b flex items-center justify-between transition-colors duration-500 ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
    <div className="flex gap-4 items-center group">
      {Icon && (
        <div
          className={`p-2.5 rounded-xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
            darkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'
          }`}
        >
          <Icon size={22} />
        </div>
      )}
      <div>
        <h3 className={`font-bold text-lg tracking-tight transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        {subtitle && (
          <p
            className={`text-xs mt-1 font-medium uppercase tracking-wider transition-colors duration-500 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </div>
)

const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>

const TooltipUI = ({ text, title = 'INFO', darkMode }) => (
  <div className="relative group/tip inline-block ml-1.5 align-middle">
    <div className={`${darkMode ? 'text-slate-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'} cursor-help transition-all transform hover:scale-125`}>
      <Info size={13} />
    </div>
    <div
      className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden group-hover/tip:block w-64 p-4 text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl z-[100] border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
        darkMode ? 'bg-slate-900 text-slate-300 border-white/10' : 'bg-white text-slate-600 border-slate-200'
      }`}
    >
      <div className={`font-bold mb-1 flex items-center gap-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        <Zap size={10} className="text-blue-400 animate-pulse" /> {title}
      </div>
      {text}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] ${
          darkMode ? 'border-t-slate-900' : 'border-t-white'
        }`}
      ></div>
    </div>
  </div>
)

const InputGroup = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  symbol,
  tooltip,
  color = 'blue',
  isLocked = false,
  onLockToggle = null,
  simpleMode = false,
  darkMode,
}) => {
  const accentColor =
    color === 'emerald'
      ? 'accent-emerald-500'
      : color === 'rose'
        ? 'accent-rose-500'
        : color === 'amber'
          ? 'accent-amber-500'
          : 'accent-blue-500'
  const glowClass = isLocked
    ? color === 'emerald'
      ? 'shadow-[0_0_15px_rgba(16,185,129,0.2)] border-emerald-500/50'
      : 'shadow-[0_0_15px_rgba(59,130,246,0.2)] border-blue-500/50'
    : darkMode
      ? 'border-white/5 hover:border-white/20'
      : 'border-slate-100 hover:border-slate-300'

  return (
    <div className={`mb-6 p-4 rounded-xl border transition-all duration-300 group/input ${glowClass} ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-1 items-center">
          <label
            className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors duration-300 ${
              darkMode ? 'text-slate-400 group-hover/input:text-slate-300' : 'text-slate-500 group-hover/input:text-slate-700'
            }`}
          >
            {!simpleMode && symbol && (
              <span
                className={`transition-transform duration-300 group-hover/input:scale-110 ${
                  color === 'emerald'
                    ? 'text-emerald-500'
                    : color === 'rose'
                      ? 'text-rose-500'
                      : color === 'amber'
                        ? 'text-amber-500'
                        : 'text-blue-500'
                }`}
              >
                {symbol}
              </span>
            )}
            <span>{label}</span>
          </label>
          {onLockToggle && (
            <button
              onClick={onLockToggle}
              className={`ml-1.5 p-1 rounded-md transition-all transform hover:scale-110 active:scale-90 ${
                isLocked ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
            </button>
          )}
          {tooltip && <TooltipUI text={tooltip} darkMode={darkMode} />}
        </div>
        <div className="flex gap-1 items-baseline">
          <span
            className={`text-lg font-black tabular-nums transition-all duration-500 group-hover/input:scale-110 ${
              isLocked ? 'text-amber-500' : darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {typeof value === 'number' ? value.toLocaleString('nl-NL') : value}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={onLockToggle && !isLocked}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer transition-all ${accentColor} ${
          darkMode ? 'bg-white/10' : 'bg-slate-200'
        } ${onLockToggle && !isLocked ? 'opacity-20 grayscale' : 'hover:h-2'}`}
      />
    </div>
  )
}

const KPI = ({ label, value, subtext, status = 'neutral', symbol, simpleMode, tooltip, darkMode }) => {
  const styles = darkMode
    ? {
        success: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:border-emerald-500/40',
        warning: 'text-amber-400 border-amber-500/20 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:border-amber-500/40',
        danger: 'text-rose-400 border-rose-500/20 bg-rose-500/5 shadow-[0_0_20px_rgba(244,63,94,0.05)] hover:border-rose-500/40',
        blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:border-blue-500/40',
        neutral: 'text-slate-300 border-white/10 bg-white/5 hover:border-white/30',
      }
    : {
        success: 'text-emerald-600 border-emerald-100 bg-emerald-50 hover:border-emerald-300',
        warning: 'text-amber-600 border-amber-100 bg-amber-50 hover:border-amber-300',
        danger: 'text-rose-600 border-rose-100 bg-rose-50 hover:border-rose-300',
        blue: 'text-blue-600 border-blue-100 bg-blue-50 hover:border-blue-300',
        neutral: 'text-slate-700 border-slate-200 bg-white hover:border-slate-400',
      }

  return (
    <div className={`p-5 rounded-2xl border ${styles[status]} transition-all duration-500 hover:scale-[1.05] hover:shadow-xl group/kpi relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 from-white/10 group-hover/kpi:opacity-100" />
      <div
        className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 transition-all duration-300 group-hover/kpi:translate-x-1 ${
          darkMode ? 'opacity-60' : 'opacity-80'
        }`}
      >
        {!simpleMode && symbol && <span className={`${darkMode ? 'text-white/40' : 'text-slate-400'} italic`}>{symbol}</span>}
        {label}
        {tooltip && <TooltipUI text={tooltip} title="METRIC" darkMode={darkMode} />}
      </div>
      <div className="text-2xl font-black tabular-nums tracking-tight break-words transition-all duration-500 origin-left group-hover/kpi:scale-105">
        {value}
      </div>
      {subtext && (
        <div
          className={`text-[10px] font-medium mt-1 flex items-center gap-1 transition-all duration-300 group-hover/kpi:translate-x-1 ${
            darkMode ? 'opacity-50' : 'opacity-70'
          }`}
        >
          <ChevronRight size={10} className="transition-transform group-hover/kpi:translate-x-1" /> {subtext}
        </div>
      )}
    </div>
  )
}

function TGCDashboard({ overlayTheme }) {
  const [lang, setLang] = useState('nl')
  const [darkMode, setDarkMode] = useState(true)
  const [simpleMode, setSimpleMode] = useState(false)
  const [lockedFields, setLockedFields] = useState({ rc: false })
  const [inputs, setInputs] = useState({
    Cin: 100000,
    T: 30,
    O: 95000,
    Rem: 3000,
    m: 2,
    rc_manual: 0.05,
    Kop: 500,
    B: 5000,
    Vd: 1,
  })

  useEffect(() => {
    setDarkMode(overlayTheme === 'dark')
  }, [overlayTheme])

  const t = translations[lang]

  const calcs = useMemo(() => {
    const { Cin, T, Rem, m, rc_manual, Kop, Vd } = inputs

    let rc
    let baseYieldEuro

    if (lockedFields.rc) {
      rc = rc_manual
      baseYieldEuro = Cin * rc
    } else {
      baseYieldEuro = Rem * m
      rc = Cin > 0 ? baseYieldEuro / Cin : 0
    }

    const scaledYieldEuro = baseYieldEuro * Vd
    const scaledRc = Cin > 0 ? scaledYieldEuro / Cin : 0

    const Pi = scaledYieldEuro - Kop

    const dailyIncome = (Rem * Vd) / 30
    const Tbe = dailyIncome > 0 ? Kop / dailyIncome : 0

    const scaledMonthlyRate = Cin > 0 ? (Rem * Vd) / Cin : 0
    const annualized = Math.pow(1 + scaledMonthlyRate, 12) - 1

    const points = 60
    const timelineDays = 360
    const cycleDays = Math.max(T, m * 30)

    const chartData = Array.from({ length: points + 1 }, (_, i) => {
      const day = Math.round((timelineDays / points) * i)
      const projectedYield = dailyIncome * day

      return {
        day,
        yield: Math.round(projectedYield),
        limit: Kop,
      }
    })

    return { Pi, rc: scaledRc, dailyIncome, Tbe, annualized, chartData, scaledYieldEuro, cycleDays }
  }, [inputs, lockedFields])

  const formatEuro = (v) => {
    const formatter = new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      notation: v > 9999999 ? 'compact' : 'standard',
    })
    return formatter.format(v)
  }

  const formatPct = (v) => (v * 100).toFixed(v * 100 > 1000 ? 0 : 2) + '%'

  return (
    <div
      className={`min-h-screen p-6 lg:p-12 font-sans transition-colors duration-500 selection:bg-blue-500/30 ${
        darkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="overflow-hidden fixed top-0 left-0 z-0 w-full h-full pointer-events-none">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-all duration-1000 animate-pulse ${
            darkMode ? 'bg-blue-600/10' : 'bg-blue-500/5'
          }`}
        ></div>
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-all duration-1000 animate-pulse delay-700 ${
            darkMode ? 'bg-emerald-600/10' : 'bg-emerald-500/5'
          }`}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 justify-between items-start mb-12 md:flex-row md:items-center">
          <div className="cursor-default group">
            <div className="flex gap-3 items-center mb-2 text-blue-500 transition-all duration-500 group-hover:translate-x-2">
              <div className="w-8 h-px transition-all duration-500 bg-blue-500/50 group-hover:w-12"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Engine v5.5 Verified</span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black tracking-tighter transition-all duration-500 group-hover:tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              TIME GAP <span className="inline-block text-blue-500 transition-transform duration-500 group-hover:scale-110">CASHFLOW</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 transform hover:scale-110 active:scale-90 ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10 hover:border-amber-400/50'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm hover:border-blue-400'
              }`}
            >
              {darkMode ? <Sun size={18} className="animate-spin-slow" /> : <Moon size={18} />}
            </button>

            <div
              className={`flex p-1 rounded-xl border backdrop-blur-md transition-colors duration-500 ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white shadow-sm border-slate-200'
              }`}
            >
              <button
                onClick={() => setLang('nl')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all transform hover:scale-105 active:scale-95 ${
                  lang === 'nl'
                    ? darkMode
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-slate-900'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                NL
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all transform hover:scale-105 active:scale-95 ${
                  lang === 'en'
                    ? darkMode
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-slate-900'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setSimpleMode(!simpleMode)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 ${
                simpleMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : darkMode
                    ? 'text-slate-400 hover:text-white bg-white/5 border border-white/10'
                    : 'text-slate-500 hover:text-slate-900 bg-white border border-slate-200 shadow-sm'
              }`}
            >
              <Globe size={14} className={simpleMode ? 'animate-spin-slow' : ''} /> {simpleMode ? t.modeBasis : t.modeExpert}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Card darkMode={darkMode}>
              <CardHeader
                title={simpleMode ? t.inputHeaderBasis : t.inputHeaderExpert}
                subtitle={simpleMode ? t.inputSubBasis : t.inputSubExpert}
                icon={Calculator}
                darkMode={darkMode}
              />
              <CardContent>
                <InputGroup
                  label={simpleMode ? t.labelCapital : t.labelInflow}
                  symbol="Cin"
                  value={inputs.Cin}
                  suffix="EUR"
                  min={1000}
                  max={500000}
                  step={1000}
                  simpleMode={simpleMode}
                  onChange={(v) => setInputs({ ...inputs, Cin: v })}
                  tooltip={t.tipCapital}
                  darkMode={darkMode}
                />

                <div className={`pt-6 border-t my-8 transition-colors duration-500 ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                  <InputGroup
                    label={t.labelMultiplier}
                    color="amber"
                    symbol="Vd"
                    value={inputs.Vd}
                    suffix="X"
                    min={1}
                    max={1000}
                    step={1}
                    simpleMode={simpleMode}
                    onChange={(v) => setInputs({ ...inputs, Vd: v })}
                    tooltip={t.tipMultiplier}
                    darkMode={darkMode}
                  />

                  <InputGroup
                    label={t.labelMonthlyProfit}
                    color="emerald"
                    symbol="Rem"
                    value={inputs.Rem}
                    suffix="EUR"
                    min={0}
                    max={10000}
                    step={100}
                    isLocked={!lockedFields.rc}
                    simpleMode={simpleMode}
                    onChange={(v) => setInputs({ ...inputs, Rem: v })}
                    tooltip={t.tipMonthlyProfit}
                    darkMode={darkMode}
                  />

                  {!simpleMode && (
                    <InputGroup
                      label={t.labelCycleYield}
                      color="emerald"
                      symbol="rc"
                      value={lockedFields.rc ? inputs.rc_manual * 100 : calcs.rc * 100}
                      suffix="%"
                      min={0}
                      max={1000}
                      step={1}
                      isLocked={lockedFields.rc}
                      onLockToggle={() => setLockedFields({ ...lockedFields, rc: !lockedFields.rc })}
                      onChange={(v) => setInputs({ ...inputs, rc_manual: v / 100 })}
                      tooltip={t.tipCycleYield}
                      darkMode={darkMode}
                    />
                  )}

                  <InputGroup
                    label={t.labelDuration}
                    color="emerald"
                    symbol="m"
                    value={inputs.m}
                    suffix="MND"
                    min={1}
                    max={12}
                    step={1}
                    simpleMode={simpleMode}
                    onChange={(v) => setInputs({ ...inputs, m: v })}
                    tooltip={t.tipDuration}
                    darkMode={darkMode}
                  />
                </div>

                <InputGroup
                  label={t.labelCosts}
                  color="rose"
                  symbol="Kop"
                  value={inputs.Kop}
                  suffix="EUR"
                  min={0}
                  max={25000}
                  step={50}
                  simpleMode={simpleMode}
                  onChange={(v) => setInputs({ ...inputs, Kop: v })}
                  tooltip={t.tipCosts}
                  darkMode={darkMode}
                />

                <InputGroup
                  label={t.labelTimeGap}
                  symbol="T"
                  value={inputs.T}
                  suffix="DAGEN"
                  min={1}
                  max={120}
                  step={1}
                  simpleMode={simpleMode}
                  onChange={(v) => setInputs({ ...inputs, T: v })}
                  tooltip={t.tipTimeGap}
                  darkMode={darkMode}
                />

                {!simpleMode && (
                  <InputGroup
                    label={t.labelObligation}
                    symbol="O"
                    value={inputs.O}
                    suffix="EUR"
                    min={0}
                    max={inputs.Cin * 5}
                    step={1000}
                    onChange={(v) => setInputs({ ...inputs, O: v })}
                    tooltip={t.tipObligation}
                    darkMode={darkMode}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <KPI
                label={t.kpiNetProfit}
                value={formatEuro(calcs.Pi)}
                status={calcs.Pi >= 0 ? 'success' : 'danger'}
                subtext={t.subNetProfit}
                tooltip={t.tipNetProfit}
                darkMode={darkMode}
              />
              <KPI
                label={t.kpiYield}
                value={formatPct(calcs.rc)}
                status="blue"
                subtext={t.subYield}
                tooltip={t.tipYield}
                darkMode={darkMode}
              />
              <KPI
                label={t.kpiBreakEven}
                value={calcs.Tbe > 365 ? '∞' : `${calcs.Tbe.toFixed(1)} d`}
                status="warning"
                subtext={t.subBreakEven}
                tooltip={t.tipBreakEven}
                darkMode={darkMode}
              />
            </div>

            <Card darkMode={darkMode} className={darkMode ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80' : 'bg-white shadow-xl'}>
              <CardHeader title={t.chartTitle} subtitle={t.chartSub} icon={Users} darkMode={darkMode} />
              <CardContent className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calcs.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
                    <defs>
                      <linearGradient id="glowYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={darkMode ? '#10b981' : '#059669'} stopOpacity={darkMode ? 0.4 : 0.2} />
                        <stop offset="95%" stopColor={darkMode ? '#10b981' : '#059669'} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis
                      dataKey="day"
                      stroke={darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)'}
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      ticks={[0, 60, 120, 180, 240, 300, 360]}
                      tickFormatter={(v) => t.monthNames[Math.floor(v / 30)] || t.monthNames[11]}
                    />
                    <YAxis
                      stroke={darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)'}
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => (v > 999999 ? `${(v / 1000000).toFixed(1)}M` : `€${v}`)}
                    />
                    <RechartsTooltip
                      cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                      contentStyle={{
                        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                        borderRadius: '16px',
                        border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                      }}
                      itemStyle={{ color: darkMode ? '#10b981' : '#059669', fontWeight: 'bold' }}
                      labelFormatter={(v) => `${v} ${t.unitDays}`}
                      formatter={(v) => formatEuro(v)}
                    />
                    <ReferenceLine
                      x={calcs.cycleDays}
                      stroke="#3b82f6"
                      strokeWidth={1}
                      label={{ position: 'top', value: 'Cycle', fill: '#3b82f6', fontSize: 9, fontWeight: 'bold' }}
                      opacity={0.4}
                    />
                    <ReferenceLine
                      y={inputs.Kop}
                      label={{ position: 'right', value: t.costBe, fill: '#f43f5e', fontSize: 10, fontWeight: 'bold' }}
                      stroke="#f43f5e"
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      opacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="yield"
                      stroke={darkMode ? '#10b981' : '#059669'}
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#glowYield)"
                      animationDuration={1500}
                      isAnimationActive
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card darkMode={darkMode}>
                <CardHeader title={t.effTitle} icon={Activity} darkMode={darkMode} />
                <CardContent className="space-y-6 group/eff">
                  <div className="flex justify-between items-end">
                    <div className="transition-transform duration-500 group-hover/eff:translate-x-1">
                      <div className={`text-[10px] font-black uppercase mb-1 flex items-center gap-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {t.labelDayYield} <TooltipUI text={t.tipDayYield} darkMode={darkMode} />
                      </div>
                      <div className={`text-2xl font-black transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {formatEuro(calcs.dailyIncome)}
                      </div>
                    </div>
                    <div className="text-right transition-transform duration-500 group-hover/eff:-translate-x-1">
                      <div className={`text-[10px] font-black uppercase mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.labelMarginDays}</div>
                      <div className={`text-sm font-bold ${inputs.T - calcs.Tbe > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {(inputs.T - calcs.Tbe).toFixed(1)} {t.daysLeft}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`relative h-3 rounded-full overflow-hidden border transition-all duration-500 group-hover/eff:scale-y-125 group-hover/eff:shadow-inner ${
                      darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 group-hover/eff:brightness-110"
                      style={{ width: `${Math.min(100, (calcs.Tbe / inputs.T) * 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card darkMode={darkMode}>
                <CardHeader title={t.annualTitle} icon={Globe} darkMode={darkMode} />
                <CardContent className="space-y-6 group/ann">
                  <div className="flex justify-between items-end">
                    <div className="transition-transform duration-500 group-hover/ann:translate-x-1">
                      <div className={`text-[10px] font-black uppercase mb-1 flex items-center gap-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {t.cagr} <TooltipUI text={t.tipAnnual} darkMode={darkMode} />
                      </div>
                      <div className={`text-2xl font-black transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {calcs.annualized > 1000 ? '>9999%' : (calcs.annualized * 100).toFixed(0) + '%'}
                      </div>
                    </div>
                    <div className="text-right transition-transform duration-500 group-hover/ann:-translate-x-1">
                      <div className={`text-[10px] font-black uppercase mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.labelMultiplier}</div>
                      <div className="font-mono text-sm font-bold text-amber-500">x {inputs.Vd}</div>
                    </div>
                  </div>
                  <div
                    className={`relative h-3 rounded-full overflow-hidden border transition-all duration-500 group-hover/ann:scale-y-125 group-hover/ann:shadow-inner ${
                      darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000 group-hover/ann:brightness-110"
                      style={{ width: `${Math.min(100, (Math.log10(inputs.Vd) / 3) * 100 + 10)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          border: 2px solid white;
        }
        input[type=range]:hover::-webkit-slider-thumb {
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </div>
  )
}

function CalculatorOverlay({ onClose, theme }) {
  return (
    <div className="flex overflow-y-auto fixed inset-0 z-50 justify-center items-start backdrop-blur-sm bg-black/50">
      <div className="relative mx-4 my-6 w-full max-w-6xl">
        <div className="flex justify-end mb-3">
          <button
            onClick={onClose}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full border shadow border-stone-300 bg-white/80 hover:bg-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            Exit
          </button>
        </div>
        <div className="overflow-hidden rounded-3xl ring-1 shadow-2xl ring-black/10">
          <TGCDashboard overlayTheme={theme} />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const firstSection = navStructure[0]
  const [locale, setLocale] = useState('nl')
  const [theme, setTheme] = useState('light')
  const [showCalculator, setShowCalculator] = useState(false)
  return (
    <BrowserRouter>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<PageLayout sections={navStructure} locale={locale} onLocaleChange={setLocale} theme={theme} onThemeChange={setTheme} />}
          />
          <Route
            path="/:sectionSlug"
            element={<PageLayout sections={navStructure} locale={locale} onLocaleChange={setLocale} theme={theme} onThemeChange={setTheme} />}
          />
          <Route
            path="/:sectionSlug/:childSlug"
            element={
              <PageLayout sections={navStructure} locale={locale} onLocaleChange={setLocale} theme={theme} onThemeChange={setTheme} />
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <button
          onClick={() => setShowCalculator(true)}
          className="inline-flex fixed right-4 bottom-4 gap-2 items-center px-4 py-3 text-sm font-semibold text-white rounded-full ring-1 shadow-lg bg-stone-900 ring-stone-800 hover:bg-stone-800 dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-200 dark:hover:bg-white"
        >
          Rekenmachine
        </button>
        {showCalculator && <CalculatorOverlay onClose={() => setShowCalculator(false)} theme={theme} />}
      </div>
    </BrowserRouter>
  )
}
