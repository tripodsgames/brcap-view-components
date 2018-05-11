import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { BRCAPModule } from "../app/modules/brcap.module";
import { CapInputTextComponent } from "./cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule , BRCAPModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
