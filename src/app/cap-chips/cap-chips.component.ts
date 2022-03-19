import { Component, ElementRef, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as jqueryProxy from "jquery";
import BRCapUtil from "../../brcap-util";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapChipsComponent),
  multi: true
};

@Component({
  selector: "cap-chips",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-chips.component.html",
  styleUrls: ["./cap-chips.component.scss"]
})
export class CapChipsComponent implements ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("name") name: string;
  @Input("itemLabel") itemLabel: string;
  @Input("disabled") disabled: boolean;
  @Input("styleClass") styleClass: string;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  ngOnInit() {
    if (null == this.name) throw new Error("Attribute 'name' is required");
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_chips";
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
