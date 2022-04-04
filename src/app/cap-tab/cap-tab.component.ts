import { Component, Input, OnInit } from "@angular/core";
import BRCapUtil from "../../brcap-util";

@Component({
  selector: "cap-tab",
  templateUrl: "./cap-tab.component.html",
  styleUrls: ["./cap-tab.component.css"]
})
export class CapTabComponent implements OnInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("name") name: string;
  @Input("title") title: string;
  @Input("disabled") disabled: boolean;
  @Input() active = false;

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_tab";
    }
  }
}
