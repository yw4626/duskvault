# Duskvault

A five-floor, first-person card dungeon with Gothic pixel art, an interactive tutorial, and turn-based combat. Created by Yibo Wang for a game development midterm, with AI-assisted implementation and generated artwork.

This standalone player edition contains the game source and local assets. It reconstructs selected mechanics from Vampire Crawlers and adds an original campaign, boss mechanics, tutorial, and in-run economy. It is an educational adaptation, not an official release of that game.

## Play locally

1. Download this repository using **Code → Download ZIP** and extract it, or clone it.
2. Install Node.js 24 or newer.
3. Open a terminal in the extracted folder and run:

```sh
npm start
```

Open the local URL printed by the server (normally `http://127.0.0.1:8787/`). On Windows, you can instead double-click `PLAY_GAME.cmd` after installing Node.js. Keep the terminal open while playing; press Ctrl+C to stop the server.

No npm dependencies, account, API key, or internet connection are needed to play after downloading the files and installing Node.js. The server listens only on your computer. You can also open `dist/index.html` directly; the local server is recommended for a consistent save location.

## Controls and progression

- **W / S:** move forward / backward. **A / D:** sidestep. **Q / E:** turn. The six on-screen direction buttons also work.
- Walk into objects to interact. After breaking a chest, move forward again to collect its contents.
- Click a card or drag it into battle. Target selection is automatic. Play increasing mana costs to build combos; wild cards can continue a combo.
- Gain XP, choose cards on level-up, buy cards and sockets, socket gems, and combine matching evolution ingredients after guardian battles.
- Complete the tutorial, explore five floors, and defeat the final vampire to win.

English is the default; Chinese is available in the language selector. Progress is stored in your browser. Use the same browser and local URL to continue. Clearing browser data, private browsing, or changing ports may make a save unavailable. A new run replaces the previous run.

## Demo and project scope

[Watch the gameplay and AI evaluation video](https://www.youtube.com/watch?v=cL9eMQMFs3M).

The recorded AI viewer is hidden in this player edition because experimental traces are not bundled. The course submission retains the agent players, evaluation reports, and frozen experiments. This repository contains no model credentials, original commercial executable, or video binary.

The runtime JavaScript in `dist/` is editable source; no build step is required. `SOURCE.json` records the source revision and distribution hashes. Gameplay rules are unchanged from that revision; only the standalone entry styling, launcher, and distribution documentation differ.

## Checks

```sh
npm test
```

These deterministic tests cover tutorial progression and boss mechanics. They are a subset of the course project's full suite and make no model API calls.

## Credits and reuse

See [asset credits](THIRD_PARTY_ASSETS.md) and the bundled notices in `dist/assets/licenses/`, `dist/assets/pixelfx/`, and `dist/assets/audio/`. The asset credits preserve the full project's provenance; references to `art-sources/`, `scripts/`, or `vendor/` describe development archives that are not included here. Current runtime manifests remain bundled.

Rules were investigated using reverse-engineering tools and configuration analysis. Runtime artwork consists of project-generated or independently authored art and credited third-party resources, rather than extracted artwork from the original commercial game. Third-party licenses apply to their respective resources. No blanket open-source license is granted to the entire project by this distribution.

## Feedback

When reporting a problem, include your browser, character, floor, map seed if available, steps to reproduce, and a screenshot. Feedback on unclear card effects, tutorial steps, and interface layout is welcome.
