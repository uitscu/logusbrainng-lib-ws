# Migration du workspace vers Angular 22 et PrimeNG 22

Date : 2026-10-29
Statut : validé en discussion, en attente de relecture écrite

## 1. Contexte

Le workspace `logusbrainng-lib-ws` contient deux bibliothèques Angular :

- `@logusbrain/primeng-core` (1.0.3, publiée sur npm) : un `NgModule` qui déclare six composants, trois pipes, des services, et ré-exporte une soixantaine de modules PrimeNG ainsi que FullCalendar, ngx-spinner, ngx-extended-pdf-viewer et rxweb.
- `@logusbrain/utils` (1.0.0, jamais publiée) : trois fichiers TypeScript, dépend seulement d'Angular.

Le workspace est en Angular 16.2, PrimeNG 16.0.2, TypeScript 5.1, ng-packagr 16. Angular 16 et 17 sont hors support. Les versions courantes sont Angular 22.2 et PrimeNG 22.1.

## 2. Objectif et critères de succès

Objectif : les deux bibliothèques compilent, se testent et se packagent sous Angular 22 et PrimeNG 22, et une application Angular 22 peut installer `@logusbrain/primeng-core` et importer `PrimengCoreModule` sans erreur.

Critères de succès :

1. `npm run build:prod` produit `dist/primeng-core` et `dist/utils` sans erreur.
2. Les `peerDependencies` des deux `package.json` de bibliothèque ciblent Angular `^22.0.0`, PrimeNG `^22.0.0` et les versions tierces alignées.
3. Une application Angular 22 jetable, créée hors du dépôt, installe le tarball de `dist/primeng-core`, importe `PrimengCoreModule`, et compile en production.
4. Les tests Karma passent (Chrome est présent sur la machine : `/usr/bin/google-chrome`).
5. CHANGELOG et README décrivent les ruptures et la nouvelle installation.

## 3. Décisions prises

| Sujet | Décision | Raison |
|---|---|---|
| Version cible | Angular 22.2, PrimeNG 22.1 | Seule la cible 17 évite la refonte PrimeNG, mais elle est hors support. Toute cible de 18 à 21 coûte autant que 22. |
| Composants PrimeNG renommés ou supprimés | Remplacer et retirer, sans conserver les anciens noms | Module plus léger, aucun avertissement de dépréciation ; rupture assumée en 2.0.0. |
| Styles | PrimeFlex 4 conservé en peerDependency ; la bibliothèque n'impose aucun thème | Passer à Tailwind obligerait toutes les applications consommatrices à l'installer : hors périmètre. |
| Stratégie | Hybride : `ng update` palier par palier pour Angular ; PrimeNG maintenu en 17.18 jusqu'à Angular 18, puis un seul refactor PrimeNG au palier 19 | Les schématiques officielles gèrent `angular.json` et les `tsconfig` ; le refactor PrimeNG se fait une fois au lieu de six. PrimeNG 17.18 n'accepte qu'Angular 17 et 18 (vérifié sur npm). |
| rxweb 13.0.1 | Conservé et validé au build ; repli documenté | Le paquet est compilé en Ivy partiel, que le linker Angular 22 sait traiter. Il n'a pas de version récente. |
| Tests | Karma et Jasmine conservés via `@angular/build:karma` | Une bascule vers Vitest est hors périmètre. |
| Versions des bibliothèques | `primeng-core` 1.0.3 vers 2.0.0 ; `utils` 1.0.0 vers 2.0.0 | Les `peerDependencies` changent de majeure et l'API publique du module change. |
| Publication npm | Aucune dans ce travail | La publication reste la décision du mainteneur. |

## 4. Chemin de migration

Chaque palier se termine par `npm run build:prod` vert pour les deux bibliothèques et un commit dédié sur la branche `chore/migrate-angular-22`.

