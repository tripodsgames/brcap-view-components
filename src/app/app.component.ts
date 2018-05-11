import { Component, OnInit } from "@angular/core";
import { DateRangeDTO } from "./model/date-ragen.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  title = "app";

  lista = [];
  listaExibicao: any;

  datas = new DateRangeDTO("", "");

  exibir() {
    alert(this.listaExibicao);
  }

  ngOnInit() {
    this.lista.push({ idParceiro: 1, nomeParceiro: "PMC" });
    this.lista.push({ idParceiro: 2, nomeParceiro: "PSR" });
    this.lista.push({ idParceiro: 3, nomeParceiro: "PSP" });
    this.lista.push({ idParceiro: 4, nomeParceiro: "PMC" });
  }
}
