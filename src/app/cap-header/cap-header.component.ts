import { DOCUMENT } from '@angular/common';
import {
  Component, DoCheck, ElementRef, EventEmitter, Inject,
  Input, OnInit, Output, ViewChild
} from "@angular/core";
import * as jqueryProxy from "jquery";
import { CapIconComponent } from "../cap-icon/cap-icon.component";

const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-header",
  templateUrl: "./cap-header.component.html",
  styleUrls: ["./cap-header.component.css"]
})
export class CapHeaderComponent implements OnInit, DoCheck {
  @Input("modulo")
  modulo: string;
  @Input("username")
  username: string;
  @Input("username_trat")
  username_trat: string;
  @Input("n_avatar")
  n_avatar = "../../assets/img/avatar_provisorio.png";
  @Input("rotaPerfil")
  rotaPerfil: string;
  @Input("primerPage")
  primerPage: string;
  @Input("logoSistema")
  logoSistema: string;
  @Input("tela")
  tela: boolean = false;
  @Input("mrkDagua")
  mrkDagua: string;
  @Input("logoBrasilCap")
  logoBrasilCap: string;
  @Input("rotaLogo")
  rotaLogo: string;
  exibeMenu: boolean = true;
  @ViewChild("logoHeader")
  logoHeader: ElementRef;
  @ViewChild("elementIcon")
  elementIcon: CapIconComponent;
  @Output()
  logout = new EventEmitter();
  @Output()
  atualizaEstadoMenu = new EventEmitter<boolean>();

  private $C: { [key: string]: JQuery } = {};

  constructor(
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    if (window.screen.width < 767) {
      this.toggleMenu();
    }
    if (!this.rotaLogo) {
      this.rotaLogo = "javscript:void(0)";
    }

    this.username_trat = this.nome(this.username);
    this.resgistrarMenuListerner();

    this.$C[".cap-menu"] = $(".cap-menu");
    this.$C[".logo"] = $(".logo");
    this.$C["body"] = $("body");
    this.$C[".label-projeto"] = $(".label-projeto");
    this.$C["#menu-toggle"] = $("#menu-toggle");
    this.$C["#logo-img"] = $("#logo-img");
  }

  logoff() {
    this.logout.emit(this.username);
  }

  toggleMenu() {
    this.setExibeMenu(!this.exibeMenu);
    this.renderMenu();
  }

  setExibeMenu(exibe: boolean) {
    this.exibeMenu = exibe;
    this.atualizaEstadoMenu.emit(exibe);
  }

  renderMenu() {
    if (this.exibeMenu) {
      this.$C[".cap-menu"].removeClass("fechado");
      this.$C[".logo"].removeClass("fechado");
      this.$C["body"].removeClass("minimizado");
      this.$C[".label-projeto"].removeClass("fechado");
      this.$C["#menu-toggle"].addClass("is-active");
    } else {
      this.$C[".cap-menu"].addClass("fechado");
      this.$C[".logo"].addClass("fechado");
      this.$C["body"].addClass("minimizado");
      this.$C[".label-projeto"].addClass("fechado");
      this.$C["#menu-toggle"].removeClass("is-active");
    }
    if (this.$C["#menu-toggle"].hasClass("is-active") && window.screen.width < 480) {
      this.$C["#logo-img"].hide();
    } else {
      this.$C["#logo-img"].show();
    }
  }

  ngDoCheck() {
    this.renderMenu();
  }

  nome(str) {
    if (str) {
      var arr = str.split(" ");
      var primeiro = arr.slice(0, 1);
      var ultimo = arr.slice(-1);
      return primeiro + " " + ultimo;
    } else {
      return str;
    }
  }

  toggleFullScreen() {

    let elem = document.body;
    if (!this.tela) {

      let methodToBeInvoked = elem.requestFullscreen || elem['webkitRequestFullScreen'] ||
        elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
      if (methodToBeInvoked) methodToBeInvoked.call(elem);

    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }

      // let methodToBeInvoked = elem.exitFullscreen || elem.webkitExitFullscreen ||
      // elem['mozCancelFullScreen'] || elem['msExitFullscreen'];
      // if(methodToBeInvoked) methodToBeInvoked.call(elem);

    }
    this.tela = !this.tela;
  }

  handlerMenuEvent = (res) => {
    if (res.detail !== null) {
      const exibe = res.detail.exibeMenu;
      if (exibe !== undefined) {
        this.setExibeMenu(exibe);
        this.renderMenu();
      }
    } else
      this.toggleMenu();
  }

  resgistrarMenuListerner() {
    document.addEventListener('toggleMenuEvent', this.handlerMenuEvent);
  }

}
