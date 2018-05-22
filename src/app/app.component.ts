import { Component, OnInit } from "@angular/core";
import { DateRangeDTO } from "./model/date-range.model";
import BRCapUtil from "../brcap-util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  private brcapUtil;
  items = [];

  ngOnInit() {
    this.items = [
      {
        label: "Comissão",
        icon: "fa fa-usd",
        items: [
          {
            label: "Consulta Comissão",
            icon: "fa fa-bookmark",
            link: "/#/teste"
          }
        ]
      },
      {
        label: "Recebimento",
        icon: "fa fa-money",
        items: [
          {
            label: "Consulta Cobrança",
            icon: "fa fa-bookmark"
          },
          {
            label: "Consulta Rateio",
            icon: "fa fa-bookmark"
          },
          {
            label: "Consulta Liquidação",
            icon: "fa fa-bookmark"
          }
        ]
      },
      {
        label: "Permissões",
        icon: "fa fa-key",
        items: [
          {
            label: "Controle de Acesso",
            icon: "fa fa-bookmark"
          }
        ]
      }
    ];
    console.log(this.items);
  }
}
