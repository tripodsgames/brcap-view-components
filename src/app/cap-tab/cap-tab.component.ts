import { Component, forwardRef, Input, OnInit, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import { v4 as uuid } from "uuid";

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
  @Input() active = false;

  constructor() {}

  ngOnInit() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
