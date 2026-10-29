# Plan d'implémentation : migration Angular 22 et PrimeNG 22

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faire compiler, tester et packager `@logusbrain/primeng-core` et `@logusbrain/utils` sous Angular 22 et PrimeNG 22, avec des peerDependencies alignées et une documentation à jour.

**Architecture:** Migration palier par palier avec `ng update` (16→17→18→19→20→21→22), PrimeNG maintenu en 17.18 jusqu'à Angular 18 puis refactorisé une seule fois au palier 19 (modules renommés ou retirés dans `PrimengCoreModule`). Les builders passent à `@angular/build` au palier 20. Chaque palier se termine par un build de production vert et un commit.

**Tech Stack:** Angular CLI 22, ng-packagr 22 (Ivy partiel), TypeScript 6.0, PrimeNG 22 + `@primeuix/themes`, Karma/Jasmine via `@angular/build:karma`, npm 12, Node 24.

**Spec:** `docs/superpowers/specs/2026-10-29-angular-22-migration-design.md`

## Global Constraints

- Branche de travail : `chore/migrate-angular-22`. Un commit par palier, un commit pour documentation et versions. Aucun `npm publish`, aucun `git push` sans accord explicite.
- Chaque palier se termine par `npm install` puis `npm run build:prod` sans erreur pour les deux bibliothèques.
- `--force` sur `ng update` seulement si une dépendance tierce bloque, et la dépendance est alors montée à la main dans le même commit.
- `package-lock.json` reste ignoré par git. `dist/` et `node_modules/` aussi.
- Scripts npm : noms conservés ; `force-clean` n'est pas touché.
- `tsconfig.lib.prod.json` garde `"compilationMode": "partial"`. Les options strictes des tsconfig sont conservées.
- Composants et pipes restent déclarés dans `PrimengCoreModule` (pas de standalone, pas de nouveau control flow).
- Anciens noms de modules PrimeNG retirés sans alias : `DropdownModule`, `CalendarModule`, `InputSwitchModule`, `InputTextareaModule`, `SidebarModule`, `OverlayPanelModule`, `TabViewModule`, `TabMenuModule`, `StepsModule`, `SlideMenuModule`, `ChipsModule`, `MessagesModule`, `VirtualScrollerModule`.
- Peers cibles de `projects/primeng-core/package.json` : `@angular/common` et `@angular/core` `^22.0.0`, `primeng` `^22.0.0`, `primeicons` `^7.0.0 || ^8.0.0`, `primeflex` `^4.0.0`, `@fullcalendar/angular` `^7.0.0`, `fullcalendar` `^7.0.0`, `temporal-polyfill` `^1.0.1`, `@rxweb/reactive-form-validators` `^13.0.1`, `@auth0/angular-jwt` `^5.2.0`, `chart.js` `^4.5.1`, `rxjs` `^7.8.0`, `zone.js` `^0.15.0`, `ngx-spinner` `^22.0.0`, `ngx-extended-pdf-viewer` `^31.0.0`, `crypto-js` `^4.2.0`. Retirés : `@fullcalendar/core`, `@fullcalendar/daygrid`, `@fullcalendar/interaction`, `@fullcalendar/timegrid`.
- Si `ng update` installe une `zone.js` 0.16.x, la peer devient `^0.15.0 || ^0.16.0` et le CHANGELOG le note.
- Versions finales : `@logusbrain/primeng-core` 2.0.0, `@logusbrain/utils` 2.0.0.
- Tests Karma : `CHROME_BIN=/usr/bin/google-chrome`.
- Les applications consommatrices doivent fournir leur thème (`providePrimeNG({ theme: { preset: Aura }, ripple: true })`) ; la bibliothèque n'en impose aucun.

## Review Focus

