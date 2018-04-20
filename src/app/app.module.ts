import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CapInputTextComponent } from './cap-inputText/cap-inputText.component';
@NgModule({
  declarations: [
    AppComponent,
    CapInputTextComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
