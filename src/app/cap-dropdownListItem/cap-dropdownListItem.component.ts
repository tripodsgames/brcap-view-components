import { Component, Input, OnInit } from "@angular/core";
import BRCapUtil from "../../brcap-util";

@Component({
  selector: "cap-dropdownListItem",
  templateUrl: "./cap-dropdownListItem.component.html",
  styleUrls: ["./cap-dropdownListItem.component.css"]
})
export class CapDropdownListItemComponent implements OnInit {
  @Input("id")
  id: string;
  @Input("styleClass")
  styleClass: string;
  @Input("name")
  name: string;
  @Input("title")
  title: string;

  show = false;
  icon = "expandir";

  constructor() {}

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_card";
    }
    if (!this.name) {
      this.name = BRCapUtil.guid();
    }
  }

  toogle() {
    this.show = !this.show;
    if (this.show) {
      this.icon = "retrair";
    } else {
      this.icon = "expandir";
    }
  }
}
