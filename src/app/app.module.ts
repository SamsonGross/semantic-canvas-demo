import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SemanticCanvasCoreModule } from '@semantic-canvas/semantic-canvas-core';
import { StickyNotesModule } from '@semantic-canvas/sticky-notes';
import { FormsModule } from '@angular/forms';

import { GreetingsComponent } from './greetings/greetings.component';



@NgModule({
  declarations: [
    AppComponent,
    GreetingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SemanticCanvasCoreModule,
    StickyNotesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
