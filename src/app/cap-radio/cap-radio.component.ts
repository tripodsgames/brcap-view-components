import { Component, forwardRef, Input, OnInit, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, NgModel } from "@angular/forms";
import { Subject } from "rxjs/Subject";

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapRadioComponent),
  multi: true
};

declare var $: any;

@Component({
  selector: "cap-radio",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-radio.component.html",
  styleUrls: ["./cap-radio.component.css"]
})
export class CapRadioComponent implements ControlValueAccessor {
  @Input("id") id: string;
  @Input("name") name: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("mask") mask: string;
  @Input("styleClass") styleClass: string;
  @Input("maxlength") maxlength: string;
  @Input("styleInline") styleInline: string;

  @ViewChild("radio") radio;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
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
