import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import BRCapUtil from "../../brcap-util";

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapInputTextAreaComponent),
  multi: true
};

import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-inputTextArea",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-inputTextArea.component.html",
  styleUrls: ["./cap-inputTextArea.component.css"]
})
export class CapInputTextAreaComponent implements AfterViewInit, ControlValueAccessor, OnInit {
  @Input("id")
  id: string;
  @Input("label")
  label: string;
  @Input("placeholder")
  placeholder: string;
  @Input("mask")
  mask: string;
  @Input("styleClass")
  styleClass: string;
  @Input("maxlength")
  maxlength: string;
  @Input("styleInline")
  styleInline: string;
  @Input("textHelper")
  textHelper: string;
  @Input("disabled")
  disabled: boolean;

  @Input("cols")
  cols: string;
  @Input("rows")
  rows: string;

  @Output()
  keyup = new EventEmitter();
  @Output()
  keydown = new EventEmitter();
  @Output()
  mousedown = new EventEmitter();
  @Output()
  mouseover = new EventEmitter();
  @Output()
  mouseout = new EventEmitter();
  @Output()
  focus = new EventEmitter();
  @Output()
  blur = new EventEmitter();

  @ViewChild("input")
  input;

  textError;

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
      this.id += "_textarea";
    }
    if (this.styleClass && this.styleClass.indexOf("error") != -1) {
      this.textError = "error";
    }
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

  onKeyup(event) {
    return this.keyup.emit(event);
  }

  onFocus(event) {
    return this.focus.emit(event);
  }

  onKeyDown(event) {
    return this.keydown.emit(event);
  }

  onMouseOver(event) {
    return this.mouseover.emit(event);
  }
  onMouseDown(event) {
    return this.mousedown.emit(event);
  }
  onMouseOut(event) {
    return this.mouseout.emit(event);
  }

  onBlurJS(event) {
    return this.blur.emit(event);
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

  public ngAfterViewInit() {
    if (this.mask) {
      $(this.input.nativeElement).mask(this.mask);
    }
  }
}
