import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import BRCapUtil from "../../brcap-util";

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapRadioComponent),
  multi: true
};

@Component({
  selector: "cap-radio",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-radio.component.html",
  styleUrls: ["./cap-radio.component.css"]
})
export class CapRadioComponent implements ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("name") name: string;
  @Input("itemLabel") itemLabel: string;
  @Input("itemValue") itemValue: any;
  @Input("disabled") disabled: boolean;
  @Input("styleClass") styleClass: string;

  private innerValue: any = "";

  ngOnInit() {
    if (null == this.name) throw new Error("Attribute 'name' is required");
    if (null == this.itemLabel) throw new Error("Attribute 'itemLabel' is required");
    if (null == this.itemValue) throw new Error("Attribute 'itemValue' is required");
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_radio";
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
