import { Component, forwardRef, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "cap-header",
  templateUrl: "./cap-header.component.html",
  styleUrls: ["./cap-header.component.css"],
  animations: [trigger("fadeInOut", [transition(":enter", [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]), transition(":leave", [animate(250, style({ opacity: 0 }))])])]
})
export class CapHeaderComponent implements OnInit {
  @Input("modulo") modulo: string;
  @Input("username") username: string;
  @Input("rotaPerfil") rotaPerfil: string;
  @ViewChild("logoHeader") logoHeader: ElementRef;

  constructor() {}

  colors;

  paletaCoresSitemas = {
    produtos: {
      sistema: "produtos",
      cores: {
        corPrincipal: "#A5761B",
        corSecundaria: "#B8841F",
        corLogo: "#339ddd"
      }
    },
    posvenda: {
      sistema: "posvenda",
      cores: {
        corPrincipal: "#006BBB",
        corSecundaria: "#008CDE",
        corLogo: "#339ddd"
      }
    }
  };

  ngOnInit() {
    if (this.modulo) {
      this.colors = this.paletaCoresSitemas[this.modulo].cores;
    }
    if (this.colors) {
      this.logoHeader.nativeElement.style.background = this.colors.corSecundaria;
    }
  }
}
