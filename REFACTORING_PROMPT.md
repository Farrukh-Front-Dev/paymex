# 🎯 SENIOR CSS REFACTORING - Step by Step Guide

## Context
I have a React Telegram Mini App with monolithic CSS files (style.css ~5500 lines, paymex-theme.css ~600 lines). I need professional CSS architecture refactoring WITHOUT changing any visual styles.

## Current Structure
```
project/
├── style.css              (5500+ lines - everything mixed)
├── paymex-theme.css       (600+ lines - theme overrides)
├── index.html
├── assets/
│   ├── fonts/
│   ├── hub/
│   └── [compiled JS bundles]
└── preview-server.mjs
```

## Goal
Create a modular, maintainable CSS architecture following ITCSS methodology while keeping 100% visual compatibility.

## Requirements
1. ✅ **ZERO visual changes** - styles must remain identical
2. ✅ Create new modular structure ALONGSIDE existing files
3. ✅ Keep old files as backup until migration complete
4. ✅ Follow senior-level best practices
5. ✅ Use ITCSS (Inverted Triangle CSS) methodology
6. ✅ Make it production-ready and team-friendly

## Target Architecture

```
css/
├── 0-settings/
│   ├── _variables.css          # CSS custom properties (colors, spacing, typography)
│   └── _fonts.css               # @font-face declarations
├── 1-tools/
│   └── _mixins.css              # Reusable CSS patterns (if needed)
├── 2-generic/
│   ├── _reset.css               # Box-sizing, normalize
│   └── _base.css                # html, body, root styles
├── 3-elements/
│   ├── _typography.css          # Headings, paragraphs, text elements
│   └── _forms.css               # Base input, button, select styles
├── 4-layout/
│   ├── _header.css              # .top-header, .brand
│   ├── _navigation.css          # .bottom-nav, .nav-item
│   ├── _grid.css                # Grid systems, .services-grid
│   └── _containers.css          # .app-shell, .page, wrappers
├── 5-components/
│   ├── _buttons.css             # .main-button, .secondary-button
│   ├── _cards.css               # .card, .feature-card
│   ├── _modals.css              # .modal-overlay, .modal-box
│   ├── _forms-components.css    # .currency-select, .input-row
│   ├── _exchange-card.css       # .exchange-card specific styles
│   ├── _hub-tiles.css           # .home-hub-tile, .home-hub-row
│   ├── _rate-pills.css          # .rate-pill, .rates-strip
│   ├── _profile.css             # Profile page components
│   ├── _history.css             # History page components
│   └── _chat.css                # Chat/concierge components
├── 6-pages/
│   ├── _home.css                # #page-home specific overrides
│   ├── _history-page.css        # History page layout
│   └── _support-page.css        # Support page layout
├── 7-themes/
│   └── _paymex-theme.css        # Theme-specific overrides (gradients, colors)
└── 8-utilities/
    ├── _spacing.css             # Margin, padding utilities
    ├── _responsive.css          # Media query utilities
    └── _helpers.css             # Display, visibility, text utilities

main.css                         # Master file that imports all modules
```

## Step-by-Step Instructions

### STEP 1: Setup Structure
1. Create `css/` folder with all subdirectories
2. Create empty CSS files following the structure above
3. Create `main.css` that will import all modules
4. Keep `style.css` and `paymex-theme.css` untouched as backup

### STEP 2: Extract Variables (0-settings/)
From `style.css`, extract:
- All `:root { }` CSS custom properties → `_variables.css`
- All `@font-face` declarations → `_fonts.css`
- Organize variables by category (colors, spacing, typography, layout)

### STEP 3: Extract Generic Styles (2-generic/)
- Box-sizing, resets → `_reset.css`
- `html`, `body`, `#root` base styles → `_base.css`

### STEP 4: Extract Layout (4-layout/)
- `.top-header`, `.top-header-inner`, `.brand` → `_header.css`
- `.bottom-nav`, `.nav-item`, `.nav-fab` → `_navigation.css`
- `.app-shell`, `.page`, `.app-pages` → `_containers.css`
- Grid systems → `_grid.css`

