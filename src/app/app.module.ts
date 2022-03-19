import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from "./app.component";
import { BRCapModule } from "./modules/brcap.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BRCapModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
