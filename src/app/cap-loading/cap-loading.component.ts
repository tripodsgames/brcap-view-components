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
  large: boolean;

  constructor() { }

  ngOnInit() {
    this.contentLarge = document.querySelector(".content-header-large");

    if(this.contentLarge !== null){
      this.large = true;
    }
  }
}
