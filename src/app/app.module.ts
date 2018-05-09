import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { BRCAPModule } from "../app/modules/brcap.module";
import { CapInputTextComponent } from "./cap-inputText/cap-inputText.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BRCAPModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
