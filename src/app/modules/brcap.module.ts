import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CapInputTextComponent } from "../cap-inputText/cap-inputText.component";
import { FormsModule } from "@angular/forms";
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
import { CapRadioComponent } from "../cap-radio/cap-radio.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CapHeaderComponent } from "../cap-header/cap-header.component";
import { CapInputTextAreaComponent } from "../cap-inputTextArea/cap-inputTextArea.component";

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  declarations: [
    CapInputTextComponent,
    CapDatepickerComponent,
    CapSelectComponent,
    CapDateRangePickerComponent,
    DateRangeDirective,
    DatepickerDirective,
    CapButtonComponent,
    CapPaginationComponent,
    CapMenuItemComponent,
    CapMenuComponent,
    CapIconComponent,
    CapRadioComponent,
    CapHeaderComponent,
    CapInputTextAreaComponent
  ],
  exports: [
    CapInputTextComponent,
    CapSelectComponent,
    CapDatepickerComponent,
    CapDateRangePickerComponent,
    DateRangeDirective,
    DatepickerDirective,
    CapButtonComponent,
    CapPaginationComponent,
    CapMenuItemComponent,
    CapMenuComponent,
    CapIconComponent,
    CapRadioComponent,
    CapHeaderComponent,
    CapInputTextAreaComponent
  ]
})
export class BRCapModule {}
