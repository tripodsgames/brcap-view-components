import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cap-loading",
  templateUrl: "./cap-loading.component.html",
  styleUrls: ["./cap-loading.component.scss"]
})
export class CapLoadingComponent implements OnInit {
  @Input("loading") loading: boolean;
  @Input("styleClass") styleClass: string;
  @Input("texto") texto: string;
  @Input("sistema") sistema: string;

  produtos;
  posvenda;
  malthis;
  monitor;
  financeiro;
  contabilidade;

  constructor() { }

  ngOnInit() {
    console.log(this.sistema);
    if(this.sistema === "posvenda"){
      this.posvenda = true;
    }
  }
}
