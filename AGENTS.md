# Agent Guide - DavidRubioMoreno.github.io

This repository is a lightweight, pure vanilla HTML/CSS/JS static portfolio website.

## Tech Stack & Architecture

- **No Frameworks/Bundlers**: No Node.js package manager, no webpack/vite, no transpilers, and no build or test scripts.
- **Core Entrypoint**: `index.html` containing the entire layout and all CSS (embedded in a `<style>` tag in the header).
- **Scripts**: 
  - `scripts/carousel.js`: Controls the interactive skills carousel. Handles mouse/touch drag events, physics inertia, and distance-based scaling/opacity effects.
  - `scripts/project-videos.js`: Plays/pauses `.project-video` elements when a `.project-card` is hovered or focused.
- **Assets**: 
  - Icons reside in `assets/icons/` (WebP and PNG formats).
  - Videos reside in `assets/videos/` (MP4 format).

## Development & Verification

- **How to run**: Simply open `index.html` directly in a browser, or run a lightweight local server (e.g., `python -m http.server 8000` or `npx serve`).
- **No Test Suite**: Code quality must be verified manually in a browser by validating visual rendering and interaction responsiveness.

## Key Design & Code Conventions

- **Design Tokens**: Modify color palette or layout spacing using the CSS variables declared under `:root` in `index.html`.
- **Vanilla JS Only**: Avoid adding module imports or modern browser features that lack wide compatibility without polyfills, as there is no compilation step.
- **Asset Formats**: Prefer WebP for images/icons where possible to ensure fast loading times on GitHub Pages.
