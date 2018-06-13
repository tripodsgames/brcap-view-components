import { Component, Input, OnInit, ContentChild, QueryList, ContentChildren, AfterContentInit } from "@angular/core";
import { v4 as uuid } from "uuid";
import { CapTabComponent } from "../cap-tab/cap-tab.component";

@Component({
  selector: "cap-tabPanel",
  templateUrl: "./cap-tabPanel.component.html",
  styleUrls: ["./cap-tabPanel.component.css"]
})
export class CapTabPanelComponent implements OnInit, AfterContentInit {
  @Input("id") id: string;
  @Input("styleClass") styleClass: string;
  @Input("name") name: string;

  @ContentChildren(CapTabComponent) tabs: QueryList<CapTabComponent>;

  constructor() {}

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  ngOnInit() {
    if (!this.id) {
      this.id = uuid();
    }
    if (this.name) {
      this.name = uuid();
    }
  }

  selectTab(tab: CapTabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));

    tab.active = true;
  }
}
