import {
  Component,
  Inject,
  Input,
  Output,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter
} from "@angular/core";
import { CapIconComponent } from "../cap-icon/cap-icon.component";
import { DOCUMENT } from '@angular/common';

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
  @ViewChild("logoHeader")
  logoHeader: ElementRef;
  @ViewChild("elementIcon")
  elementIcon: CapIconComponent;
  @Output()
  logout = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: any) {}
  elem;

  ngOnInit() {
    if (window.screen.width < 767) {
      this.toggleMenu();
    }
    if (!this.rotaLogo) {
      this.rotaLogo = "javscript:void(0)";
    }

    this.username_trat = this.nome(this.username);
  }

  logoff() {
    this.logout.emit(this.username);
  }

  toggleMenu() {
    $(".cap-menu").toggleClass("fechado");
    $(".logo").toggleClass("fechado");
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

    let elem =  document.body; 
    if (!this.tela) {

      let methodToBeInvoked = elem.requestFullscreen || elem.webkitRequestFullScreen || 
      elem['mozRequestFullscreen'] || elem['msRequestFullscreen']; 
      if(methodToBeInvoked) methodToBeInvoked.call(elem);

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


}
