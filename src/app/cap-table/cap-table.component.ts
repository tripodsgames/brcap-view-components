import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import BRCapUtil from "../../brcap-util";
import * as jQuery from "jquery";
const $: JQueryStatic = (<any>jQuery).default || jQuery;

@Component({
  selector: "cap-table",
  templateUrl: "./cap-table.component.html",
  styleUrls: ["./cap-table.component.css"]
})
export class CapTableComponent implements OnInit, AfterViewInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("value") value: Array<any>;
  @Input("draggable") draggable: boolean;

  @ViewChild("table") table: ElementRef;
  colunas = [];

  constructor() {}

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_table";
    }
    this.carregarColunas();
  }

  ngAfterViewInit() {
    this.carregaDraggable();
  }

  carregaDraggable() {

  }

  carregarColunas() {
    if (this.value) {
      var obj = this.value[0];
      for (const key in obj) {
        if (this.colunas.length === 0) {
          this.colunas.push(key);
          continue;
        }
        this.colunas.forEach(c => {
          if (c === key) {
            return;
          } else {
            this.colunas.push(key);
            return;
          }
        });
      }
      console.log(this.colunas);
    }
  }
}
