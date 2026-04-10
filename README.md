# 🎾 RacketAI — Trova la Racchetta da Padel Perfetta

**[→ Apri l'app](https://stinkipadel.github.io/)** · Brand: **Stinki Padel**

Un quiz gratuito che analizza il tuo stile di gioco e ti raccomanda la racchetta da padel ideale tra **452 modelli** di 24 brand.

---

## ✨ Funzionalità

- **Quiz personalizzato** — 6 schermate, ~90 secondi, nessuna registrazione
- **452 racchette** nel database — 231 modelli del 2026, aggiornato continuamente
- **Algoritmo scoring v2.2** — 11 criteri pesati: livello, stile, forma, sensazione, fisico, genere e altro
- **Confronto racchette** — affianca fino a 2 racchette con barre metriche
- **Racchetta del partner** — suggerisce la racchetta complementare alla tua
- **Catalogo completo** — filtra per brand, livello, forma, anno, prezzo
- **Dark mode** — tema chiaro/scuro automatico
- **Wishlist** — salva le racchette preferite in localStorage
- **Condivisione WhatsApp** — invia i tuoi risultati
- **SEO ottimizzato** — meta tag, Open Graph, Schema.org

---

## 🏷️ Brand coperti (24)

Adidas · Babolat · Bullpadel · Drop Shot · Dunlop · Head · Joma · Kombat · Kuikma · LOK · Munich · Nox · Osaka · Oxdog · Platinum · Puma · Royal Padel · Siux · Starvie · Stiga · Varlion · Vibor-A · VirtuFit · Wilson

---

## 🧠 Algoritmo di Scoring

L'algoritmo `scoreRacket()` valuta ogni racchetta su **111 punti totali** usando questi criteri:

| Peso | Criterio |
|------|----------|
| 28 | Livello (principiante / intermedio / avanzato) |
| 24 | Stile × Forma × Bilanciamento (aggressivo/difensivo/bilanciato + diamond/round/teardrop) |
| 12 | Sensazione (tocco hard/soft/balanced → potenza/comfort/equilibrio) |
| 8 | Lato di gioco (sinistro/destro) |
| 8 | Fisico + ore di gioco (problemi gomito/spalla/polso, intensità) |
| 6 | Genere |
| 6 | Overall quality (non-lineare: 8.5+ vale 6pt) |
| 5 | Build corporatura + peso racchetta |
| 5 | Maneggevolezza |
| 4 | Spin (critico per sinistro+rete) |
| 3+2 | Preferenza anno |

Il punteggio finale usa una **normalizzazione non-lineare** (punteggi >70% scalati ×1.5) per portare i match perfetti a ~99%.

---

## 🗂️ Struttura del File

L'app è un **singolo file HTML** (`index.html`, ~900KB):

```
index.html
├── CSS (variabili, layout, componenti, dark mode)
├── HTML (schermate quiz, risultati, catalogo, confronto, partner)
└── JavaScript
    ├── var RACKET_SCORES   — metriche tecniche di ogni racchetta
    ├── var BUY_LINKS       — link Amazon + prezzi aggiornati
    ├── var RACKET_DB       — array ordinato per rendering
    ├── scoreRacket()       — algoritmo di matching
    ├── computeMatches()    — filtra + ordina per profilo utente
    ├── renderResults()     — visualizza top 10 raccomandazioni
    ├── renderDB()          — catalogo con filtri
    ├── pfCompute()         — calcola racchetta partner
    ├── getSimilarRackets() — racchette simili (distanza euclidea)
    └── runAIAnalysis()     — genera spiegazioni personalizzate
```

---

## 🔧 Sviluppo

### Prerequisiti
Nessuno — è un file HTML statico. Apri direttamente nel browser o servi con qualsiasi server HTTP.

### Test locale
```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

### Deploy
Copia `index.html` nella root del repository GitHub Pages. Il sito è live su `stinkipadel.github.io`.

### Validazione JS
```bash
node --check index.html  # (estrae lo script principale)
```

---

## 📊 Stato Database (Aprile 2026)

| Brand | Modelli 2026 |
|-------|-------------|
| Bullpadel | 34 |
| Siux | 28 |
| Adidas | 28 |
| Nox | 21 |
| Babolat | 16 |
| Head | 17 |
| Drop Shot | 17 |
| LOK | 13 |
| Starvie | 10 |
| Joma | 10 |
| Wilson | 9 |
| Oxdog | 9 |
| Royal Padel | 8 |
| Vibor-A | 7 |
| Dunlop | 4 |

---

## 💰 Monetizzazione

Link affiliati **Amazon Italia** (`tag=stinkipadel-21`) su ogni racchetta. Nessun paywall, nessun costo per l'utente.

---

## 📈 Analytics

Google Analytics 4 (`G-1XXCNH0VDM`) con eventi custom:
- `click_buy` — clic su link Amazon
- `share` — condivisione WhatsApp
- `quiz_complete` — completamento quiz

---

## 🛠️ Changelog recente

### v3.22 (Aprile 2026)
- Algoritmo scoring v2.2: 6 bug fix + 9 miglioramenti
- Fix balance `alto/basso/medio` non riconosciuti
- Fix sensation `hard/soft/balanced` ignorata
- effectiveStyle: zone+smash_pct rafforzano stile dichiarato
- Normalizzazione score non-lineare (match perfetto → 99%)
- Fix confronto: punteggi ora sempre visibili (var `--text`)
- +4 Dunlop FX 2026, +8 Royal Padel 2026, +4 Dunlop FX 2026
- Fix duplicati (5 rimossi), fix dati Lebrón/Starvie/Babolat

### v3.15 (Marzo 2026)
- Algoritmo rule-based istantaneo (no API)
- Badge anno 2026/2025 nei risultati
- WhatsApp share, profilo guest, badge preferiti
- Trust badges home, loading animata

---

## 📝 Licenza

Progetto personale — **Stinki Padel**. Tutti i dati sui prodotti sono pubblicamente disponibili; i link Amazon sono affiliati.
