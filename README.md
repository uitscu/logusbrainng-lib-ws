# 🧠 logusbrainng-lib

**logusbrainng-lib** is a modular and reusable Angular library developed to enhance productivity, consistency, and scalability in Angular applications.  
It bundles components, utility services, and standard configurations to accelerate development in a professional environment.

[![GitHub repo size](https://img.shields.io/github/repo-size/uitscu/logusbrainng-lib-ws)](https://github.com/uitscu/logusbrainng-lib-ws)
[![GitHub issues](https://img.shields.io/github/issues/uitscu/logusbrainng-lib-ws)](https://github.com/uitscu/logusbrainng-lib-ws/issues)
[![GitHub stars](https://img.shields.io/github/stars/uitscu/logusbrainng-lib-ws)](https://github.com/uitscu/logusbrainng-lib-ws/stargazers)
[![GitHub license](https://img.shields.io/github/license/uitscu/logusbrainng-lib-ws)](https://github.com/uitscu/logusbrainng-lib-ws/blob/main/LICENSE)

---

## 🚀 Features

- 🔌 Custom Angular-compatible UI components
- 🧰 Reusable utility services (error handling, formatting, dates, etc.)
- 🧱 Modular architecture with multiple libraries in one workspace
- ⚙️ Easy integration into any Angular project
- 🔐 Built following clean code and professional development practices

---

## 🏗️ Project Structure

```text
logusbrainng-lib-ws/
├── projects/
│   ├── primeng-core/      # Core UI components (based on PrimeNG)
│   └── utils/     # Shared utility functions
├── angular.json
├── .gitignore
├── package.json
└── README.md
```

## 📋 Requirements

| Requirement | Version |
|---|---|
| Angular | 22.x |
| PrimeNG | 22.x |
| Node.js | 20.19+, 22.12+ or 24.x |
| TypeScript | 6.0.x |

`@logusbrain/primeng-core` 2.x is built with Ivy partial compilation and ships no theme: the consuming application chooses and provides its PrimeNG theme.

## 📦 Installation

Install the library and its peer dependencies:

```bash
npm install @logusbrain/primeng-core primeng@22 @primeuix/themes primeicons primeflex@4 @fullcalendar/angular@7 fullcalendar@7 temporal-polyfill ngx-spinner@22 ngx-extended-pdf-viewer@31 @rxweb/reactive-form-validators @auth0/angular-jwt chart.js crypto-js
```

### Theme and ripple (required)

Since PrimeNG 18 the theme is configured in the application, not in CSS imports, and ripple is off by default. Without `providePrimeNG` the components compile but render unstyled.

`src/app/app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura }, ripple: true }),
  ],
};
```

`src/styles.css`:

```css
@import "primeicons/primeicons.css";
@import "primeflex/primeflex.css";
```

## 🧰 Usage

In an `NgModule`-based application:

```ts
import { PrimengCoreModule } from '@logusbrain/primeng-core';
import { UtilsModule } from '@logusbrain/utils';

@NgModule({
  imports: [
    PrimengCoreModule,
    UtilsModule
  ]
})
export class AppModule {}
```

In a standalone component:

```ts
import { Component } from '@angular/core';
import { PrimengCoreModule } from '@logusbrain/primeng-core';

@Component({
  selector: 'app-root',
  imports: [PrimengCoreModule],
  template: `<llb-toolbar (onSave)="save()"></llb-toolbar>`
})
export class AppComponent {
  save() {}
}
```

### PrimeNG modules exported by `PrimengCoreModule`

Version 2.0.0 follows the PrimeNG 18+ component names. Renamed modules:

| Removed (1.x) | Use instead (2.x) |
|---|---|
| `DropdownModule` (`p-dropdown`) | `SelectModule` (`p-select`) |
| `CalendarModule` (`p-calendar`) | `DatePickerModule` (`p-datepicker`) |
| `InputSwitchModule` (`p-inputSwitch`) | `ToggleSwitchModule` (`p-toggleswitch`) |
| `InputTextareaModule` (`pInputTextarea`) | `TextareaModule` (`pTextarea`) |
| `SidebarModule` (`p-sidebar`) | `DrawerModule` (`p-drawer`) |
| `OverlayPanelModule` (`p-overlayPanel`) | `PopoverModule` (`p-popover`) |
| `TabViewModule`, `TabMenuModule` | `TabsModule` (`p-tabs`) |
| `StepsModule` (`p-steps`) | `StepperModule` (`p-stepper`) |

No longer exported (import the PrimeNG equivalent in your application if needed): `SlideMenuModule` (use `TieredMenuModule`), `ChipsModule` (use `AutoCompleteModule` with `multiple`), `MessagesModule` (use `MessageModule`), `VirtualScrollerModule` (use `ScrollerModule`).

## 🧪 Run Tests

```bash
CHROME_BIN=/usr/bin/google-chrome npx ng test primeng-core --watch=false --browsers=ChromeHeadless
CHROME_BIN=/usr/bin/google-chrome npx ng test utils --watch=false --browsers=ChromeHeadless
```

## 🏗️ Build

```bash
npm run build:prod
```

Outputs `dist/primeng-core` and `dist/utils`, ready for `npm publish`.

## 🤝 Contribution

Contributions are welcome! If you’d like to propose enhancements or report bugs, feel free to create an issue or a pull request.

1. Fork the project.

2. Create a branch (git checkout -b feature/new-feature).

3. Commit your changes (git commit -am 'Add a new feature').

4. Push to your branch (git push origin feature/new-feature).

5. Open a pull request.

## 📄 License

Distributed under the MIT License. See [LICENSE](https://mit-license.org/) for more information.

## 📬 Contact

Kastin (uitscu)
🌐 github.com/uitscu
