# Math Crossword

Endless math crossword. Fill the blanks so all 6 equations (3 rows, 3 columns) are true.

## GitHub Pages
1. Create a repo and upload everything in this folder (index.html at the root).
2. Settings > Pages > Source: Deploy from a branch > main / (root).
3. Open https://USERNAME.github.io/REPO/

Local test: `python3 -m http.server` then open http://localhost:8000 (ES modules need http, not file://).

## Folders
- `js/engine`  generator (always solvable), validator, operators
- `js/ai`      difficulty tracker (rating from time, hints, mistakes)
- `js/core`    state, storage, timer, game flow, router
- `js/ui`      grid, numpad, hud, modals, settings
- `js/audio`   sound player
- `assets`     SVG icon sprite, sounds
