import { Component, OnInit } from '@angular/core';
import { CanvasComponent, AttributeFactory, EAttributeType } from '@semantic-canvas/semantic-canvas-core';
import { ModelAttribute } from '@semantic-canvas/semantic-canvas-core/lib/attributes/domain/ModelAttribute';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent extends CanvasComponent implements OnInit {
  nameAttribute: ModelAttribute;

  constructor() {
    super()
  }

  ngOnInit(): void {
      this.checkNameAttribute();
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
