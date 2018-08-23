import { Component, OnInit, ViewChild } from "@angular/core";
import { CapGridPaginationComponent } from "./cap-grid-pagination/cap-grid-pagination.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private brcapUtil;
  funcionalidades = [];
  colors = {};
  collapse = false;

  item = false;
  radios = [];
  combo;
  radioSelecionado = [];
  checkSelecionado1;
  checkSelecionado2;
  checkSelecionado3;
  data;
  select;
  naoAtivo = true;
  texto;
  erroMsg;
  desabilitar = false;
  aaaa = "Teste texto";
  menu = [
    {
      codigo: "financeiro#pagamento",
      icon: "retrair",
      nome: "pagamento",
      icone: "fa fa-if",
      open: false,
      descricao: "pagamentos de títulos",
      ativo: true,
      funcionalidades: [
        {
          bloquear: false,
          codigo: null,
          excluir: true,
          icon: "expandir",
          nome: "rateio",
          descricao: null,
          incluir: false,
          consultar: true,
          acao: ["excluir", "consultar", "alterar"],
          alterar: true,
          open: false,
          rota: "/rateio",
          ativo: true
        },
        {
          bloquear: false,
          codigo: null,
          excluir: true,
          icon: "expandir",
          nome: "comissao",
          descricao: null,
          incluir: true,
          consultar: true,
          acao: ["incluir", "excluir", "consultar", "alterar"],
          alterar: true,
          open: false,
          rota: "/comissao",
          ativo: true
        }
      ]
    }
  ];

  table = [
    {
      Nome: "Teste 1",
      "E-mail": "Abc@gmail.com"
    },
    {
      Nome: "Teste 4",
      "E-mail": "Ab345345c@gmail.com"
    },
    {
      Nome: "Teste 3",
      "E-mail": "Ab21214c@gmail.com"
    },
    {
      Nome: "Teste 2",
      "E-mail": "Abc@gmail.com"
    }
  ];

  itemId;

  // public items: any[] = [
  //   { label: "Blue 1", value: 1 },
  //   { label: "Blue 2", value: 2 },
  //   { label: "Blue 3", value: 3 },
  //   { label: "Blue 4", value: 4 },
  //   { label: "Blue 5", value: 5 },
  //   { label: "Blue 6", value: 6 }
  // ];

  // CAP-GRID-PAGINAION
  @ViewChild(CapGridPaginationComponent)
  gridPagination: CapGridPaginationComponent;
  columns = ["ID", "NOME"];
  items = [[1, "JOÃO"], [2, "MARIA"]];

  ngAfterViewInit() {
    if (this.gridPagination) {
      setTimeout(_ => {
        this.gridPagination.setPage(true);
      });
    }
  }

  toogleCollapse() {
    this.collapse = !this.collapse;
  }

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
        modulo: "Usuarios",
        titulo: "Usuarios",
        icone: "menu",
        descricao: "administração dos usuarios do sistema",
        funcionalidades: [
          {
            id: "Usuarios#CadastroUsuarios",
            icon: "fa fa-home",
            title: "Cadastro Usuarios Teste Tamanho",
            url: "cadastrousuario",
            acoes: ["Incluir", "Excluir"],
            visible: false
          },
          {
            id: "Usuarios#Exclusão",
            icon: "fa fa-file-alt",
            title: "Exclusão Usuarios",
            url: "excluirusuario",
            acoes: [],
            visible: false
          }
        ]
      },
      {
        modulo: "Sistemas",
        titulo: "Sistemas",
        icone: "menu",
        descricao: "administração dos sistemas",
        funcionalidades: [
          {
            id: "Sistemas#CadastroSistema",
            icon: "fa fa-home",
            title: "Cadastro Sistema",
            url: "cadastrosistema",
            acoes: ["Incluir", "Excluir"],
            visible: false
          },
          {
            id: "Sistemas#ExcluirSistema",
            icon: "fa fa-file-alt",
            title: "Excluir Sistemas",
            url: "excluirsistema",
            acoes: [],
            visible: false
          }
        ]
      }
    ];
  }
  teste(event) {
    console.log(event);
    this.naoAtivo = !this.naoAtivo;
  }

  campoValido(): boolean {
    this.erroMsg = "";
    if (this.texto && this.texto !== "" && !(this.texto.length < 10)) {
      this.erroMsg = "Campo inválido";
      return false;
    }
    this.erroMsg = "Campo Obrigatório";
    return true;
  }

  login(event) {
    alert("LOGOU!");
  }
}
