#!/bin/bash

# ═══════════════════════════════════════════════════
#   THE TRADING DOJO — Engine Injection Script
#   Run this from inside your trading-dojo repo folder
#   It adds dojo-engine.js to all 7 module pages
# ═══════════════════════════════════════════════════

REPO_DIR="/Users/jc/Desktop/trading-dojo/trading-dojo"
ENGINE_TAG='<script src="dojo-engine.js"></script>'

FILES=(
  "instruments.html"
  "styles.html"
  "platforms.html"
  "charts-module.html"
  "risk-module.html"
  "dna-quiz.html"
  "simulator.html"
)

echo ""
echo "⚔  DOJO ENGINE — Injection Script"
echo "═══════════════════════════════════"
echo ""

cd "$REPO_DIR" || { echo "❌ Could not find repo at $REPO_DIR"; exit 1; }

for FILE in "${FILES[@]}"; do
  if [ ! -f "$FILE" ]; then
    echo "⚠️  Skipping $FILE — not found"
    continue
  fi

  # Check if already injected
  if grep -q "dojo-engine.js" "$FILE"; then
    echo "✓  $FILE — already has engine, skipping"
    continue
  fi

  # Inject before </body>
  sed -i '' 's|</body>|<script src="dojo-engine.js"></script>\n</body>|' "$FILE"
  echo "✅  $FILE — engine injected"
done

echo ""
echo "🔧 Committing and pushing..."
git add .
git commit -m "inject dojo engine into all module pages"
git push

echo ""
echo "⚔  Done. Dojo Engine is live on all modules."
echo ""
