import { Component, forwardRef, Input, Output, OnInit, ElementRef, ViewChild, AfterViewInit, EventEmitter, DoCheck } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { CapIconComponent } from "../cap-icon/cap-icon.component";

declare var $: any;

@Component({
  selector: "cap-header",
  templateUrl: "./cap-header.component.html",
  styleUrls: ["./cap-header.component.css"]
})
export class CapHeaderComponent implements OnInit {
  @Input("modulo") modulo: string;
  @Input("username") username: string;
  @Input("rotaPerfil") rotaPerfil: string;
  @Input("logo") logo: string;
  @ViewChild("logoHeader") logoHeader: ElementRef;
  @ViewChild("elementIcon") elementIcon: CapIconComponent;
  @Output() login = new EventEmitter()

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
    if (window.screen.width < 767) {
      this.toggleMenu();
    }

  }

  logar() {
    this.login.emit(this.username);
  }

  toggleMenu() {
    $(".cap-menu").toggle();
    $(".logo").toggle();
    $("body").toggleClass("minimizado");
    $(".label-projeto").toggleClass("fechado");
    $("#menu-toggle").toggleClass("is-active");
    if ( $("#menu-toggle").hasClass("is-active") && window.screen.width < 480) {
      $("#logo-img").hide();
    } else {
      $("#logo-img").show();
    }
  }



}
