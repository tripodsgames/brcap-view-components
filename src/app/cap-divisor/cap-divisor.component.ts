import { Component, Input, OnInit } from "@angular/core";
import { v4 as uuid } from "uuid";

@Component({
  selector: "cap-divisor",
  templateUrl: "./cap-divisor.component.html",
  styleUrls: ["./cap-divisor.component.css"]
})
export class CapDivisorComponent implements OnInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("name") name: string;
  @Input("width") width: string;

  constructor() {}

  ngOnInit() {
    if (!this.id) {
      this.id = uuid();
    }
    if (this.name) {
      this.name = uuid();
    }
  }
}
