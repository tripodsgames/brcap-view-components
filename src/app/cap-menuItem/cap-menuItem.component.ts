import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "cap-menuItem",
  templateUrl: "./cap-menuItem.component.html",
  styleUrls: ["./cap-menuItem.component.css"],
  animations: [trigger("fadeInOut", [transition(":enter", [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]), transition(":leave", [animate(250, style({ opacity: 0 }))])])]
})
export class CapMenuItemComponent implements OnInit {
  @Input("id") id: string;
  @Input("value") value: any;
  @Input("link") link: string;
  @Input("styleClass") styleClass: string;
  @Input("principal") principal: boolean;
  @Input("colors") colors: any;
  @ViewChild("items") items: ElementRef;
  @ViewChild("menuItem") menuItem: ElementRef;

  color = "";

  exibir = false;

  constructor() {}

  ngOnInit() {
    if (this.colors) {
      this.color = this.colors.backgroundColor;
    }
  }

  toggleClass(hasChild) {
    if (hasChild) {
      this.exibir = !this.exibir;
    }
  }
  changeStyle($event, element) {
    $event.currentTarget.style.background = $event.type === "mouseover" ? this.colors.corSecundaria : this.colors.corPrincipal;
  }
}
