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
  colors = {};

  item = false;
  radios = [];
  radioSelecionado = [];
  checkSelecionado1;
  checkSelecionado2;
  checkSelecionado3;
  data;

  table = [
    {
      "Nome": "Teste 1",
      "E-mail": "Abc@gmail.com"
    },
    {
      "Nome": "Teste 4",
      "E-mail": "Ab345345c@gmail.com"
    },
    {
      "Nome": "Teste 3",
      "E-mail": "Ab21214c@gmail.com"
    },
    {
      "Nome": "Teste 2",
      "E-mail": "Abc@gmail.com"
    }
  ];

  ngOnInit() {
    this.colors = {
      corPrincipal: "#A5761B",
      corSecundaria: "#B8841F"
    };
    this.radios = [
      {
        label: "Opção 1",
        value: 1
      },
      {
        label: "Opção 2",
        value: 2
      },
      {
        label: "Opção 3",
        value: 3
      }
    ];
    this.items = [
      {
        label: "Comissão",
        icon: "calendario",
        items: [
          {
            label: "Consulta Comissão",
            link: "/#/teste",
            sub: true
          }
        ]
      },
      {
        label: "Recebimento",
        icon: "mais-opcoes",
        items: [
          {
            label: "Consulta Cobrança",
            sub: true
          },
          {
            label: "Consulta Rateio",
            sub: true
          },
          {
            label: "Consulta Liquidação",
            sub: true
          }
        ]
      },
      {
        label: "Permissões",
        icon: "check-circulo",
        items: [
          {
            label: "Controle de Acesso",
            sub: true
          }
        ]
      }
    ];
    console.log(this.items);
  }

  teste(event) {
    alert("LOGOU!");
    console.log("CHEGOUE AQUI")
  }
}
