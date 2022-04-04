import { Component, Input } from "@angular/core";

@Component({
  selector: "cap-btnCollapse",
  templateUrl: "./cap-btnCollapse.component.html",
  styleUrls: ["./cap-btnCollapse.component.css"]
})
export class CapBtnCollapseComponent {
  @Input("targetId")
  targetId: string;
  @Input("disabled")
  disabled: boolean;
  @Input("styleClass")
  styleClass: string;
  @Input("collapsed")
  collapsed: boolean;
}
