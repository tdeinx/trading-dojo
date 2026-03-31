#!/bin/bash

# ═══════════════════════════════════════════════════
#   THE TRADING DOJO — PWA Injection Script
#   Run from inside your trading-dojo repo folder
#   Adds PWA support to all pages
# ═══════════════════════════════════════════════════

REPO_DIR="/Users/jc/Desktop/trading-dojo/trading-dojo"

FILES=(
  "index.html"
  "instruments.html"
  "styles.html"
  "platforms.html"
  "charts-module.html"
  "risk-module.html"
  "dna-quiz.html"
  "simulator.html"
  "sim-entry.html"
)

# PWA meta tags + manifest link to inject into <head>
PWA_HEAD='<link rel="manifest" href="/manifest.json"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/><meta name="apple-mobile-web-app-title" content="Trading Dojo"/><meta name="theme-color" content="#C9A84C"/><link rel="apple-touch-icon" href="/icons/icon-192.png"/>'

# Service worker registration to inject before </body>
SW_SCRIPT='<script>if("serviceWorker" in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("SW registered")).catch(e=>console.log("SW failed",e));});}</script>'

echo ""
echo "📱  TRADING DOJO PWA — Injection Script"
echo "══════════════════════════════════════════"
echo ""

cd "$REPO_DIR" || { echo "❌ Could not find repo at $REPO_DIR"; exit 1; }

for FILE in "${FILES[@]}"; do
  if [ ! -f "$FILE" ]; then
    echo "⚠️  Skipping $FILE — not found"
    continue
  fi

  # Check if already has manifest
  if grep -q "manifest.json" "$FILE"; then
    echo "✓  $FILE — already has PWA, skipping"
    continue
  fi

  # Inject manifest + meta tags before </head>
  sed -i '' "s|</head>|${PWA_HEAD}\n</head>|" "$FILE"

  # Inject service worker registration before </body>
  sed -i '' "s|</body>|${SW_SCRIPT}\n</body>|" "$FILE"

  echo "✅  $FILE — PWA injected"
done

echo ""
echo "🔧 Committing and pushing..."
git add .
git commit -m "add PWA support — installable on iOS and Android"
git push

echo ""
echo "📱  Done! The Trading Dojo is now a PWA."
echo "    Users can install it from their browser:"
echo "    iOS: Share → Add to Home Screen"
echo "    Android: Menu → Add to Home Screen / Install App"
echo ""
