import { Component, forwardRef, Input, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapDateRangePickerComponent),
  multi: true
};

declare var $: any;

@Component({
  selector: "cap-dateRangePicker",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-dateRangePicker.component.html",
  styleUrls: ["./cap-dateRangePicker.component.css"]
})
export class CapDateRangePickerComponent implements ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("styleClass") styleClass: string;
  @Input("labelStart") labelStart: string;
  @Input("labelEnd") labelEnd: string;
  @Input("placeholderStart") placeholderStart: string;
  @Input("placeholderEnd") placeholderEnd: string;

  @Input("colsStart") colsStart: string;
  @Input("colsEnd") colsEnd: string;

  @ViewChild("inputInicial") inputInicial;
  @ViewChild("inputFinal") inputFinal;
  @ViewChild("divRange") divRange;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  ngOnInit() {}

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
