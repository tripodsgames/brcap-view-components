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

  ngOnInit() {
    this.contentLarge = document.querySelector(".content-header-large");
  }
}
