import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "cap-menuItem",
  templateUrl: "./cap-menuItem.component.html",
  styleUrls: ["./cap-menuItem.component.css"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(":leave", [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CapMenuItemComponent {
  @Input("id") id: string;
  @Input("value") value: any;
  @Input("link") link: string;
  @Input("styleClass") styleClass: string;
  @Input("principal") principal: boolean;
  @ViewChild("items") items: ElementRef;

  exibir = false;

  constructor() {}

  toggleClass(hasChild) {
    if (hasChild) {
      this.exibir = !this.exibir;
    }
  }

}
