# Showcase for Semantic Canvas

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.11.

## Installation

### 1. Install with npm:

```
npm i @semantic-canvas/semantic-canvas-core
```

### 2. Add Angular Material Color Theme:

```
ng add @angular/material
```

### 3. Add library assets to your project

Navigate to angular.json
```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@semantic-canvas/semantic-canvas-core/lib/assets",
    "output": "./assets/"
  }
]
```

### 4. Import module

Navigate to app.module.ts
```
import { SemanticCanvasCoreModule } from '@semantic-canvas/semantic-canvas-core';
```

```
imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SemanticCanvasCoreModule    // add this line
],
```

## Example

```html
<sem-semantic-canvas></sem-semantic-canvas>
```

## Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
