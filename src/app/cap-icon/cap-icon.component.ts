import { Component, Input } from "@angular/core";

@Component({
  selector: "cap-icon",
  templateUrl: "./cap-icon.component.html",
  styleUrls: ["./cap-icon.component.css"]
})
export class CapIconComponent {
  @Input("id") id: string;
  @Input("icon") icon: string;
  @Input("styleClass") styleClass: string;

  constructor() {}
}
