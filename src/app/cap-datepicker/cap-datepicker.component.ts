import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import flatpickr from 'flatpickr';
import { Portuguese } from "flatpickr/dist/l10n/pt";
import { IMyDpOptions } from "mydatepicker";

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapDatepickerComponent),
  multi: true
};

@Component({
  selector: "cap-datepicker",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-datepicker.component.html",
  styleUrls: ["./cap-datepicker.component.scss"]
})
export class CapDatepickerComponent implements ControlValueAccessor, OnInit {
  @Input("id")
  id: string;
  @Input("styleClass")
  styleClass: string;
  @Input("label")
  label: string;
  @Input("placeholder")
  placeholder: string;
  @Input("disabled")
  disabled: string;
  @Input("name")
  name: string;
  @Input("mask")
  mask: string;
  @Input("textHelper")
  textHelper: string;

  @ViewChild("input")
  input: ElementRef;

  @ViewChild("datePicker", { static: true })
  datePicker: ElementRef<HTMLInputElement>;

  private innerValue: any = new Date(Date.now());

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: "dd/mm/yyyy",
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
    satHighlight: false,
    markCurrentDay: false,
    selectorHeight: "320px",
    selectorWidth: "300px",
    height: "50px",
    openSelectorOnInputClick: true,
    showTodayBtn: false
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  public datePickerOptions: flatpickr.Options.Options = {
    locale: Portuguese,
    dateFormat: 'dd/MM/yyyy'
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
