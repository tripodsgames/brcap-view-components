import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "cap-icon",
  templateUrl: "./cap-icon.component.html",
  styleUrls: ["./cap-icon.component.scss"]
})
export class CapIconComponent implements OnInit {
  @Input("id") id: string;
  @Input("icon") icon: string;
  @Input("styleClass") styleClass: string;
  @Input("size") size: number;
  @Input("disabled") disabled: boolean;
  @Input("position") position: string;
  @ViewChild("element", { static: true }) element: ElementRef;

  constructor() { }

  ngOnInit() {
    if (this.size) {
      this.element.nativeElement.style.fontSize = this.size + "px";
    }
    if (this.position) {
      this.element.nativeElement.style.cssFloat = this.position;
    }
  }
}
