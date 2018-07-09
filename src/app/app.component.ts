import { Component, OnInit } from "@angular/core";
import { DateRangeDTO } from "./model/date-range.model";
import BRCapUtil from "../brcap-util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private brcapUtil;
  funcionalidades = [];
  colors = {};

  item = false;
  radios = [];
  combo;
  radioSelecionado = [];
  checkSelecionado1;
  checkSelecionado2;
  checkSelecionado3;
  data; select;

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
    this.funcionalidades = [
      {
        modulo: 'Usuarios',
        titulo: 'Usuarios',
        icone: 'menu',
        descricao: 'administração dos usuarios do sistema',
        funcionalidades: [{
          id: "Usuarios#CadastroUsuarios",
          icon: 'fa fa-home',
          title: 'Cadastro Usuarios',
          url: 'cadastrousuario',
          acoes: ['Incluir', 'Excluir'],
          visible: false
        },
        {
          id: "Usuarios#Exclusão",
          icon: 'fa fa-file-alt',
          title: 'Exclusão Usuarios',
          url: 'excluirusuario',
          acoes: [],
          visible: false
        }
        ]
      },
      {
        modulo: 'Sistemas',
        titulo: 'Sistemas',
        icone: 'menu',
        descricao: 'administração dos sistemas',
        funcionalidades: [{
          id: 'Sistemas#CadastroSistema',
          icon: 'fa fa-home',
          title: 'Cadastro Sistema',
          url: 'cadastrosistema',
          acoes: ['Incluir', 'Excluir'],
          visible: false
        },
        {
          id: 'Sistemas#ExcluirSistema',
          icon: 'fa fa-file-alt',
          title: 'Excluir Sistemas',
          url: 'excluirsistema',
          acoes: [],
          visible: false
        }
        ]
      }
    ];
  }

  login(event) {
    alert("LOGOU!");
  }
}
