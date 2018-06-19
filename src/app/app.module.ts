import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from '@angular/common';

import { CapInputTextComponent } from "./cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";
import { BRCapModule } from "./modules/brcap.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, FormsModule, BRCapModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
