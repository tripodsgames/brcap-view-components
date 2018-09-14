import { Component, Input, Output, OnInit, ElementRef, ViewChild, EventEmitter } from "@angular/core";
import { CapIconComponent } from "../cap-icon/cap-icon.component";

import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-header",
  templateUrl: "./cap-header.component.html",
  styleUrls: ["./cap-header.component.css"]
})
export class CapHeaderComponent implements OnInit {
  @Input("modulo")
  modulo: string;
  @Input("username")
  username: string;
  @Input("rotaPerfil")
  rotaPerfil: string;
  @Input("logoSistema")
  logoSistema: string;
  @Input("logoBrasilCap")
  logoBrasilCap: string;
  @Input("rotaIndex")
  rotaIndex: string;
  @ViewChild("logoHeader")
  logoHeader: ElementRef;
  @ViewChild("elementIcon")
  elementIcon: CapIconComponent;
  @Output()
  logout = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (window.screen.width < 767) {
      this.toggleMenu();
    }
  }

  logoff() {
    this.logout.emit(this.username);
  }

  toggleMenu() {
    $(".cap-menu").toggle();
    $(".logo").toggle();
    $("body").toggleClass("minimizado");
    $(".label-projeto").toggleClass("fechado");
    $("#menu-toggle").toggleClass("is-active");
    if ($("#menu-toggle").hasClass("is-active") && window.screen.width < 480) {
      $("#logo-img").hide();
    } else {
      $("#logo-img").show();
    }
  }
}
