import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CapInputTextComponent } from "../cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";
import { MaterializeDirective } from "angular2-materialize";
import { CapSelectComponent } from "../cap-select/cap-select.component";
import { CapDateRangePickerComponent } from "../cap-dateRangePicker/cap-dateRangePicker.component";
import { DateRangeDirective } from "../directives/date-range.directive";
import { CapDatepickerComponent } from "../cap-datepicker/cap-datepicker.component";
import { DatepickerDirective } from "../directives/datepicker.directive";
import { CapButtonComponent } from "../cap-button/cap-button.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CapInputTextComponent, CapDatepickerComponent, CapSelectComponent, CapDateRangePickerComponent, MaterializeDirective, DateRangeDirective, DatepickerDirective, CapButtonComponent],
  exports: [CapInputTextComponent, CapSelectComponent, CapDatepickerComponent, CapDateRangePickerComponent, MaterializeDirective, DateRangeDirective, DatepickerDirective, CapButtonComponent]
})
export class BRCAPModule {}
