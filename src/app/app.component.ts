import { Component } from '@angular/core';
import { GreetingsComponent } from './greetings/greetings.component';
import { GenericCanvasFactory } from '@semantic-canvas/semantic-canvas-core';
import { ICanvasElementShape } from '@semantic-canvas/semantic-canvas-core/lib/canvas/domain/ICanvasElementShape';
import { IModelPackage } from '@semantic-canvas/semantic-canvas-core/lib/library/domain/IModelPackage';
import { ICanvasShapeFactory } from '@semantic-canvas/semantic-canvas-core/lib/canvas/domain/ICanvasShapeFactory';
import { StickyNoteYellowComponent, StickyNoteRedComponent, StickyNoteGreenComponent, StickyNoteBlueComponent } from '@semantic-canvas/sticky-notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'semanticCanvasDemo';

  /*
   * First, you must define your custom shape to use it as the type for your custom element.
   * Once defined, this shape can be used as the type of different elements.
   */
  myCustomShapes: ICanvasElementShape[] = [
    // first custom shape (Example 2)
    {
      name: 'MyCustomShape',                       // name of the shape
      width: 200,                                  // default width of the shape (DEFAULT: 160)
      height: 150,                                 // default height of the shape (DEFAULT: 100)
      backgroundColor: '#eb5e34',                  // color of background (DEFAULT: #81DAF5)
      borderRadius: 5,                             // radius of the border (DEFAULT: 0)
      borderColor: 'gray',                         // color of the border (DEFAULT: black)
      borderWidth: 6,                              // width of the border (DEFAULT: 1)
    },
    // Greetings shape (Example 3)
    {
      name: 'GreetingsShape'
    },
    // Sticky Notes (Example 4)
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

  /*
   * Second, define your custom model package including all your elements (and relations).
   * All defined elements can be used on the canvas.
   */
  myCustomModelPackage: IModelPackage[] = [
    // first custom element (Example 2)
    {
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
    },
    // Greeting package (Example 3)
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
    },
    // Sticky note package (Example 4)
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

  // Third, you can add custom shape factories to bring your own components on the canvas
  myCustomFactories: ICanvasShapeFactory[] = [
    // Greeting Shape (Example 3)
    {
      type: 'GreetingsShape',
      factory: new GenericCanvasFactory<GreetingsComponent>(GreetingsComponent)
    },
     // Sticky Notes (Example 4)
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
}
