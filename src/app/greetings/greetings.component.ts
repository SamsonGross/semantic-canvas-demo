import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
  }

  greet() {
    alert('Hello ' + this.name + '!');
  }
}
