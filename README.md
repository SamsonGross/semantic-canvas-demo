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
```typescript
import { SemanticCanvasCoreModule } from '@semantic-canvas/semantic-canvas-core';
```

```typescript
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

```typescript
// e.g. app.component.ts

import { ICanvasElementShape } from 'libs/semantic-canvas-core/src/lib/canvas/domain/ICanvasElementShape';

[...]

export class AppComponent {

  [...] 

  myCustomShapes: ICanvasElementShape[] = [{
    name: 'MyCustomShape',                       // name of the shape
    width: 200,                                  // default width of the shape (DEFAULT: 160)
    height: 150,                                 // default height of the shape (DEFAULT: 100)
    backgroundColor: '#eb5e34',                  // color of background (DEFAULT: #81DAF5)
    borderRadius: 5,                             // radius of the border (DEFAULT: 0)
    borderColor: 'gray',                         // color of the border (DEFAULT: black)
    borderWidth: 6,                              // width of the border (DEFAULT: 1)
  }];

  [...]
```

Second, define your custom model package including all your elements (and relations).
All defined elements can be used on the canvas.

```typescript
// e.g. app.component.ts

import { IModelPackage } from 'libs/semantic-canvas-core/src/lib/library/domain/IModelPackage';

[...]

export class AppComponent {

  [...] 
  
  myCustomModelPackages: IModelPackage[] = [{
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
  }];

  [...] 
```

Third, hand over the created forms and packages to the canvas

```html
// e.g. app.component.html

<sem-semantic-canvas 
  [elementShapes]="myCustomShapes"
  [modelPackages]="myCustomModelPackages"
>
</sem-semantic-canvas>
```

The code can be found here: https://github.com/SamsonGross/semantic-canvas-demo 

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

  myCustomModelPackages: IModelPackage[] = [
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
  [modelPackages]="myCustomModelPackages"
  [shapeFactories]="myCustomFactories"
>
</sem-semantic-canvas>

```


## 3.2. Example: #StaySemantified
You should always use domain-model-attributes in your component to stay semantified

```typescript
// greetings.component.ts

import { CanvasComponent, AttributeFactory, EAttributeType } from '@semantic-canvas/semantic-canvas-core';
import { ModelAttribute } from '@semantic-canvas/semantic-canvas-core/lib/attributes/domain/ModelAttribute';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent extends CanvasComponent implements OnInit {
  nameAttribute: ModelAttribute;        // change your string value to ModelAttribute

  constructor() {
    super()
  }

  ngOnInit(): void {
      this.checkNameAttribute();      // make sure that your component owns the name-attribute
  }

  greet() {
    alert('Hello ' + this.nameAttribute.value + '!');
  }

  private checkNameAttribute() {
    // Check if there is a text attributet
    for (const attribute of this.canvasElement.representedDomainElement.attributes) {
      if (attribute.name === 'Name') {
        this.nameAttribute = attribute;
      }
    }

    // if there is no text attribute, create a new one
    if (!this.nameAttribute) {
      this.nameAttribute = AttributeFactory.create(EAttributeType.Text);
      this.nameAttribute.name = 'Name';
      this.canvasElement.representedDomainElement.addAttribute(this.nameAttribute);
    }
  }
}
```

```html
<!-- greetings.component.html -->

<div>
  <label>Who would you like to greet?</label>
  <input type="text" [(ngModel)]="nameAttribute.value" placeholder="Enter name..">
  <button (click)="greet()">Greet</button>
</div>

```


## 4. Example: Use predefined shape libraries

### 1. Install StickyNotes with npm:

```
npm install @semantic-canvas/sticky-notes
```

### 2. Add library assets to your project

Navigate to angular.json

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@semantic-canvas/sticky-notes/assets",
    "output": "./assets/"
  }
]
```

### 3. Import module

Navigate to app.module.ts

```typescript
import { StickyNotesModule } from '@semantic-canvas/sticky-notes';

imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SemanticCanvasCoreModule,
    StickyNotesModule
],
```

### 4. Define StickyNote shapes

```typescript
// app.component.ts
import { ICanvasElementShape } from '@semantic-canvas/semantic-canvas-core/lib/canvas/domain/ICanvasElementShape';

myCustomShapes: ICanvasElementShape[] = [
    {
      name: 'StickyNoteYellow',
      width: 170,
      height: 70,
      containerShadow: false,
      iconUrl: 'assets/stickynotes/StickyNoteYellow.svg'
    }, {
      name: 'StickyNoteBlue',
      width: 170,
      height: 70,
      containerShadow: false,
      iconUrl: 'assets/stickynotes/StickyNoteBlue.svg'
    }, {
      name: 'StickyNoteGreen',
      width: 170,
      height: 70,
      containerShadow: false,
      iconUrl: 'assets/stickynotes/StickyNoteGreen.svg'
    }, {
      name: 'StickyNoteRed',
      width: 170,
      height: 70,
      containerShadow: false,
      iconUrl: 'assets/stickynotes/StickyNoteRed.svg'
    }
  ];
```

### 5. Define StickyNote model package

```typescript
// app.component.ts
import { IModelPackage } from '@semantic-canvas/semantic-canvas-core/lib/library/domain/IModelPackage';

 myCustomModelPackage: IModelPackage[] = [
    {
      title: 'Sticky Notes',
      description: 'StickyNotes to use on the canvas',
      inToolbar: true,
      model: {
        elements: [
          {
            type: 'StickyNoteYellow',
            name: 'Yellow Sticky Note'
          },
          {
            type: 'StickyNoteRed',
            name: 'Red Sticky Note'
          },
          {
            type: 'StickyNoteBlue',
            name: 'Blue Sticky Note'
          },
          {
            type: 'StickyNoteGreen',
            name: 'Green Sticky Note'
          }
        ],
        relations: [
          // none yet
        ]
      }
    }
  ];
```

### 6. Define StickyNote ShapeFactories

```typescript
// app.component.ts
import { GenericCanvasFactory } from '@semantic-canvas/semantic-canvas-core';
import { StickyNoteYellowComponent, StickyNoteRedComponent, StickyNoteGreenComponent, StickyNoteBlueComponent } from '@semantic-canvas/sticky-notes';

myCustomFactories: ICanvasShapeFactory[] = [
     {
      type: 'StickyNoteYellow',
      factory: new GenericCanvasFactory<StickyNoteYellowComponent>(StickyNoteYellowComponent)
    },
    {
      type: 'StickyNoteRed',
      factory: new GenericCanvasFactory<StickyNoteRedComponent>(StickyNoteRedComponent)
    },
    {
      type: 'StickyNoteGreen',
      factory: new GenericCanvasFactory<StickyNoteGreenComponent>(StickyNoteGreenComponent)
    },
    {
      type: 'StickyNoteBlue',
      factory: new GenericCanvasFactory<StickyNoteBlueComponent>(StickyNoteBlueComponent)
    }
  ];
```

### 7. Add canvas parameter

```html
<!-- app.component.html-->

<sem-semantic-canvas
  [elementShapes]="myCustomShapes"
  [modelPackages]="myCustomModelPackage"
  [shapeFactories]="myCustomFactories"
>
</sem-semantic-canvas>
```

## Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

