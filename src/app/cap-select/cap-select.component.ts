import { Component, forwardRef, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit, AfterViewChecked, AfterContentChecked } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapSelectComponent),
  multi: true
};

declare var $: any;

@Component({
  selector: "cap-select",
  host: {
    class: "cap-select"
  },
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-select.component.html",
  styleUrls: ["./cap-select.component.css"]
})
export class CapSelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("styleClass") styleClass: string;
  @Input("options") options: string;
  @Input("itemLabel") itemLabel: string;
  @Input("itemValue") itemValue: string;
  @Input("labelOptionAll") labelOptionAll: string;
  @Input("multiple") multiple: string;
  @Input("optionAll") optionAll: boolean;

  @ViewChild("select") select;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  ngAfterViewInit() {
    // TODO: tratamento paleativo, necessário rever css.
    setTimeout(() => {
      $(".caret").text("");
    }, 100);
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
