import { Component, OnInit, forwardRef, Input, ViewChild} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms'

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapMultiSelectComponent),
  multi: true
};

@Component({
  selector: 'cap-multi-select',
  host: {
    class: "cap-multi-select"
  },
  templateUrl: './cap-multi-select.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./cap-multi-select.component.css']
})

export class CapMultiSelectComponent implements ControlValueAccessor, OnInit {

  @Input("placeholder")
  placeholder: string;
  @Input("disabled")
  disabled: boolean = false;
  @Input("data")
  data: any[];
  @Input("id")
  id: string;
  @Input("textField")
  textField: string;
  @Input("label")
  label: string;
  @ViewChild("select")
  select;

  private innerValue: Array<any> = [];

  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  dropdownSettings = {};

  ngOnInit(){

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Selecionar todos.',
      unSelectAllText: 'Remover seleção.',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  get value(): any[] {
    return this.innerValue;
  }

  onBlur() {
    this.onTouchedCallback();
  }

  set value(v: any[] ) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v ? v.reduce((acc, current) => acc.concat(current.value), []) : v);
    }
  }

  writeValue(value: any[]) {
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

  onItemSelect(item: any[]) {
    return this.innerValue;
  }

  onSelectAll(items: any[]) {
    return this.innerValue;
  }
}
