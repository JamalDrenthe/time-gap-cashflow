# Documenten

**Doel**  
Beschrijf en centraliseer de kernbestanden die reproduceerbaarheid mogelijk maken: whitepapers, rekenbladen, notebooks, dataschema's en changelogs.

---

## Beschikbare artefacten (standaard set)

- `whitepaper-core.pdf` — theoretische achtergrond, hypothesen en kernformules; citeerbaar, lees eerst.  
- `examples.xlsx` / `examples.csv` — ingevulde voorbeelden (Enkelvoudig, Herhaald, Cumulatief) met formules; te importeren.  
- `mc_notebook.ipynb` — Monte Carlo referentie-implementatie (configurable); runnable, vereist Python env.  
- `dataschema.csv` — kolom → symbool → type → voorbeeld → toelichting; importeer in ETL.  
- `config.example.json` — template voor modelconfig (constants, seed); kopieer en vul per project.  
- `changelog.md` — versiebeheer van content, modellen en constants; altijd raadplegen voor reproducibility.  
- `license.txt` — gebruiksvoorwaarden/licentie; vereist bij distributie.

---

## Download & gebruik

- Bestanden staan per versie in `/downloads/{version}/`.  
- Raadpleeg het bijbehorende `changelog.md` om te matchen met pagina's/versies.  
- Notebooks bevatten `requirements.txt` en `README.md` met run-instructies.

---

## Aanbeveling voor publicatie

- Publiceer altijd de versie-tag en `config.json` samen met resultaten.  
- Voor reproducibility: bundel `data/raw/` (geanonimiseerd waar nodig), `config.json`, `seed` en notebook/script in een run-folder.

_Last updated: [datum invullen]._
