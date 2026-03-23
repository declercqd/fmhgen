# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FMH Générateur** is a static web application for France Masters Hockey that generates branded player and team cards as 1080×1080 PNG files. No build system, no package manager, no framework — pure HTML5 + CSS3 + Vanilla JS.

## Running the Project

Open `index.html` directly in a modern browser — no server required. The app has two tools:
- `FMH_PlayerCard_Template.html` — individual player cards
- `FMH_GroupCard_Template.html` — group/team grid cards (1, 2, 3, or 6 players)

## Architecture

### File Structure
- `index.html` — landing page linking to both tools
- `FMH_PlayerCard_Template.html` — single-player card generator
- `FMH_GroupCard_Template.html` — multi-player card generator
- `FMH_Joueurs_Modele.csv` — sample CSV for testing imports

### PNG Export Pipeline (both templates)
Card export uses a two-layer canvas composition:
1. **html2canvas** (v1.4.1, bundled inline, minified) renders the DOM — overlays, gradients, text, logos
2. A native Canvas 2D context composites the player photo(s) underneath using `drawImage()` with manual `object-fit: cover` math
3. The layers are merged and exported via `canvas.toDataURL('image/png')`

Photos are stored as Data URL strings (from FileReader) to survive the canvas export step reliably.

### CSV Format
Semicolon-delimited (`prénom;nom;numéro;poste;Catégorie`). The parser skips header rows by looking for those field names before entering data rows.

### Theme System
Both templates define a `THEMES` object with named color schemes (Player: blue/red/white; Group: dark/blue/red). `setTheme()` injects CSS variables via a `<style>` tag and regenerates card frames.

### Responsive Scaling
`scaleCard()` runs on `window.resize` and calculates a CSS `scale()` transform to fit the 1080×1080 card preview within the viewport.

## Key Functions

**Player card** (`FMH_PlayerCard_Template.html`):
- `loadCSV()` — parse uploaded CSV, populate squad dropdown
- `fillPlayer()` — auto-fill form from selected CSV row
- `syncCard()` — update live preview (also auto-scales last name font size by character count)
- `loadPhoto()` — FileReader → Data URL, cached in `_photoDataUrl`
- `downloadCard()` — clone DOM, hide photo element, run html2canvas, composite photo, export PNG

**Group card** (`FMH_GroupCard_Template.html`):
- `buildCardFrames()` — rebuild grid DOM when layout or theme changes
- `quickFill()` — populate next empty slot from squad dropdown, auto-advance selector
- `updatePlayer()` — update a single player slot in the grid
- `downloadCard()` — load all cached photos as Image objects, run html2canvas, composite all photos per slot, export PNG
