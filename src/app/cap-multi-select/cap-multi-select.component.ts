import { Component, OnInit, forwardRef, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
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
  disable: boolean = false;
  @Input("data")
  data: any[];
  @Input("id")
  id: string;
  @Input("textField")
  textField: string;
  @Input("label")
  label: string;
  @Output()
  focus = new EventEmitter();
  @ViewChild("select")
  select;

  private innerValue: Array<any> = [];

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
  }

  set value(v: any[] ) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  writeValue(value: any[]) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange() {

  }

  registerOnTouched() {
  }

  onItemSelect(item: any[]) {
    return this.innerValue;
  }

  onSelectAll(items: any[]) {
    return this.innerValue;
  }
}
