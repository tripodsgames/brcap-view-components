import { Component, Input, OnInit } from "@angular/core";
import BRCapUtil from "../../brcap-util";

@Component({
  selector: "cap-divisor",
  templateUrl: "./cap-divisor.component.html",
  styleUrls: ["./cap-divisor.component.scss"]
})
export class CapDivisorComponent implements OnInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("name") name: string;
  @Input("width") width: string;

  constructor() { }

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_divisor";
    }
    if (this.name) {
      this.name = BRCapUtil.guid();
    }
  }
}
