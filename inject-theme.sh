#!/bin/bash

# ═══════════════════════════════════════════════════
#   THE TRADING DOJO — Theme CSS Injection Script
#   Run from inside your trading-dojo repo folder
#   Injects dojo-theme.css into all pages
# ═══════════════════════════════════════════════════

REPO_DIR="/Users/jc/Desktop/trading-dojo/trading-dojo"
THEME_TAG='<link rel="stylesheet" href="dojo-theme.css"/>'

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

echo ""
echo "🎨  DOJO THEME — Injection Script"
echo "════════════════════════════════════"
echo ""

cd "$REPO_DIR" || { echo "❌ Could not find repo at $REPO_DIR"; exit 1; }

for FILE in "${FILES[@]}"; do
  if [ ! -f "$FILE" ]; then
    echo "⚠️  Skipping $FILE — not found"
    continue
  fi

  # Check if already injected
  if grep -q "dojo-theme.css" "$FILE"; then
    echo "✓  $FILE — already has theme, skipping"
    continue
  fi

  # Inject before </head>
  sed -i '' 's|</head>|<link rel="stylesheet" href="dojo-theme.css"/>\n</head>|' "$FILE"
  echo "✅  $FILE — theme injected"
done

echo ""
echo "🔧 Committing and pushing..."
git add .
git commit -m "add light/dark mode theme system"
git push

echo ""
echo "🎨  Done. Light/Dark mode is live on all pages."
echo "    Toggle with the ☀️/🌙 button in every topbar."
echo ""
