import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { BRCapModule } from "./modules/brcap.module";
import { TelaLoginComponent } from './tela-login/tela-login.component';

@NgModule({
  declarations: [AppComponent, TelaLoginComponent],
  imports: [BrowserModule, CommonModule, FormsModule, BRCapModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
