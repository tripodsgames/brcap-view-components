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
  username= "Joaquim José Xavier";
  @Input("username_trat")
  username_trat= this.nome(this.username);
  @Input("n_avatar")
  n_avatar="../../assets/img/avatar_provisorio.png";
  @Input("rotaPerfil")
  rotaPerfil: string;
  @Input("logoSistema")
  logoSistema: string;
  @Input("mrkDagua")
  mrkDagua: string;
  @Input("logoBrasilCap")
  logoBrasilCap: string;
  @Input("rotaLogo")
  rotaLogo: string;
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
    if (!this.rotaLogo) {
      this.rotaLogo = "javscript:void(0)";
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

  nome(str) {
    if (str !== null){
      var arr = str.split(' ');
      var primeiro = arr.slice(0, 1);
      var ultimo = arr.slice(-1);
      return primeiro + " " + ultimo;
    } else {
      return str;
    }
  }
}
