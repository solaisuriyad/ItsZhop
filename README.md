# ItsZhop — E-Commerce Website

Handmade Shopping Bags, Women's Handbags, Crochet & Homemade Pickles.

## Features
- **Shop name:** ItsZhop (header, footer, title)
- **Prices in Indian Rupees (₹)** — all products show ₹ with Indian formatting
- **Slightly golden background** — warm cream/gold gradient `#FFFBEB` / `#FFF8DC` with gold accents `#C19A2E`
- **Scrolling banner** — auto-rotating hero slider (4s interval) showcasing:
  1. Shopping Bags & Women's Handbags
  2. Crochet Creations
  3. Homemade Pickles (Lemon, Mango, Veldt Grape/Pirandai, Tomato)
- **Products for sale:** Shopping Bags, Women's Handbags, Crochet (bags, coasters), Lemon Pickle, Mango Pickle, Veldt Grape Pickle, Tomato Pickle + combo
- **Logo:** `assets/logo.png` is displayed **exactly as-is** with no CSS filters, no cropping — just contained display. Replace that file with your uploaded `logo.png` to see your exact logo.

## Run locally
No build needed — static site.
```bash
# preview
python3 -m http.server 8000
# or
npx serve .
```

Open `index.html` directly in browser.

## Replace logo with your exact upload
1. Place your file at `ItsZhop/assets/logo.png` (overwrite)
2. The site uses `<img src="assets/logo.png">` with no alteration — your logo appears unchanged.

## Structure
```
ItsZhop/
  index.html
  css/styles.css
  js/app.js
  assets/
    logo.png
    banner1.jpg (bags)
    banner2.jpg (crochet)
    banner3.jpg (pickles)
    prod-*.jpg
```

Prices: ₹149 – ₹899. COD & Free shipping over ₹499.

© 2026 ItsZhop — Made with 💛 in India
