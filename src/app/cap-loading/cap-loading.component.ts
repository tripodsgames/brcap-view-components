import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cap-loading",
  templateUrl: "./cap-loading.component.html",
  styleUrls: ["./cap-loading.component.scss"]
})
export class CapLoadingComponent implements OnInit {
  @Input("loading") loading: boolean;
  @Input("texto") texto: string;
  @Input("sistema") sistema: string;

  contentLarge;
  menuMinimizado;

  constructor() { }

  ngOnInit() {
    this.checkIfContentHeaderIsLarge();
  }

  checkIfContentHeaderIsLarge() {
    this.contentLarge = document.querySelector(".content-header-large");
  }

  checkIfMenuMinimizado() {
    this.menuMinimizado = document.querySelector(".minimizado");
  }
}
