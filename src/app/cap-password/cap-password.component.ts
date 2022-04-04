import { AfterViewInit, Component, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as jqueryProxy from "jquery";
import BRCapUtil from "../../brcap-util";

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapPasswordComponent),
  multi: true
};

const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-password",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-password.component.html",
  styleUrls: ["./cap-password.component.css"]
})
export class CapPasswordComponent implements AfterViewInit, ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("mask") mask: string;
  @Input("styleClass") styleClass: string;
  @Input("maxlength") maxlength: string;
  @Input("styleInline") styleInline: string;
  @Input("textHelper") textHelper: string;
  @Input("disabled") disabled: boolean;
  @Input("showPassword") showPassword: boolean;

  @ViewChild("input") input;
  @ViewChild("icone") icone;

  textError;

  private innerValue: any = "";

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_input";
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

  toggle() {
    switch (this.input.nativeElement.type) {
      case 'password':
        this.input.nativeElement.type = 'text';
        this.icone.icon = "esconder-senha";
        break;

      case 'text':
        this.input.nativeElement.type = 'password';
        this.icone.icon = "ver-senha";
        break;
    }
  }

  hide() {
    this.input.nativeElement.type = 'password';
    this.icone.icon = "ver-senha";
  }
}
