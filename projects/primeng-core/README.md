# @logusbrain/primeng-core

**@logusbrain/primeng-core** is an Angular library developed by **LogusBrain**. It is built on [PrimeNG v16](https://www.primefaces.org/primeng/) and provides reusable, consistent, and customized components for building robust and performant enterprise applications. This library facilitates the integration of PrimeNG components with enhancements tailored to your business needs.

## 📦 Installation

Before installing, ensure your project is using Angular and PrimeNG v16.

```bash
# If you encounter peer dependency issues:
npm install @logusbrain/primeng-core --legacy-peer-deps
# Else
npm install @logusbrain/primeng-core
```

## 🛠️ Prerequisites

Angular: Version 16 or higher

PrimeNG: Version 16 (required for compatibility)

## 🔧 Usage

Once installed, you can import the @logusbrain/primeng-core modules into your Angular module to start using the components:

 ```bash
import { PrimengCoreModule } from '@logusbrain/primeng-core';

@NgModule({  
  // Imports other modules required for this module to function
  imports: [
    PrimengCoreModule, // Custom module that bundles PrimeNG components used in the app
  ],

  providers: [
    // Required: Injection tokens necessary for configuring the app per environment
    { provide: API_ENDPOINT, useValue: <environment.apiUrl> }, // Base URL of the backend API
    { provide: CLIENT_ID, useValue: <environment.clientId> }, // OAuth client ID
    { provide: CLIENT_KEY, useValue: <environment.clientKey> }, // OAuth client secret or key
    { provide: LOGUSBRAIN_ID, useValue: <environment.lbId> }, // ID for external service LogusBrain
    { provide: LOGUSBRAIN_KEY, useValue: <environment.lbKey> }, // Key for LogusBrain service
  ],
})
export class AppModule { }
```

Please refer to the specific component documentation for more details on configurations and available options.

## 📚 Documentation

The full documentation for components and their APIs is available in the docs/ folder of this repository. (Unavailable now)

## 🔄 Versions

 ```text
Version | Description
-------------------------------------------------------------
1.0.3   | PrimeNG v16 compatible, first components available.
```

npm deprecate @logusbrain/primeng-core@1.0.2 "This version is deprecated. Use version 1.0.3 or higher."

## 🔹 Key points

Clear update on PrimeNG version (v16) to avoid confusion.

Well-defined structure for easy installation, usage, and contribution.

Prerequisites and Versions sections for clarity.

## 🛠 Key Features

* 📁 Customized partial components

* 🔒 Integrated security services

* 🔧 Common utility services

* 📦 Modular architecture
