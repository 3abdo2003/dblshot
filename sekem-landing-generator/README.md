# Sekem Landing Page Generator

A simple, clean, and maintainable React app for generating campaign landing pages with live preview and export functionality.

---

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Code Structure & Approach](#code-structure--approach)
- [Customization & Extending](#customization--extending)
- [Troubleshooting](#troubleshooting)

---

## Features
- Live preview of landing page as you edit campaign details
- Two templates: Minimal and Elegant
- Customizable theme color, title, image, CTA, and description
- Export your landing page as a standalone HTML file (with all styles included)
- Responsive design for desktop and mobile

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git (for cloning the repository)

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sekem-landing-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`.

3. **Start the development server**
   ```bash
   npm start
   ```
   - The app will open at [http://localhost:3000](http://localhost:3000).
   - The page will reload automatically when you make changes to the code.

4. **Build for production**
   ```bash
   npm run build
   ```
   - The optimized build will be in the `build/` folder.
   - You can deploy the contents of `build/` to any static hosting service.

5. **(Optional) Run tests**
   ```bash
   npm test
   ```
   - Runs the test suite (if any tests are present).

---

## Usage Guide

1. **Fill out the campaign form**
   - Enter a campaign title, hero image URL, CTA text, description, and select a theme color.
   - Choose a template (Minimal or Elegant).

2. **Live preview**
   - As you type or change options, the landing page preview updates instantly on the right.

3. **Export as HTML**
   - Click the **Export as HTML** button to download a ready-to-use HTML file.
   - The exported file includes all styles and your content—just upload it or send it to your team.

---

## Code Structure & Approach

- **Component-based architecture:**
  - `App.js`: Main container, manages state and layout.
  - `CampaignForm.js`: Handles all form inputs and user interaction.
  - `LandingPreview.js`: Renders the live preview and provides export logic.

- **State management:**
  - Uses React's `useState` for campaign data and UI state (dropdowns, etc).
  - All form changes are immediately reflected in the preview.

- **Live preview & export:**
  - The preview and export use the same rendering logic and styles, ensuring WYSIWYG output.
  - Exported HTML includes all necessary CSS inline, so it works standalone.
  - The border color and theme are dynamic and reflect user choices.

- **Styling:**
  - CSS is modular and separated by component (`App.css`, `LandingPreview.css`).
  - Minimal template border color is set via inline style for full flexibility.

- **Maintainability:**
  - Code is well-commented and logically sectioned.
  - No unused code or dead files.
  - Easy to add new templates or fields.

---

## Customization & Extending

- **Add new templates:**
  - Extend the `TEMPLATES` array in `App.js`.
  - Add corresponding logic and styles in `LandingPreview.js` and `LandingPreview.css`.

- **Add new fields:**
  - Add new fields to the campaign state in `App.js` and the form in `CampaignForm.js`.
  - Update the preview and export logic in `LandingPreview.js` as needed.

- **Change styles:**
  - Edit `App.css` and `LandingPreview.css` for global or template-specific changes.

---

## Troubleshooting

- **Port already in use:**
  - If `npm start` fails because port 3000 is in use, either close the other app or run:
    ```bash
    PORT=3001 npm start
    ```

- **Blank preview or export:**
  - Make sure all required fields are filled in the form.
  - Check the browser console for errors.

- **Exported HTML looks different:**
  - The exported HTML uses the same styles as the live preview. If you  change styles, re-export your page.

---