| Palier | Commande principale | Particularités |
|---|---|---|
| 16 vers 17 | `ng update @angular/core@17 @angular/cli@17 ng-packagr@17` | PrimeNG monté en 17.18. zone.js et TypeScript suivent le schématique. |
| 17 vers 18 | `ng update @angular/core@18 @angular/cli@18 ng-packagr@18` | PrimeNG reste en 17.18. |
| 18 vers 19 | `ng update @angular/core@19 @angular/cli@19 ng-packagr@19` puis PrimeNG 19 | Palier du refactor PrimeNG (section 5). Angular 19 rend `standalone: true` par défaut : le schématique ajoute `standalone: false` aux composants déclarés dans le module. |
| 19 vers 20 | `ng update @angular/core@20 @angular/cli@20 ng-packagr@20` puis PrimeNG 20 | Builders migrés vers `@angular/build`. PrimeNG 20 ajoute `@angular/router`, `@angular/animations` et `@angular/platform-browser` à ses peers. |
| 20 vers 21 | `ng update @angular/core@21 @angular/cli@21 ng-packagr@21` puis PrimeNG 21 | |
| 21 vers 22 | `ng update @angular/core@22 @angular/cli@22 ng-packagr@22` puis PrimeNG 22 | TypeScript 6.0 exigé par ng-packagr 22. PrimeNG 22 exige `@angular/cdk` `^22.1.0`. |

Si un `ng update` refuse de s'exécuter à cause d'une dépendance tierce dont la plage de peerDependencies est trop stricte, l'option `--force` est utilisée pour ce palier et la dépendance est montée à la main dans le même commit.

Le `package-lock.json` est ignoré par le `.gitignore` actuel ; il le reste. L'installation se fait avec `npm install` à chaque palier.

## 5. Refactor PrimeNG dans PrimengCoreModule

Fichier concerné : `projects/primeng-core/src/lib/primeng-core.module.ts`.

Renommages (ancien module vers nouveau module, même rôle) :

| Ancien | Nouveau |
|---|---|
| `DropdownModule` (`primeng/dropdown`) | `SelectModule` (`primeng/select`) |
| `CalendarModule` (`primeng/calendar`) | `DatePickerModule` (`primeng/datepicker`) |
| `InputSwitchModule` (`primeng/inputswitch`) | `ToggleSwitchModule` (`primeng/toggleswitch`) |
| `InputTextareaModule` (`primeng/inputtextarea`) | `TextareaModule` (`primeng/textarea`) |
| `SidebarModule` (`primeng/sidebar`) | `DrawerModule` (`primeng/drawer`) |
| `OverlayPanelModule` (`primeng/overlaypanel`) | `PopoverModule` (`primeng/popover`) |
| `TabViewModule` et `TabMenuModule` | `TabsModule` (`primeng/tabs`) |
| `StepsModule` (`primeng/steps`) | `StepperModule` (`primeng/stepper`) |

Retraits sans remplacement dans le module : `SlideMenuModule`, `ChipsModule`, `MessagesModule`, `VirtualScrollerModule`. Les équivalents PrimeNG (TieredMenu, AutoComplete en mode multiple, Message, Scroller) sont déjà exportés ou s'importent côté application.

Inchangés : les services `ConfirmationService`, `MessageService`, `DialogService`, les directives `pButton`, `pRipple`, `pTooltip`, `pTemplate`, et tous les autres modules listés aujourd'hui.

Templates internes à adapter : `dropdown-field.component.html` et `table.component.html` utilisent `<p-dropdown>`, qui devient `<p-select>`. Les attributs utilisés (`options`, `optionLabel`, `optionValue`, `placeholder`, `showClear`, événements) gardent le même nom. Toute autre différence découverte à la compilation est corrigée dans le même commit et notée dans le CHANGELOG.

## 6. Styles et thème

- `projects/primeng-core/src/styles/styles.scss` est vide et la configuration `ng-package.json` qui copie `src/styles` reste telle quelle.
- La bibliothèque n'importe aucun thème et ne déclare aucune dépendance de thème. Le README documente, pour l'application consommatrice :
  - l'installation de `@primeuix/themes` ;
  - l'appel `providePrimeNG({ theme: { preset: Aura }, ripple: true })` dans `app.config.ts`, le ripple étant désactivé par défaut depuis PrimeNG 18 ;
  - l'import de `primeflex/primeflex.css` et `primeicons/primeicons.css`.

## 7. Dépendances tierces et peerDependencies cibles

`projects/primeng-core/package.json` (peerDependencies après migration) :

