import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { CapInputTextComponent } from "./cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";
import { BRCapModule } from "./modules/brcap.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, BRCapModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
