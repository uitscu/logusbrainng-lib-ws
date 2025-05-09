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

## 🧪 Run Tests

ng test primeng-core
ng test utils

## 🧰 Usage

Import the library into your Angular module:

 ```text
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
