# Showcase for Semantic Canvas
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

Check out: https://samsongross.github.io/semantic-canvas-demo/ 

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

## 1. Example: Basic Canvas

```html
<sem-semantic-canvas></sem-semantic-canvas>
```

## 2. Example: Add custom shapes and elements

First, you must define your custom shape to use it as the type for your custom element.
Once defined, this shape can be used as the type of different elements.

```
// e.g. app.component.ts

import { ICanvasElementShape } from 'libs/semantic-canvas-core/src/lib/canvas/domain/ICanvasElementShape';

[...]

export class AppComponent {

  [...] 

  myCustomShape: ICanvasElementShape = {
    name: 'MyCustomShape',                       // name of the shape
    width: 200,                                  // default width of the shape (DEFAULT: 160)
    height: 150,                                 // default height of the shape (DEFAULT: 100)
    backgroundColor: '#eb5e34',                  // color of background (DEFAULT: #81DAF5)
    borderRadius: 5,                             // radius of the border (DEFAULT: 0)
    borderColor: 'gray',                         // color of the border (DEFAULT: black)
    borderWidth: 6,                              // width of the border (DEFAULT: 1)
  };

  [...]
```

Second, define your custom model package including all your elements (and relations).
All defined elements can be used on the canvas.

```
// e.g. app.component.ts

import { IModelPackage } from 'libs/semantic-canvas-core/src/lib/library/domain/IModelPackage';

[...]

export class AppComponent {

  [...] 
  
  myCustomModelPackage: IModelPackage = {
    title: 'myCustomElement',                    // title of the model package
    description:                                 // description of the model package
      'This is my first custom model package!',
    inToolbar: true,                             // shown in toolbar by default
    model: {
      elements: [                                // list of custom elements
        {
          name: 'MyCustomElement',               // name of your custom element
          type: 'MyCustomShape'                  // name of your custom shape (defined above)
        }
      ],
      relations: []                              // list of custom relations
    }
  };

  [...] 
```

Third, hand over the created forms and packages to the canvas

```html
// e.g. app.component.html

<sem-semantic-canvas 
  [elementShapes]="[myCustomShape]"
  [modelPackages]="[myCustomModelPackage]"
>
</sem-semantic-canvas>
```

## 3. Example: Use predefined shape libraries
tbd

## 4. Example: Use your own components as shapes on the canvas
tbd

## Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