| Paquet | Avant | Après |
|---|---|---|
| `@angular/common`, `@angular/core` | `^16.2.0` | `^22.0.0` |
| `primeng` | `^16.0.2` | `^22.0.0` |
| `primeicons` | `^6.0.1` | `^7.0.0 \|\| ^8.0.0` |
| `primeflex` | `^3.3.1` | `^4.0.0` |
| `@fullcalendar/angular` | `^6.0.3` | `^7.0.0` |
| `@fullcalendar/core`, `daygrid`, `interaction`, `timegrid` | `^6.0.3` | remplacés par `fullcalendar` `^7.0.0` et `temporal-polyfill` `^1.0.1`, exigés par `@fullcalendar/angular` 7 |
| `@rxweb/reactive-form-validators` | `^13.0.1` | `^13.0.1` (voir repli) |
| `@auth0/angular-jwt` | `^5.2.0` | `^5.2.0` |
| `chart.js` | `^4.5.1` | `^4.5.1` |
| `rxjs` | `^7.8.0` | `^7.8.0` |
| `zone.js` | `^0.13.0` | `^0.15.0` |

Nouveaux peers à ajouter car le module les importe déjà sans les déclarer : `ngx-spinner` `^22.0.0`, `ngx-extended-pdf-viewer` `^31.0.0`, `crypto-js` `^4.2.0`.

`projects/utils/package.json` : `@angular/common` et `@angular/core` passent en `^22.0.0`.

Le `package.json` racine suit les mêmes versions dans `dependencies` et `devDependencies`. Les dépendances racine qu'aucune bibliothèque n'importe (`sweetalert2`, `@angular/animations` si inutilisé après migration) ne sont pas retirées : hors périmètre.

Repli rxweb : si le build Angular 22 échoue sur `@rxweb/reactive-form-validators` et que la cause est le linker ou une API Angular retirée, alors `RxReactiveFormsModule` est retiré des imports et exports du module, la peerDependency est supprimée, et le CHANGELOG indique que les applications doivent l'importer elles-mêmes.

## 8. Configuration du workspace

- `angular.json` : builders `@angular-devkit/build-angular:ng-packagr` et `:karma` remplacés par `@angular/build:ng-packagr` et `@angular/build:karma` ; `@angular-devkit/build-angular` retiré des devDependencies.
- `tsconfig.json`, `tsconfig.dev.json`, `tsconfig.prod.json` : modifications appliquées par les schématiques `ng update` (notamment `moduleResolution: bundler`). Les options strictes existantes sont conservées. `tsconfig.lib.prod.json` garde `compilationMode: partial`.
- `package.json` racine : les scripts existants gardent leurs noms. Le script `force-clean`, qui dépend de `taskkill` propre à Windows, n'est pas touché.
- Les fichiers `docs/config/*.txt` (copies des tsconfig) sont mis à jour pour refléter les versions finales, puisqu'ils servent de référence.

## 9. Vérification

À chaque palier :

1. `npm install`
2. `npm run build:prod`

En fin de migration :

1. `npm test` (Chrome présent).
2. Lire `dist/primeng-core/package.json` et vérifier les `peerDependencies`, `version` et points d'entrée.
3. Dans un dossier temporaire hors du dépôt : `npx @angular/cli@22 new smoke --standalone --skip-git --style=css`, installer le tarball de `dist/primeng-core` et ses peers, importer `PrimengCoreModule` dans un composant, configurer `providePrimeNG` avec Aura, et exécuter `ng build`. Cette application est jetable et n'entre pas dans le dépôt.

## 10. Livrables

- Branche `chore/migrate-angular-22`, un commit par palier plus un commit pour documentation et versions.
- `CHANGELOG.md` réécrit : section « 2.0.0 » avec les ruptures (modules renommés et retirés, peers Angular 22 et PrimeNG 22, FullCalendar 7, thème à fournir par l'application), à la place des hashes factices actuels.
- `README.md` : prérequis, installation des peers, configuration `providePrimeNG`, exemple d'import du module.
- `version` à `2.0.0` dans les deux `package.json` de bibliothèque.
- Aucune publication npm, aucun push sans accord explicite.

## 11. Hors périmètre

- Passage des composants en standalone ou adoption du nouveau control flow dans les templates.
- Bascule des tests vers Vitest.
- Remplacement de PrimeFlex par Tailwind.
- Nettoyage des dépendances racine inutilisées.
- Publication de `@logusbrain/utils` sur npm.
