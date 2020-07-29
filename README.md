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

## 3.1. Example: Use your own components as shapes on the canvas
Use CanvasFactories to bring your own components on the canvas

First, create a new component using Angular CLI

```
ng g c Greetings
```

Second, design your component

```html
<!-- greetings.component.html -->

<div>
  <label>Who would you like to greet?</label>
  <input type="text" [(ngModel)]="name" placeholder="Enter name..">
  <button (click)="greet()">Greet</button>
</div>
```

```css
/* greetings.component.css / .scss */

div {
  display: inline-block;
  width: 300px;
  padding: 20px;
  background-color: #f2f2f2;
}

input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #ee8d32;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c54b12;
}
```

```typescript
// greetings.component.ts

import { CanvasComponent } from '@semantic-canvas/semantic-canvas-core';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent extends CanvasComponent implements OnInit {
  name: string = '';

  constructor() {
    super()
  }

  ngOnInit(): void { }

  greet() {
    alert('Hello ' + this.name + '!');
  }
}
```

Third, use CanvasFactory to create your custom elements by your component.

```typescript
// app.module.ts

import { SemanticCanvasCoreModule } from '@semantic-canvas/semantic-canvas-core';
import { FormsModule } from '@angular/forms';

[...]

imports: [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,                  // add this line
  SemanticCanvasCoreModule      // add this line
]
```

```typescript
// app.component.ts

import { GenericCanvasFactory } from '@semantic-canvas/semantic-canvas-core';
import { ICanvasElementShape } from '@semantic-canvas/semantic-canvas-core/lib/canvas/domain/ICanvasElementShape';
import { IModelPackage } from '@semantic-canvas/semantic-canvas-core/lib/library/domain/IModelPackage';
import { ICanvasShapeFactory } from '@semantic-canvas/semantic-canvas-core/lib/canvas/domain/ICanvasShapeFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'semanticCanvasDemo';
  myCustomShapes: ICanvasElementShape[] = [
    {
      name: 'GreetingsShape'
    }
  ];

  myCustomModelPackage: IModelPackage[] = [
    {
      title: 'My Greetings',
      description: 'Greetings from me!',
      inToolbar: true,
      model: {
        elements: [
          {
            name: 'Greetings',
            type: 'GreetingsShape'
          }
        ],
        relations: []
      }
    }
  ];


  myCustomFactories: ICanvasShapeFactory[] = [
    {
      type: 'GreetingsShape',
      factory: new GenericCanvasFactory<GreetingsComponent>(GreetingsComponent)
    }
  ];
}
```

```html
<!-- app.component.html -->

<sem-semantic-canvas
  [elementShapes]="myCustomShapes"
  [modelPackages]="myCustomModelPackage"
  [shapeFactories]="myCustomFactories"
>
</sem-semantic-canvas>

```

## 3.2. Example: Keep your own components semantified
tbd

## 4. Example: Use your own components as shapes on the canvas
tbd

## Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
