import { Component, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as moment from "moment";

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapMonthPickerComponent),
  multi: true
};

@Component({
  selector: "cap-monthpicker",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-monthpicker.component.html",
  styleUrls: ["./cap-monthpicker.component.css"]
})
export class CapMonthPickerComponent implements ControlValueAccessor, OnInit {
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
  @Input("format")
  format: string;

  @ViewChild("input")
  input;

  private $el: any;
  private innerValue: any;

  config;

  constructor() { }

  ngOnInit() {
    if (!this.format) {
      this.format = "MMMM/YYYY";
    }
    this.config = {
      format: this.format,
      locale: moment.locale("pt-br")
    };
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
