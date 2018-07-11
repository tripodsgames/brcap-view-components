import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild,
  AfterContentInit,
  Renderer
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;
import "jquery-mask-plugin";
import "assets/js/bootstrap-datepicker.js";

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
export class CapDatepickerComponent implements ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("disabled") disabled: string;
  @Input("name") name: string;
  @Input("mask") mask: string;

  @ViewChild("input") input;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.$el = $(el.nativeElement);
  }

  ngOnInit() {
    if (this.mask) {
      $(this.input.nativeElement).mask(this.mask);
    }
    $(document)
      .ready(function() {
        $(".datepicker").datepicker();
      })
      .on("changeDate", event => {
        const inputEvent = new Event("input", { bubbles: true });
        this.renderer.invokeElementMethod(
          this.el.nativeElement,
          "dispatchEvent",
          [inputEvent]
        );
      });
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    $(".datepicker").datepicker();
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
