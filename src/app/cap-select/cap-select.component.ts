import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import BRCapUtil from "../../brcap-util";
import * as jqueryProxy from "jquery";
import "assets/js/bootstrap-select.min.js";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

const noop = () => {};

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
  styleUrls: ["./cap-select.component.css"]
})
export class CapSelectComponent implements ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("styleClass") styleClass: string;
  @Input("disabled") disabled: boolean;
  @Input("items") items: any[];

  @Output() focus = new EventEmitter();

  @ViewChild("select") select;

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
    $(document).ready(function() {
      $(".selectpicker").selectpicker();
      $(".bootstrap-select")
        .find(".dropdown-menu")
        .removeClass("open");
      $(".bootstrap-select").click(function() {
        $(this)
          .find(".dropdown-menu")
          .toggleClass("open");
        $(this)
          .find(".brcap-ico")
          .toggleClass("expandir");
        $(this)
          .find(".brcap-ico")
          .toggleClass("anterior");
      });
    });
  }

  onFocus(event) {
    return this.focus.emit(event);
  }

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
