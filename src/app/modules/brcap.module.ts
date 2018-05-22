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
import { CapPaginationComponent } from "../cap-pagination/cap-pagination.component";
import { CapMenuItemComponent } from "../cap-menuItem/cap-menuItem.component";
import { CapMenuComponent } from "../cap-menu/cap-menu.component";
import { CapIconComponent } from "../cap-icon/cap-icon.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  declarations: [
    CapInputTextComponent,
    CapDatepickerComponent,
    CapSelectComponent,
    CapDateRangePickerComponent,
    MaterializeDirective,
    DateRangeDirective,
    DatepickerDirective,
    CapButtonComponent,
    CapPaginationComponent,
    CapMenuItemComponent,
    CapMenuComponent,
    CapIconComponent
  ],
  exports: [
    CapInputTextComponent,
    CapSelectComponent,
    CapDatepickerComponent,
    CapDateRangePickerComponent,
    MaterializeDirective,
    DateRangeDirective,
    DatepickerDirective,
    CapButtonComponent,
    CapPaginationComponent,
    CapMenuItemComponent,
    CapMenuComponent,
    CapIconComponent
  ]
})
export class BRCapModule {}
