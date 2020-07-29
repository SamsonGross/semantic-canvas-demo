import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SemanticCanvasCoreModule } from '@semantic-canvas/semantic-canvas-core';   // add this line
import { FormsModule } from '@angular/forms';                                       // add this line

import { GreetingsComponent } from './greetings/greetings.component';



@NgModule({
  declarations: [
    AppComponent,
    GreetingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,                  // add this line
    SemanticCanvasCoreModule      // add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
