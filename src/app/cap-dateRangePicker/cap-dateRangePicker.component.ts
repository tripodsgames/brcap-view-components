import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import flatpickr from 'flatpickr';
import * as jqueryProxy from "jquery";
import "jquery-mask-plugin";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapDateRangePickerComponent),
  multi: true
};

@Component({
  selector: "cap-dateRangePicker",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-dateRangePicker.component.html",
  styleUrls: ["./cap-dateRangePicker.component.scss"]
})
export class CapDateRangePickerComponent implements ControlValueAccessor, OnInit {
  @Input("id")
  id: string;

  @Input("styleClass")
  styleClass: string;

  @Input("label")
  label: string;

  @Input("placeholder")
  placeholder: string;

  @Input("name")
  name: string;

  @Input("mask")
  mask: string;

  @Input("textHelper")
  textHelper: string;

  @Input("clearBtn")
  clearBtn: boolean;

  @Input("disabled")
  disabled: boolean;

  @ViewChild("datePicker", { static: true })
  datePicker: ElementRef<HTMLInputElement>;

  @ViewChild("divRange")
  divRange: ElementRef<HTMLDivElement>;

  private innerValue: any = new Date(Date.now());

  public datePickerOptions: flatpickr.Options.Options = {
    locale: 'pt',
    dateFormat: 'dd/MM/yyyy'
  };

  public myDatePickerOptions: any = {
    dateFormat: "dd/mm/yyyy",
    showApplyBtn: false,
    dayLabels: {
      su: "DOM",
      mo: "SEG",
      tu: "TER",
      we: "QUA",
      th: "QUI",
      fr: "SEX",
      sa: "SÁB"
    },
    monthLabels: {
      1: "JAN",
      2: "FEV",
      3: "MAR",
      4: "ABR",
      5: "MAI",
      6: "JUN",
      7: "JUL",
      8: "AGO",
      9: "SET",
      10: "OUT",
      11: "NOV",
      12: "DEZ"
    },
    firstDayOfWeek: "su",
    sunHighlight: false,
    markCurrentDay: false,
    selectorHeight: "320px",
    selectorWidth: "300px",
    height: "50px",
    selectBeginDateTxt: "Selecione a data inicial",
    selectEndDateTxt: "Selecione a data final",
    openSelectorOnInputClick: true,
    showClearBtn: false
  };

  ngOnInit() {
    flatpickr(this.datePicker.nativeElement, this.datePickerOptions);
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
