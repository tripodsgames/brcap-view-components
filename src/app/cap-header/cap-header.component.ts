import { Component, forwardRef, Input, Output, OnInit, ElementRef, ViewChild, AfterViewInit, EventEmitter, DoCheck } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { CapIconComponent } from "../cap-icon/cap-icon.component";

import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-header",
  templateUrl: "./cap-header.component.html",
  styleUrls: ["./cap-header.component.css"]
})
export class CapHeaderComponent implements OnInit {
  @Input("modulo") modulo: string;
  @Input("username") username: string;
  @Input("rotaPerfil") rotaPerfil: string;
  @Input("logoSistema") logoSistema: string;
  @Input("logoBrasilCap") logoBrasilCap: string;
  @ViewChild("logoHeader") logoHeader: ElementRef;
  @ViewChild("elementIcon") elementIcon: CapIconComponent;
  @Output() login = new EventEmitter()

  constructor() {}

  ngOnInit() {
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
