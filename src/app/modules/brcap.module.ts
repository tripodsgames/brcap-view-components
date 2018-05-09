import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CapInputTextComponent } from "../cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CapInputTextComponent],
  exports: [CapInputTextComponent]
})
export class BRCAPModule {}
