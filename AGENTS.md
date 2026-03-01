# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@zedix/zedix-ui` is a Lit 3 web component library (custom element prefix: `zx-`) serving as a foundation for web apps or design systems. Published to GitHub Packages Registry under `@zedix` scope.

## Commands

| Task | Command |
|---|---|
| Build | `yarn build` |
| Dev (Storybook) | `yarn storybook` |
| Lint | `yarn lint` (oxlint) |
| Lint fix | `yarn lint:fix` |
| Format | `yarn fmt` (oxfmt) |
| Format check | `yarn fmt:check` |
| Typecheck | `yarn typecheck` |
| All tests | `yarn test` |
| Single component test (watch) | `yarn test:component -- <group-name>` |
| Tests (watch mode) | `yarn test:watch` |
| Release | `yarn release` |

Uses **Yarn 4 (Berry)** with node-modules linker. Node >= 20. Tests run on Playwright (Chromium) via `@web/test-runner`. **Build before testing** — tests import from `dist/`.

## Architecture

### Component File Convention

Each component lives in `src/components/<name>/` with these files:

- **`<name>.component.ts`** — Component class extending `LitElement`. Default export.
- **`<name>.ts`** — Registration file: imports component, calls `customElements.define('zx-<name>', ...)`, re-exports, and declares `HTMLElementTagNameMap`. Uses guard: `if (!customElements.get('zx-name'))`.
- **`<name>.styles.ts`** — Styles via Lit `css` tagged template. Default export.
- **`<name>.stories.ts`** — Storybook CSF3 stories.
- **`<name>.test.ts`** — Tests using `@open-wc/testing` + Mocha + Sinon.

### Key Patterns

- **Inheritance**: `Drawer` extends `Dialog` (overrides styles and animations).
- **Reactive Controllers**: `PopupController` (in `src/controllers/`) implements Floating UI positioning, used by Tooltip and Popover.
- **Animation system**: Components use a `Map`-based animation registry with named animations (e.g., `dialog.show`, `dialog.close`) played via WAAPI helpers from `src/internals/animate.ts`. Respects `prefers-reduced-motion`.
- **Events**: Dispatched through `src/internals/event.ts` helper — always `bubbles: true, cancelable: true, composed: true`.
- **Base styles**: `src/styles/component.styles.ts` — composed into components via `static styles = [componentStyles, styles]`.
- **CSS custom properties** for theming, defined on `:host`. Components expose `part` attributes for external styling.
- **CSS logical properties** preferred (e.g., `max-inline-size`, `margin-block-start`).
- **Form participation**: Some components use `ElementInternals` (`this.attachInternals()`).
- **Path alias**: `@` maps to `./src`.

### Styling

Component styles are self-contained Shadow DOM CSS — no external CSS framework. Tailwind CSS v4 is used **only in Storybook stories** for demo layout.

### Shared Utilities (`src/internals/`)

- `animate.ts` — WAAPI helpers
- `debounce.ts` — Debounce
- `event.ts` — Custom event dispatch
- `scroll.ts` — Body scroll locking

## Commit Conventions

Conventional Commits enforced by commitlint. Format: `type(scope): description`.

Types: `feat`, `fix`, `perf`, `refactor`, `docs`, `build`, `types`, `chore`, `test`, `style`, `ci`. Scopes match component names.

## TypeScript

Strict mode with `experimentalDecorators: true` and `useDefineForClassFields: false` (required for Lit decorators). ESM-only.

## Build

Vite with Rollup — multi-entry build (each component is a separate entry point). `vite-plugin-dts` generates type declarations. Tree-shakeable output to `dist/`.
