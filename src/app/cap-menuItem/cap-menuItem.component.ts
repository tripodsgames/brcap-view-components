import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "cap-menuItem",
  templateUrl: "./cap-menuItem.component.html",
  styleUrls: ["./cap-menuItem.component.css"]
})
export class CapMenuItemComponent implements OnInit {
  @Input("id") id: string;
  @Input("value") value: any;
  @Input("link") link: string;
  @Input("styleClass") styleClass: string;
  @Input("principal") principal: boolean;
  @ViewChild("items") items: ElementRef;
  @ViewChild("menuItem") menuItem: ElementRef;

  exibir = false;

  constructor() {}

  ngOnInit() {}

  toggleClass(hasChild) {
    if (hasChild) {
      this.exibir = !this.exibir;
    }
  }
}
