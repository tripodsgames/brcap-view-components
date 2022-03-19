import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cap-btnCollapse",
  templateUrl: "./cap-btnCollapse.component.html",
  styleUrls: ["./cap-btnCollapse.component.scss"]
})
export class CapBtnCollapseComponent implements OnInit {
  @Input("targetId")
  targetId: string;
  @Input("disabled")
  disabled: boolean;
  @Input("styleClass")
  styleClass: string;
  @Input("collapsed")
  collapsed: boolean;

  constructor() { }

  ngOnInit() { }
}
