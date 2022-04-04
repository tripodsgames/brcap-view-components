import { Component, Input, OnInit } from "@angular/core";
import BRCapUtil from "../../brcap-util";

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

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_card";
    }
    if (this.name) {
      this.name = BRCapUtil.guid();
    }
  }
}
