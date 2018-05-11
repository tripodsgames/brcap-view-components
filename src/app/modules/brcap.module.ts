import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CapInputTextComponent } from "../cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";
import { MaterializeDirective } from "angular2-materialize";
import { CapSelectComponent } from "../cap-select/cap-select.component";
import { CapDateRangePickerComponent } from "../cap-dateRangePicker/cap-dateRangePicker.component";
import { DateRangeDirective } from "../directives/date-range.directive";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CapInputTextComponent, CapSelectComponent, CapDateRangePickerComponent, MaterializeDirective, DateRangeDirective],
  exports: [CapInputTextComponent, CapSelectComponent, CapDateRangePickerComponent, MaterializeDirective, DateRangeDirective]
})
export class BRCAPModule {}
