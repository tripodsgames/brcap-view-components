import { Component, forwardRef, Input, OnInit, Output, ElementRef, EventEmitter, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { DateRangeDTO } from "../model/date-ragen.model";

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

  @Input("clearBtn") clearBtn: boolean;

  @ViewChild("date1") date1;
  @ViewChild("date2") date2;
  @ViewChild("divRange") divRange;

  private $el: any;
  private innerValue: any = "";
  private innerValueEnd: any = "";
  private dates: DateRangeDTO;

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  ngOnInit() {}

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  setDates(dateStart, dateEnd) {
    this.innerValue = dateStart;
    this.innerValueEnd = dateEnd;
    this.setValues();
  }

  setValues() {
    this.dates = new DateRangeDTO(this.innerValue, this.innerValueEnd);
    this.onChangeCallback(this.dates);
  }

  get value(): any {
    return this.dates;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.dates = new DateRangeDTO(this.innerValue, this.innerValueEnd);
      this.onChangeCallback(this.dates);
    }
  }

  get valueEnd(): any {
    return this.innerValueEnd;
  }

  set valueEnd(v: any) {
    if (v !== this.innerValueEnd) {
      this.innerValueEnd = v;
      this.dates = new DateRangeDTO(this.innerValue, this.innerValueEnd);
      this.onChangeCallback(this.dates);
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