1. Une application qui importe `PrimengCoreModule` sans appeler `providePrimeNG` compile mais affiche des composants sans style. Attendu : le README le dit en premier dans la section installation. Test : Task 7 étape 3 (le README contient `providePrimeNG`), Task 8 étape 6 (l'app jetable configure Aura).
2. `DropdownFieldComponent` passe `[autoDisplayFirst]`, entrée absente de `p-select`. Attendu : la propriété TypeScript `autoDisplayFirst` reste exposée (compatibilité des consommateurs) mais n'est plus liée dans le template. Test : Task 3 étape 1.
3. Le `package.json` généré dans `dist/primeng-core` garde des peers obsolètes (`@fullcalendar/core`...) si la source n'est pas nettoyée. Attendu : aucune peer `@fullcalendar/*` autre que `angular`. Test : Task 8 étape 3.
4. `ng update` vers Angular 19 ajoute `standalone: false` aux six composants et trois pipes ; s'il en oublie un, le module ne compile plus. Attendu : les neuf fichiers portent `standalone: false`. Test : Task 3 étape 4.
5. `@rxweb/reactive-form-validators` 13.0.1 n'est plus maintenu ; le linker Angular 22 peut le refuser. Attendu : le build de production passe, sinon repli (retrait du module et de la peer, note CHANGELOG). Test : Task 6 étape 4.

---

### Task 1 : Palier Angular 16 → 17 et PrimeNG 17.18

**Files:**
- Modify: `package.json`, `angular.json`, `tsconfig.json` (par schématique)

**Interfaces:**
- Produces : workspace en Angular 17.x, PrimeNG 17.18.x, build de production vert.

- [ ] **Step 1 : Vérifier les versions tierces compatibles Angular 17**

Run : `npm view ngx-spinner versions --json | tail -20` puis `npm view ngx-spinner@17 peerDependencies` ; de même `npm view ngx-extended-pdf-viewer@19 peerDependencies` (puis @20 si 19 ne couvre pas Angular 17).
Expected : une version de chaque paquet dont la plage `@angular/core` inclut `17`. Noter les deux versions retenues : ce sont les valeurs à installer à l'étape 3.

- [ ] **Step 2 : Mettre à jour Angular**

Run : `npx ng update @angular/core@17 @angular/cli@17 @angular/cdk@17 ng-packagr@17`
Expected : « Migration completed » sans erreur. Si un conflit de peer sur primeng ou ngx-* bloque, relancer avec `--force`.

- [ ] **Step 3 : Mettre à jour PrimeNG et les tierces**

Run : `npm install primeng@17.18.15 primeicons@7 ngx-spinner@<v17> ngx-extended-pdf-viewer@<v retenue>`
Expected : installation sans `ERESOLVE`.

- [ ] **Step 4 : Build de production**

Run : `npm run build:prod`
Expected : `Built Angular Package` pour `primeng-core` et `utils`, code de sortie 0.

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "chore: migrate workspace to Angular 17 and PrimeNG 17.18"
```

### Task 2 : Palier Angular 17 → 18

**Files:**
- Modify: `package.json`, `angular.json`, `tsconfig.json` (par schématique)

**Interfaces:**
- Consumes : workspace Angular 17 (Task 1).
- Produces : workspace Angular 18.x, PrimeNG toujours 17.18.

- [ ] **Step 1 : Vérifier ngx-spinner et ngx-extended-pdf-viewer pour Angular 18**

Run : `npm view ngx-spinner@18 peerDependencies` et `npm view ngx-extended-pdf-viewer@21 peerDependencies` (ajuster la majeure jusqu'à trouver une plage incluant `18`).
Expected : versions notées pour l'étape 3.

- [ ] **Step 2 : Mettre à jour Angular**

Run : `npx ng update @angular/core@18 @angular/cli@18 @angular/cdk@18 ng-packagr@18`
Expected : migration terminée sans erreur (`--force` si une tierce bloque).

- [ ] **Step 3 : Mettre à jour les tierces**

Run : `npm install ngx-spinner@<v18> ngx-extended-pdf-viewer@<v retenue>`
Expected : installation sans `ERESOLVE`.

- [ ] **Step 4 : Build de production**

Run : `npm run build:prod`
Expected : les deux bibliothèques construites, code 0.

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "chore: migrate workspace to Angular 18"
```

### Task 3 : Palier Angular 18 → 19 et refactor PrimeNG 19

**Files:**
- Modify: `projects/primeng-core/src/lib/primeng-core.module.ts`
- Modify: `projects/primeng-core/src/lib/partials/views/dropdown-field/dropdown-field.component.html`
- Modify: `projects/primeng-core/src/lib/partials/views/*/*.component.ts` et `common/pipes/*.pipe.ts` (`standalone: false` par schématique)
- Test: `projects/primeng-core/src/lib/partials/views/dropdown-field/dropdown-field.component.spec.ts`

**Interfaces:**
- Consumes : workspace Angular 18 (Task 2).
- Produces : `PrimengCoreModule` exporte `SelectModule`, `DatePickerModule`, `ToggleSwitchModule`, `TextareaModule`, `DrawerModule`, `PopoverModule`, `TabsModule`, `StepperModule` à la place des anciens ; n'exporte plus `SlideMenuModule`, `ChipsModule`, `MessagesModule`, `VirtualScrollerModule`.

- [ ] **Step 1 : Écrire le test qui échoue**

Créer `dropdown-field.component.spec.ts` :

```ts
import { TestBed } from '@angular/core/testing';
import { PrimengCoreModule } from '../../../primeng-core.module';
import { DropdownFieldComponent } from './dropdown-field.component';

describe('DropdownFieldComponent', () => {
  it('renders a p-select element', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(DropdownFieldComponent);
    fixture.componentInstance.onChangedLoadData.subscribe(() => {});
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('p-select')).not.toBeNull();
    expect(el.querySelector('p-dropdown')).toBeNull();
  });
});
```

- [ ] **Step 2 : Mettre à jour Angular 19 et PrimeNG 19**

Run : `npx ng update @angular/core@19 @angular/cli@19 @angular/cdk@19 ng-packagr@19` puis `npm install primeng@19 @primeuix/themes ngx-spinner@19 ngx-extended-pdf-viewer@31` (vérifier au préalable `npm view ngx-spinner@19 peerDependencies` ; si aucune majeure de ngx-spinner ne couvre Angular 19 seul, garder la version du palier 18 avec `--force` et noter dans le commit).
Expected : schématique terminé ; les six composants et trois pipes portent `standalone: false`.

- [ ] **Step 3 : Lancer le test pour vérifier qu'il échoue**

Run : `CHROME_BIN=/usr/bin/google-chrome npx ng test primeng-core --watch=false --browsers=ChromeHeadless`
Expected : FAIL, soit à la compilation (`DropdownModule` introuvable dans `primeng/dropdown`), soit sur `p-select` absent.

- [ ] **Step 4 : Vérifier `standalone: false`**

Run : `grep -L "standalone: false" projects/primeng-core/src/lib/partials/views/*/*.component.ts projects/primeng-core/src/lib/common/pipes/*.pipe.ts`
Expected : aucune sortie. Si un fichier est listé, ajouter `standalone: false` dans son décorateur.

- [ ] **Step 5 : Refactoriser `primeng-core.module.ts`**

Dans les imports TypeScript, les tableaux `imports` et `exports` : remplacer `DropdownModule`→`SelectModule` (`primeng/select`), `CalendarModule`→`DatePickerModule` (`primeng/datepicker`), `InputSwitchModule`→`ToggleSwitchModule` (`primeng/toggleswitch`), `InputTextareaModule`→`TextareaModule` (`primeng/textarea`), `SidebarModule`→`DrawerModule` (`primeng/drawer`), `OverlayPanelModule`→`PopoverModule` (`primeng/popover`), `TabViewModule` et `TabMenuModule`→`TabsModule` (`primeng/tabs`, une seule entrée), `StepsModule`→`StepperModule` (`primeng/stepper`). Supprimer `SlideMenuModule`, `ChipsModule`, `MessagesModule`, `VirtualScrollerModule`. Garder l'ordre alphabétique des listes.

- [ ] **Step 6 : Adapter le template `dropdown-field.component.html`**

Remplacer les quatre occurrences `p-dropdown` par `p-select` ; retirer `[autoDisplayFirst]="autoDisplayFirst"` des deux balises (l'entrée n'existe pas sur `p-select`). La propriété `autoDisplayFirst` du composant TypeScript n'est pas supprimée.

- [ ] **Step 7 : Build et test**

Run : `npm run build:prod && CHROME_BIN=/usr/bin/google-chrome npx ng test primeng-core --watch=false --browsers=ChromeHeadless`
Expected : build code 0 ; `2 SUCCESS`. Toute autre erreur de template (attribut retiré par PrimeNG) est corrigée dans le même commit et notée pour le CHANGELOG (Task 7).

- [ ] **Step 8 : Commit**

```bash
git add -A && git commit -m "chore!: migrate to Angular 19 and PrimeNG 19, rename and drop legacy PrimeNG modules"
```

### Task 4 : Palier Angular 19 → 20, PrimeNG 20, builders `@angular/build`

**Files:**
- Modify: `package.json`, `angular.json`

**Interfaces:**
- Consumes : workspace Angular 19 (Task 3).
- Produces : builders `@angular/build:ng-packagr` et `@angular/build:karma` ; `@angular-devkit/build-angular` absent des devDependencies.

- [ ] **Step 1 : Mettre à jour Angular 20**

Run : `npx ng update @angular/core@20 @angular/cli@20 @angular/cdk@20 ng-packagr@20`
Expected : migration terminée.

- [ ] **Step 2 : Basculer les builders**

À la main (aucun schématique ne couvre les bibliothèques) : dans `angular.json`, remplacer les quatre `@angular-devkit/build-angular:` par `@angular/build:`. Puis `npm uninstall @angular-devkit/build-angular && npm install -D @angular/build@20`.
Expected : `grep -c "@angular/build:" angular.json` affiche `4` ; `grep build-angular angular.json package.json` ne renvoie rien.

- [ ] **Step 3 : Mettre à jour PrimeNG 20 et ngx-spinner 22**

Run : `npm install primeng@20 @primeuix/themes@latest ngx-spinner@22`
Expected : installation sans `ERESOLVE`.

- [ ] **Step 4 : Build et test**

Run : `npm run build:prod && CHROME_BIN=/usr/bin/google-chrome npx ng test primeng-core --watch=false --browsers=ChromeHeadless`
Expected : build code 0 avec le builder `@angular/build` ; tests `2 SUCCESS`.

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "chore: migrate to Angular 20 and PrimeNG 20, switch builders to @angular/build"
```

### Task 5 : Palier Angular 20 → 21 et PrimeNG 21

**Files:**
- Modify: `package.json`, `angular.json`, tsconfig (par schématique)

**Interfaces:**
- Consumes : workspace Angular 20 (Task 4).
- Produces : workspace Angular 21.x, PrimeNG 21.x.

- [ ] **Step 1 : Mettre à jour Angular 21**

Run : `npx ng update @angular/core@21 @angular/cli@21 @angular/cdk@21 ng-packagr@21 @angular/build@21`
Expected : migration terminée.

- [ ] **Step 2 : Mettre à jour PrimeNG 21**

Run : `npm install primeng@21 @primeuix/themes@latest`
Expected : installation sans `ERESOLVE`.

- [ ] **Step 3 : Build de production**

Run : `npm run build:prod`
Expected : code 0.

- [ ] **Step 4 : Commit**

```bash
git add -A && git commit -m "chore: migrate to Angular 21 and PrimeNG 21"
```

### Task 6 : Palier Angular 21 → 22, PrimeNG 22, TypeScript 6, FullCalendar 7

**Files:**
- Modify: `package.json`, `angular.json`, tsconfig (par schématique)
- Modify (repli seulement) : `projects/primeng-core/src/lib/primeng-core.module.ts`

**Interfaces:**
- Consumes : workspace Angular 21 (Task 5).
- Produces : workspace Angular 22.x, PrimeNG 22.x, TS 6.0, `@angular/cdk` ^22.1, `@fullcalendar/angular` 7.1.x avec `fullcalendar` 7.1.x et `temporal-polyfill`.

- [ ] **Step 1 : Mettre à jour Angular 22 et TypeScript**

Run : `npx ng update @angular/core@22 @angular/cli@22 @angular/cdk@22 ng-packagr@22 @angular/build@22` puis `npm install -D typescript@6`
Expected : migration terminée ; `npx tsc -v` affiche `6.0.x` ; `npm ls @angular/cdk` affiche `22.1.x` ou plus.

- [ ] **Step 2 : Mettre à jour PrimeNG 22 et FullCalendar 7**

Run : `npm uninstall @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/timegrid && npm install primeng@22 @primeuix/themes@latest primeflex@4 @fullcalendar/angular@7 fullcalendar@7 temporal-polyfill@^1.0.1`
Expected : installation sans `ERESOLVE` ; `npm ls primeng @fullcalendar/angular zone.js` affiche 22.x, 7.1.x et la version de zone.js à reporter dans la peer.

- [ ] **Step 3 : Build de production**

Run : `npm run build:prod`
Expected : code 0.

- [ ] **Step 4 : Repli rxweb si le build échoue sur `@rxweb/reactive-form-validators`**

Seulement si l'erreur de l'étape 3 cite ce paquet (linker ou API Angular retirée) : retirer `RxReactiveFormsModule` des imports TypeScript, `imports` et `exports` de `primeng-core.module.ts`, `npm uninstall @rxweb/reactive-form-validators`, relancer `npm run build:prod`. Noter le repli pour le CHANGELOG (Task 7).
Expected : code 0.

- [ ] **Step 5 : Tests**

Run : `CHROME_BIN=/usr/bin/google-chrome npm test -- --browsers=ChromeHeadless` (ou les deux `ng test` séparément avec `--browsers=ChromeHeadless`)
Expected : `2 SUCCESS` pour primeng-core, `1 SUCCESS` pour utils.

- [ ] **Step 6 : Commit**

```bash
git add -A && git commit -m "chore!: migrate to Angular 22, PrimeNG 22, TypeScript 6 and FullCalendar 7"
```

### Task 7 : peerDependencies, versions 2.0.0, docs/config, README, CHANGELOG

**Files:**
- Modify: `projects/primeng-core/package.json`, `projects/utils/package.json`
- Modify: `docs/config/tsconfig.lib.json.txt`, `docs/config/tsconfig.lib.prod.json.txt`
- Modify: `README.md`, `CHANGELOG.md`

**Interfaces:**
- Consumes : versions installées dans `package.json` racine après Task 6.
- Produces : manifestes de bibliothèque conformes aux Global Constraints.

- [ ] **Step 1 : Écrire le script de vérification des peers (test)**

Créer dans le scratchpad `check-peers.mjs` qui lit `projects/primeng-core/package.json` et `projects/utils/package.json` et échoue (code 1) si : `version` ≠ `2.0.0` ; une peer de la liste des Global Constraints manque ou a une autre plage ; une clé `@fullcalendar/core|daygrid|interaction|timegrid` est présente. Lancer : `node -I <scratchpad>/check-peers.mjs`.
Expected : FAIL (versions 1.0.3 / 1.0.0, peers ^16).

- [ ] **Step 2 : Mettre à jour les deux `package.json` de bibliothèque**

`projects/primeng-core/package.json` : `version` `2.0.0`, `peerDependencies` exactement la liste des Global Constraints (clés triées), `dependencies.tslib` `^2.8.0`. `projects/utils/package.json` : `version` `2.0.0`, peers Angular `^22.0.0`.
Run : `node -I <scratchpad>/check-peers.mjs`
Expected : PASS.

- [ ] **Step 3 : Réécrire README.md (sections Prérequis, Installation, Usage)**

Contenu imposé : prérequis Angular 22 et Node 22.22+/24.15+/26+ (engines du CLI 22) ; commande `npm install @logusbrain/primeng-core primeng@22 @primeuix/themes primeicons primeflex@4 @fullcalendar/angular@7 fullcalendar@7 temporal-polyfill ngx-spinner@22 ngx-extended-pdf-viewer@31 @rxweb/reactive-form-validators @auth0/angular-jwt chart.js crypto-js` ; bloc `app.config.ts` avec `provideAnimationsAsync()` et `providePrimeNG({ theme: { preset: Aura }, ripple: true })` (import `Aura` depuis `@primeuix/themes/aura`) ; `styles.css` important `primeicons/primeicons.css` et `primeflex/primeflex.css` ; exemple d'import de `PrimengCoreModule` dans un `NgModule` et dans un composant standalone ; tableau des modules renommés et retirés (copie de la section 5 de la spec). Les sections Features, Project Structure, Contribution, License, Contact sont conservées.
Run : `grep -c "providePrimeNG" README.md`
Expected : au moins `1`.

- [ ] **Step 4 : Réécrire CHANGELOG.md**

Supprimer le contenu actuel (hashes factices). Écrire une section `## 2.0.0 - 2026-10-29` avec sous-sections « Ruptures » (peers Angular ^22 / PrimeNG ^22 ; modules renommés : tableau ancien→nouveau ; modules retirés : les quatre ; FullCalendar 7 remplace les quatre paquets `@fullcalendar/*` ; thème fourni par l'application via `providePrimeNG` ; `p-dropdown` devient `p-select` dans `DropdownFieldComponent`, `autoDisplayFirst` sans effet ; repli rxweb si appliqué ; zone.js si 0.16), « Changements » (builders `@angular/build`, TypeScript 6, nouvelles peers déclarées `ngx-spinner`, `ngx-extended-pdf-viewer`, `crypto-js`), puis `## 1.0.3` « Dernière version Angular 16 / PrimeNG 16 ».
Run : `grep -c "a1b2c3d" CHANGELOG.md`
Expected : `0`.

- [ ] **Step 5 : Synchroniser docs/config**

Copier `projects/primeng-core/tsconfig.lib.json` vers `docs/config/tsconfig.lib.json.txt` et `tsconfig.lib.prod.json` vers `docs/config/tsconfig.lib.prod.json.txt`.
Run : `diff projects/primeng-core/tsconfig.lib.json docs/config/tsconfig.lib.json.txt && diff projects/primeng-core/tsconfig.lib.prod.json docs/config/tsconfig.lib.prod.json.txt`
Expected : aucune différence.

- [ ] **Step 6 : Build et commit**

Run : `npm run build:prod`
Expected : code 0.

```bash
git add -A && git commit -m "docs: release notes, README and peer dependencies for 2.0.0"
```

### Task 8 : Vérification finale et application jetable

**Files:**
- Aucun fichier du dépôt. Dossier temporaire : `<scratchpad>/smoke`.

**Interfaces:**
- Consumes : `dist/primeng-core` produit par Task 7 étape 6.

- [ ] **Step 1 : Tests complets**

Run : `CHROME_BIN=/usr/bin/google-chrome npx ng test primeng-core --watch=false --browsers=ChromeHeadless && CHROME_BIN=/usr/bin/google-chrome npx ng test utils --watch=false --browsers=ChromeHeadless`
Expected : `2 SUCCESS` et `1 SUCCESS`.

- [ ] **Step 2 : Packager**

Run : `cd dist/primeng-core && npm pack --pack-destination <scratchpad> && cd -`
Expected : `logusbrain-primeng-core-2.0.0.tgz` créé.

- [ ] **Step 3 : Inspecter le manifeste généré**

Run : `node -e "const p=require('./dist/primeng-core/package.json');const k=Object.keys(p.peerDependencies);if(p.version!=='2.0.0'||!p.peerDependencies['@angular/core'].startsWith('^22')||k.some(x=>/^@fullcalendar\/(core|daygrid|interaction|timegrid)$/.test(x))||!p.exports)process.exit(1);console.log('ok')"`
Expected : `ok`.

- [ ] **Step 4 : Créer l'application jetable**

Run : `cd <scratchpad> && npx -y @angular/cli@22 new smoke --standalone --skip-git --style=css --ssr=false --zoneless=false --skip-tests --defaults` (si `--zoneless` est refusé par le CLI, l'omettre)
Expected : dossier `smoke` créé, `npm install` terminé.

- [ ] **Step 5 : Installer le tarball et ses peers**

Run : dans `smoke` : `npm install ../logusbrain-primeng-core-2.0.0.tgz primeng@22 @primeuix/themes primeicons primeflex@4 @fullcalendar/angular@7 fullcalendar@7 temporal-polyfill ngx-spinner@22 ngx-extended-pdf-viewer@31 @rxweb/reactive-form-validators @auth0/angular-jwt chart.js crypto-js @angular/cdk@22`
Expected : aucune erreur `ERESOLVE` ni avertissement de peer non satisfaite pour `@logusbrain/primeng-core`.

- [ ] **Step 6 : Configurer et utiliser la bibliothèque**

`src/app/app.config.ts` : ajouter `provideAnimationsAsync()` et `providePrimeNG({ theme: { preset: Aura }, ripple: true })` exactement comme le README. `src/app/app.ts` (ou `app.component.ts`) : `imports: [PrimengCoreModule]`, template `<llb-dropdown-field label="Test" [dataSource]="[{name:'a'}]" optionLabel="name" (onChangedLoadData)="noop()"></llb-dropdown-field><p-select [options]="[]"></p-select>`. `src/styles.css` : les deux imports CSS du README.
Run : `npx ng build`
Expected : build de production terminé sans erreur ni avertissement `NG0` ; aucun avertissement de bundle non optimisé pour `@logusbrain/primeng-core`.

- [ ] **Step 7 : Rapport**

Résumer : versions finales (`npm ls @angular/core primeng ng-packagr typescript --depth=0`), résultat tests, résultat smoke, écarts vs spec (ex. `table.component.html` n'utilisait pas `p-dropdown` ; repli rxweb appliqué ou non ; zone.js). Aucun push.
