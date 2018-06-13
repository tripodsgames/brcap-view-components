import { Component, Input, OnInit } from "@angular/core";
import { v4 as uuid } from "uuid";

@Component({
  selector: "cap-card",
  templateUrl: "./cap-card.component.html",
  styleUrls: ["./cap-card.component.css"]
})
export class CapCardComponent implements OnInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("name") name: string;
  @Input("severity") severity: string;
  @Input("content") content: string;

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
