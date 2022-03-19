import {
  Component, ElementRef, EventEmitter, forwardRef,
  Input,
  OnInit, Output, ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as jqueryProxy from "jquery";
import BRCapUtil from "../../brcap-util";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapSelectComponent),
  multi: true
};
@Component({
  selector: "cap-select",
  host: {
    class: "cap-select"
  },
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-select.component.html",
  styleUrls: ["./cap-select.component.scss"]
})
export class CapSelectComponent implements ControlValueAccessor, OnInit {
  @Input("id")
  id: string;
  @Input("label")
  label: string;
  @Input("styleClass")
  styleClass: string;
  @Input("disabled")
  disabled: boolean;
  @Input("items")
  items: any[];
  @Input("placeholder")
  placeholder: string;
  @Input("textHelper")
  textHelper: string;
  @Input("filter")
  filter: boolean;
  @Input("title")
  title: boolean;
  @Output()
  focus = new EventEmitter();
  @Output()
  change = new EventEmitter();
  @ViewChild("select")
  select;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_input";
    }
  }

  onFocus(event) {
    return this.focus.emit(event);
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    this.change.emit(v);
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
