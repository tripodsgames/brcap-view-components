import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "cap-btnCollapse",
  templateUrl: "./cap-btnCollapse.component.html",
  styleUrls: ["../../assets/css/cap-btnCollapse.component.min.css"]
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

  constructor() {}

  ngOnInit() {}
}
