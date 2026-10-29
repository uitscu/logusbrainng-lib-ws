# Changelog

All notable changes to `@logusbrain/primeng-core` and `@logusbrain/utils` are documented here.

## 2.0.0 - 2026-10-29

Migration of the workspace from Angular 16 / PrimeNG 16 to Angular 22 / PrimeNG 22.

### Breaking changes

- **Peer dependencies**: Angular `^22.0.0`, PrimeNG `^22.0.0`, `@angular/cdk` 22, TypeScript 6.0, `zone.js ^0.15.0`, `primeflex ^4.0.0`, `primeicons ^7.0.0 || ^8.0.0`. `@logusbrain/utils` requires Angular `^22.0.0`.
- **Theme is provided by the application**. The library imports no theme. Call `providePrimeNG({ theme: { preset: Aura }, ripple: true })` with a preset from `@primeuix/themes` in your `app.config.ts` (see README). Ripple is off by default since PrimeNG 18.
- **Renamed PrimeNG modules** exported by `PrimengCoreModule` (old names are no longer exported):

  | Removed | Replacement |
  |---|---|
  | `DropdownModule` | `SelectModule` |
  | `CalendarModule` | `DatePickerModule` |
  | `InputSwitchModule` | `ToggleSwitchModule` |
  | `InputTextareaModule` | `TextareaModule` |
  | `SidebarModule` | `DrawerModule` |
  | `OverlayPanelModule` | `PopoverModule` |
  | `TabViewModule`, `TabMenuModule` | `TabsModule` |
  | `StepsModule` | `StepperModule` |

- **Removed PrimeNG modules** (no replacement in the library): `SlideMenuModule`, `ChipsModule`, `MessagesModule`, `VirtualScrollerModule`. Use `TieredMenuModule`, `AutoCompleteModule` (`multiple`), `MessageModule` and `ScrollerModule` from PrimeNG.
- **FullCalendar 7**: `fullcalendar ^7.0.0` and `temporal-polyfill ^1.0.1` replace `@fullcalendar/core`, `@fullcalendar/daygrid`, `@fullcalendar/interaction` and `@fullcalendar/timegrid` as peer dependencies of `@fullcalendar/angular ^7.0.0`.
- **`DropdownFieldComponent`** renders `<p-select>` instead of `<p-dropdown>`. The `autoDisplayFirst` input is kept for compatibility but has no effect (`p-select` has no such option).
- **`ToolbarComponent`, `DialogButtonComponent`, `TableComponent`** render their buttons with the `<p-button>` component (`severity`, `raised`, `rounded`) instead of the `pButton` directive, whose `label` and `icon` inputs were removed in PrimeNG 22. The inner `<button class="p-button ...">` element is unchanged; CSS targeting the host `button` element must target `p-button button` instead.
- PrimeNG 22 components read `<ng-template #name>` references instead of `pTemplate="name"`; the library templates were updated accordingly. Applications using `pTemplate` with PrimeNG 22 components must do the same.

### Changes

- Build and test builders moved to `@angular/build:ng-packagr` and `@angular/build:karma`; `@angular-devkit/build-angular` removed.
- TypeScript 6.0: `baseUrl` and `downlevelIteration` removed from `tsconfig.json`, `paths` are relative to the workspace root.
- Peer dependencies now declare `ngx-spinner ^22.0.0`, `ngx-extended-pdf-viewer ^31.0.0` and `crypto-js ^4.2.0`, which the module already imported.
- `@rxweb/reactive-form-validators ^13.0.1` is kept and verified against the Angular 22 linker.
- Components keep `standalone: false` and `ChangeDetectionStrategy.Eager` (added by the Angular schematics) so their behaviour is unchanged.
- `madge` removed from the workspace devDependencies (no release supports TypeScript 6, it blocked `npm install`, and no script used it).
- Specs added for `DropdownFieldComponent`, `ToolbarComponent`, `DialogButtonComponent` and `TableComponent`.

## 1.0.3

Last release built with Angular 16.2 and PrimeNG 16.0.
