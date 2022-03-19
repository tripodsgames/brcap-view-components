import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectModule } from "ng-select";
import { DpDatePickerModule } from "ng2-date-picker";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CapBtnCollapseComponent } from "../cap-btnCollapse/cap-btnCollapse.component";
import { CapButtonComponent } from "../cap-button/cap-button.component";
import { CapCardComponent } from "../cap-card/cap-card.component";
import { CapCheckBoxComponent } from "../cap-checkbox/cap-checkbox.component";
import { CapChipsComponent } from "../cap-chips/cap-chips.component";
import { CapDatepickerComponent } from "../cap-datepicker/cap-datepicker.component";
import { CapDateRangePickerComponent } from "../cap-dateRangePicker/cap-dateRangePicker.component";
import { CapDivisorComponent } from "../cap-divisor/cap-divisor.component";
import { CapHeaderComponent } from "../cap-header/cap-header.component";
import { CapHintComponent } from "../cap-hint/cap-hint.component";
import { CapIconComponent } from "../cap-icon/cap-icon.component";
import { CapInputTextComponent } from "../cap-inputText/cap-inputText.component";
import { CapInputTextAreaComponent } from "../cap-inputTextArea/cap-inputTextArea.component";
import { CapLoadingComponent } from "../cap-loading/cap-loading.component";
import { CapLoginAdComponent } from "../cap-login-ad/cap-login-ad.component";
import { CapLoginComponent } from "../cap-login/cap-login.component";
import { CapMenuComponent } from "../cap-menu/cap-menu.component";
import { CapMenuItemComponent } from "../cap-menuItem/cap-menuItem.component";
import { CapModalComponent } from "../cap-modal/cap-modal.component";
import { CapMonthPickerComponent } from "../cap-monthpicker/cap-monthpicker.component";
import { CapMultiSelectComponent } from "../cap-multi-select/cap-multi-select.component";
import { CapPaginationComponent } from "../cap-pagination/cap-pagination.component";
import { CapPasswordComponent } from "../cap-password/cap-password.component";
import { PermissoesComponent } from "../cap-permissoes/cap-permissoes.component";
import { CapRadioComponent } from "../cap-radio/cap-radio.component";
import { CapScrollUpComponent } from "../cap-scrollUp/cap-scrollUp.component";
import { CapSelectComponent } from "../cap-select/cap-select.component";
import { CapTabComponent } from "../cap-tab/cap-tab.component";
import { CapTablePaginationComponent } from "../cap-table-pagination/cap-table-pagination.component";
import { CapTableComponent } from "../cap-table/cap-table.component";
import { CapTabPanelComponent } from "../cap-tabPanel/cap-tabPanel.component";
import { CapToggleComponent } from "../cap-toggle/cap-toggle.component";
import { CpfPipe } from "../pipes/cpf.pipe";
import { ExportXLSService } from "../services/export-xls.service";
import { LoginAdService } from "../services/login-ad.service";
import { LoginService } from "../services/login.service";
import { PlataformaService } from "../services/plataforma.service";
import { UsuarioService } from "../services/usuario.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SelectModule,
    DpDatePickerModule,
    Ng2SearchPipeModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    CapInputTextComponent,
    CapDatepickerComponent,
    CapSelectComponent,
    CapDateRangePickerComponent,
    CapButtonComponent,
    CapPaginationComponent,
    CapMenuItemComponent,
    CapMenuComponent,
    CapIconComponent,
    CapRadioComponent,
    CapHeaderComponent,
    CapInputTextAreaComponent,
    CapCheckBoxComponent,
    CapToggleComponent,
    CapChipsComponent,
    CapTabPanelComponent,
    CapTabComponent,
    CapDivisorComponent,
    CapCardComponent,
    CapTableComponent,
    CapScrollUpComponent,
    CapHintComponent,
    CapLoadingComponent,
    CapPasswordComponent,
    CapBtnCollapseComponent,
    CpfPipe,
    CapTablePaginationComponent,
    CapMonthPickerComponent,
    CapLoginComponent,
    CapLoginAdComponent,
    PermissoesComponent,
    CapModalComponent,
    CapMultiSelectComponent
  ],
  exports: [
    CapInputTextComponent,
    CapDatepickerComponent,
    CapSelectComponent,
    CapDateRangePickerComponent,
    CapButtonComponent,
    CapPaginationComponent,
    CapMenuItemComponent,
    CapMenuComponent,
    CapScrollUpComponent,
    CapHintComponent,
    CapLoadingComponent,
    CapIconComponent,
    CapRadioComponent,
    CapHeaderComponent,
    CapInputTextAreaComponent,
    CapCheckBoxComponent,
    CapToggleComponent,
    CapChipsComponent,
    CapTabPanelComponent,
    CapTabComponent,
    CapDivisorComponent,
    CapCardComponent,
    CapTableComponent,
    CapPasswordComponent,
    CapBtnCollapseComponent,
    CpfPipe,
    CapTablePaginationComponent,
    CapMonthPickerComponent,
    CapLoginComponent,
    CapLoginAdComponent,
    PermissoesComponent,
    CapModalComponent,
    CapMultiSelectComponent
  ],
  providers: [
    LoginService,
    LoginAdService,
    UsuarioService,
    PlataformaService,
    ExportXLSService,
  ]
})
class BRCapModule { }

export {
  BRCapModule,
  ExportXLSService
};

