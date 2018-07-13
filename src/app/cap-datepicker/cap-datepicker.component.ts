import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;
import "jquery-mask-plugin";
import { IMyDpOptions } from "mydatepicker";

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapDatepickerComponent),
  multi: true
};

@Component({
  selector: "cap-datepicker",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-datepicker.component.html",
  styleUrls: ["./cap-datepicker.component.css"]
})
export class CapDatepickerComponent
  implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("disabled") disabled: string;
  @Input("name") name: string;
  @Input("mask") mask: string;

  @ViewChild("input") input;

  private $el: any;
  private innerValue: any = new Date(Date.now());

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: "dd/mm/yyyy"
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    (<HTMLInputElement>$(".ngx-datepicker-input")[0]).readOnly = false;
    if (this.mask) {
      $(".ngx-datepicker-input").mask(this.mask);
    }
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
