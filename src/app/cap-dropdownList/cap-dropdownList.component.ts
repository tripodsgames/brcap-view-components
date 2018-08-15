import { Component, Input, OnInit, QueryList, ContentChildren } from "@angular/core";
import { CapDropdownListItemComponent } from "../cap-dropdownListItem/cap-dropdownListItem.component";
import BRCapUtil from "../../brcap-util";

@Component({
  selector: "cap-dropdownList",
  templateUrl: "./cap-dropdownList.component.html",
  styleUrls: ["./cap-dropdownList.component.css"]
})
export class CapDropdownListComponent implements OnInit {
  @Input("id")
  id: string;
  @Input("styleClass")
  styleClass: string;
  @Input("name")
  name: string;
  @ContentChildren(CapDropdownListItemComponent)
  items: QueryList<CapDropdownListItemComponent>;

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
}
