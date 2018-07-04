import { Component, Input } from "@angular/core";
import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-button",
  host: {
    class: "cap-button"
  },
  templateUrl: "./cap-button.component.html",
  styleUrls: ["./cap-button.component.css"]
})
export class CapButtonComponent {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("disabled") disabled: boolean;
  @Input("icon") icon: string;
  @Input("loader") loader: boolean;
  @Input("styleClass") styleClass: string;

  constructor() {}
}
