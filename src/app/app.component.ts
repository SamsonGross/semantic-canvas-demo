import { Component } from '@angular/core';
import { ICanvasElementShape } from '@semantic-canvas/semantic-canvas-core/lib/canvas/domain/ICanvasElementShape';
import { IModelPackage } from '@semantic-canvas/semantic-canvas-core/lib/library/domain/IModelPackage';

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
  myCustomShape: ICanvasElementShape = {
    name: 'MyCustomShape',                       // name of the shape
    width: 200,                                  // default width of the shape (DEFAULT: 160)
    height: 150,                                 // default height of the shape (DEFAULT: 100)
    backgroundColor: '#eb5e34',                  // color of background (DEFAULT: #81DAF5)
    borderRadius: 5,                             // radius of the border (DEFAULT: 0)
    borderColor: 'gray',                         // color of the border (DEFAULT: black)
    borderWidth: 6,                              // width of the border (DEFAULT: 1)
  };

  /*
   * Second, define your custom model package including all your elements (and relations).
   * All defined elements can be used on the canvas.
   */
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
}