### STEP 5: Extract Components (5-components/)
Split by component type:
- All button styles → `_buttons.css`
- Card components → `_cards.css`
- Modal components → `_modals.css`
- Exchange card → `_exchange-card.css`
- Hub tiles → `_hub-tiles.css`
- Rate pills → `_rate-pills.css`
- etc.

### STEP 6: Extract Page-Specific (6-pages/)
- `#page-home` specific styles → `_home.css`
- History page styles → `_history-page.css`
- Support page styles → `_support-page.css`

### STEP 7: Theme Overrides (7-themes/)
- Move `paymex-theme.css` content → `_paymex-theme.css`
- Keep all `!important` overrides intact

### STEP 8: Utilities (8-utilities/)
- Extract utility classes
- Media queries
- Helper classes

### STEP 9: Create main.css
```css
/* PAYMEX - Modular CSS Architecture */

/* 0. Settings */
@import 'css/0-settings/_variables.css';
@import 'css/0-settings/_fonts.css';

/* 2. Generic */
@import 'css/2-generic/_reset.css';
@import 'css/2-generic/_base.css';

/* 3. Elements */
@import 'css/3-elements/_typography.css';
@import 'css/3-elements/_forms.css';

/* 4. Layout */
@import 'css/4-layout/_header.css';
@import 'css/4-layout/_navigation.css';
@import 'css/4-layout/_grid.css';
@import 'css/4-layout/_containers.css';

/* 5. Components */
@import 'css/5-components/_buttons.css';
@import 'css/5-components/_cards.css';
@import 'css/5-components/_modals.css';
@import 'css/5-components/_forms-components.css';
@import 'css/5-components/_exchange-card.css';
@import 'css/5-components/_hub-tiles.css';
@import 'css/5-components/_rate-pills.css';
@import 'css/5-components/_profile.css';
@import 'css/5-components/_history.css';
@import 'css/5-components/_chat.css';

/* 6. Pages */
@import 'css/6-pages/_home.css';
@import 'css/6-pages/_history-page.css';
@import 'css/6-pages/_support-page.css';

/* 7. Themes */
@import 'css/7-themes/_paymex-theme.css';

/* 8. Utilities */
@import 'css/8-utilities/_spacing.css';
@import 'css/8-utilities/_responsive.css';
@import 'css/8-utilities/_helpers.css';
```

### STEP 10: Update index.html
```html
<!-- OLD (keep as backup comment) -->
<!-- <link rel="stylesheet" href="/style.css" /> -->
<!-- <link rel="stylesheet" href="/paymex-theme.css" /> -->

<!-- NEW -->
<link rel="stylesheet" href="/main.css" />
```

### STEP 11: Testing
1. Open preview server
2. Compare old vs new visually
3. Check all pages (Home, History, Profile, Support)
4. Test all breakpoints (320px, 360px, 375px, 414px, desktop)
5. Verify no visual differences

### STEP 12: Cleanup
Once verified:
1. Rename `style.css` → `style.css.backup`
2. Rename `paymex-theme.css` → `paymex-theme.css.backup`
3. Update README.md with new structure

## Critical Rules

1. **DO NOT change any style values** - only reorganize
2. **Keep all selectors identical** - don't refactor class names
3. **Preserve specificity** - maintain same CSS specificity
4. **Keep media queries with their components** - don't separate
5. **Maintain order** - CSS cascade matters
6. **Test after each major step** - don't wait until end
7. **Keep comments** - preserve existing documentation
8. **Preserve !important** - especially in theme overrides

## What I Need You To Do

**Start with STEP 1 and STEP 2:**

1. Create the folder structure
2. Extract all CSS variables from `style.css` into `css/0-settings/_variables.css`
3. Extract all `@font-face` into `css/0-settings/_fonts.css`
4. Show me the extracted files for review

Then we'll proceed step by step through the remaining steps.

## Important Notes

- This is a **production Telegram Mini App**
- Visual consistency is CRITICAL
- Work methodically, one step at a time
- Ask for confirmation before major changes
- Provide clear diffs of what you're moving

## Current Files to Refactor

The project has:
- `style.css` - main stylesheet (~5500 lines)
- `paymex-theme.css` - theme overrides (~600 lines)

Both files are in the workspace root.

---

**Ready to start? Begin with STEP 1 and STEP 2. Create the structure and extract the variables/fonts.**

