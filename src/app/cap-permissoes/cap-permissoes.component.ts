import { Http } from "@angular/http";
import { UsuarioService } from "./../services/usuario.service";
import { Component, OnInit, Input } from "@angular/core";
import { PlataformaService } from "../services/plataforma.service";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import swal from "sweetalert2";

@Component({
  selector: "cap-permissoes",
  templateUrl: "./cap-permissoes.component.html",
  styleUrls: ["./cap-permissoes.component.scss"]
})

export class PermissoesComponent implements OnInit {
  @Input("urlSistemas")
  urlSistemas;
  @Input("urlUsuarios")
  urlUsuarios;
  @Input("sistema")
  sistema;

  listaUsuarios;
  listaModulos;
  usuarioPermissao;
  usuarioVisualizar;
  permissao;
  exibirHint = false;
  hintAtivo = false;
  checkboxModificado = false;
  cardPermissionados = false;
  cardNaoPermissionados = false;
  hintCardAtivo = false;
  exibirHintCard = false;
  modalActive = false;
  filtro;
  checkboxAtivo = false;
  listaFiltrado;
  tabelaLinha;
  emptyMessage = false;
  filtrando = false;
  value;
  quantidadeFuncionalidades;
  quantidadePermissionados;

  usuariosPermissionados = [];
  usuariosNaoPermissionados = [];

  // pagination
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  contagemPaginasTotal: number = 0;
  primeiraLinha: number;
  ultimaLinha: number;
  usuariosTabela: any[];

  constructor(private http: Http, private plataformaService: PlataformaService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.popularListaUsuarios();
    this.popularListaModulos();
    this.checkEmpty();
    this.verEstadoPermissionamento("usuarios-permissionados").subscribe(res => {
      this.usuariosPermissionados = res;
      this.montarPaginacao();
    });
    this.verEstadoPermissionamento("usuarios-nao-permissionados").subscribe(res => {
      this.usuariosNaoPermissionados = res;
      this.montarPaginacao();
    });
  }

  popularListaModulos() {
    this.plataformaService.listarModulos(this.sistema, this.urlSistemas).subscribe(res => {
      if (res) {
        this.listaModulos = res[0].modulos;
        this.listaModulos.forEach(m => {
          m.quantidadeFuncionalidades = m.funcionalidades.length;
          m.funcionalidades.forEach(f => {
            f.exibirAcoes = false;
          });
        });
      }
    });
  }

  //Pagination
  montarPaginacao() {
    this.usuariosTabela = [];
    if (this.cardPermissionados) {
      this.listaFiltrado = this.usuariosPermissionados
    }
    if (this.cardNaoPermissionados) {
      this.listaFiltrado = this.usuariosNaoPermissionados
    }
    if (this.filtro) {
      this.filtrando = true;
      this.listaFiltrado = [];
      this.page = 1;

      this.usuariosPermissionados.forEach(element => {
        delete element.plataforma;
        element.cpfMascarado = element.cpf
        .substring(0, 3)
        .concat(".")
        .concat(element.cpf.substring(3, 6))
        .concat(".")
        .concat(element.cpf.substring(6, 9))
        .concat("-")
        .concat(element.cpf.substring(9, 11));

        if ((<any>Object).values(element).find((item) => item.toString().toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0)) {
          this.listaFiltrado.push(element);
        }
      });

      this.usuariosNaoPermissionados.forEach(element => {
        delete element.plataforma;
        element.cpfMascarado = element.cpf
        .substring(0, 3)
        .concat(".")
        .concat(element.cpf.substring(3, 6))
        .concat(".")
        .concat(element.cpf.substring(6, 9))
        .concat("-")
        .concat(element.cpf.substring(9, 11));
        
        if ((<any>Object).values(element).find((item) => item.toString().toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0)) {
          this.listaFiltrado.push(element);
        }
      });

      if (this.filtro == "") {
        this.filtrando = false;
      }
      if (this.value == "") {
        this.filtrando = false;
      }
    }

    this.contagemPaginasTotal = Math.ceil(
      this.listaFiltrado.length / this.limit
    );
    const primeiraLinha = (this.page - 1) * this.limit;
    const ultimaLinha = primeiraLinha + this.limit - 1;

    for (let i = primeiraLinha; i <= ultimaLinha; i++) {
      if (this.listaFiltrado[i]) {
        this.usuariosTabela.push(
          this.listaFiltrado[i]
        );
      }
    }

    this.total =
      this.usuariosTabela.length + 1 >= this.limit
        ? this.limit
        : this.usuariosTabela.length;
    this.primeiraLinha = primeiraLinha + 1;
    this.ultimaLinha = primeiraLinha + this.usuariosTabela.length;
  }

  onNext(): void {
    this.page++;
    this.montarPaginacao();
  }

  onPrev(): void {
    this.page--;
    this.montarPaginacao();
  }

  salvar() {
    this.modalActive = false;
    this.montarRequest();
    this.usuarioService
      .permissionar(this.permissao, this.usuarioPermissao.login, this.sistema, this.urlUsuarios)
      .subscribe(
        res => {
          if (res) {
            swal("Sucesso!", "Operação realizada com sucesso!", "success").then(function(){
              location.reload();
          });
          } else {
            swal("Erro!", "Ocorreu um erro ao salvar!", "error");
          }
        },
        err => {
          if (err) {
            swal("Erro!", "Ocorreu um erro ao salvar!", "error");
          }
        }
      );
  }

  voltar() {
    this.usuarioPermissao = null;
  }

  toggleHint(modulo) {
    modulo.exibirHint = !modulo.exibirHint;
    modulo.hintAtivo = !modulo.hintAtivo;
  }

  mouseLeaveHint(modulo) {
    modulo.exibirHint = false;
    modulo.hintAtivo = false;
  }

  abrirCardPermissionados() {
    this.cardPermissionados = !this.cardPermissionados;
    this.cardNaoPermissionados = false;
    this.page = 1;
    this.montarPaginacao();
    this.checkEmpty();
  }

  abrirCardNaoPermissionados() {
    this.checkEmpty();
    this.cardNaoPermissionados = !this.cardNaoPermissionados;
    this.cardPermissionados = false;
    this.page = 1;
    this.montarPaginacao();
  }

  mouseLeaveHintCard() {
    this.exibirHintCard = false;
    this.hintCardAtivo = false;
  }

  toggleHintCard() {
    this.exibirHintCard = !this.exibirHintCard;
    this.hintCardAtivo = !this.hintCardAtivo;
  }

  toggleModal() {
    this.modalActive = !this.modalActive;
  }

  clickOutside(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    if (!document.getElementById("modal-body").contains(target)) {
      this.toggleModal();
    }
  }

  checkEmpty() {
    this.tabelaLinha = document.querySelector(".animacao-hover");
    if (this.tabelaLinha === null) {
      this.emptyMessage = true;
    } else {
      this.emptyMessage = false;
    }
    if (this.filtro == "") {
      this.filtrando = false;
      this.emptyMessage = false;
    }
  }

  fecharCard() {
    this.cardPermissionados = false;
    this.cardNaoPermissionados = false;
    this.filtrando = false;
    this.filtro = "";
  }


  capitalize(string) {
    var usuarioNome = string.toLowerCase();
    return usuarioNome;
  }

  selecionarUsuarioVisualizar(usuario) {
    this.usuarioService.buscaPermissoes(usuario.login, this.sistema, this.urlUsuarios).subscribe(res => {
      if (res && res[0] && res[0].permissoes) {
        res[0].permissoes.forEach(p => {
          p.funcionalidades.forEach(f => {
            const modulo = p.codigo;
            const funcionalidade = f.codigo;
            if (modulo) {
              p.modulo = modulo;
            }
            if (funcionalidade) {
              if (!p.funcionalidades) {
                p.funcionalidades = [];
              }
              f.nome = funcionalidade.replace(/^\w/, c => c.toUpperCase());
              f.acoes = f.acao;
            }
          });
        });
        this.usuarioVisualizar = usuario;
        this.usuarioVisualizar.permissoes = res[0].permissoes;
      } else {
        swal("Aviso!", "Usuário não possui permissão!", "warning");
      }
    });
  }

  montarRequest() {
    this.permissao = new Object();
    this.permissao.login = this.usuarioPermissao.login + "#" + this.sistema;
    this.permissao.permissoes = [];
    this.listaModulos.forEach(modulo => {
      const moduloPermissao: any = {};
      moduloPermissao.funcionalidades = [];
      modulo.funcionalidades.forEach(funcionalidade => {
        if (this.checkFuncionalidadeSelecionada(funcionalidade)) {
          moduloPermissao.codigo = modulo.codigo.split("#")[1];
          const funcPermissao: any = {};
          this.permissao.codigo = modulo.codigo;
          funcPermissao.acao = this.preencherAcoesFuncionalidade(funcionalidade);
          funcPermissao.codigo = funcionalidade.codigo.split("#")[2];

          moduloPermissao.funcionalidades.push(funcPermissao);
        }
      });
      if (moduloPermissao.codigo) {
        this.permissao.permissoes.push(moduloPermissao);
      }
    });
  }

  checkFuncionalidadeSelecionada(f) {
    return f.incluir || f.excluir || f.alterar || f.pesquisar || f.bloquear || f.aprovar;
  }

  preencherAcoesFuncionalidade(f) {
    const lista = [];
    if (f.incluir) {
      lista.push("incluir");
    }
    if (f.alterar) {
      lista.push("alterar");
    }
    if (f.pesquisar) {
      lista.push("pesquisar");
    }
    if (f.excluir) {
      lista.push("excluir");
    }
    if (f.bloquear) {
      lista.push("bloquear");
    }
    if (f.aprovar) {
      lista.push("aprovar");
    }
    return lista;
  }

  selecionarTodasFuncionalidade(f, modulo?, selectModule?) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;

    f.todos = !f.todos;
    if (!selectModule) {
      let cont = 0;
      modulo.funcionalidades.forEach(funcionalidade => {
        if (funcionalidade.todos) {
          cont++;
        }
      });
      modulo.todos = cont > 0;
      f.todos = modulo.todos;
    }
    if (f.todos) {
      f.incluir = true;
      f.excluir = true;
      f.pesquisar = true;
      f.alterar = true;
      f.bloquear = true;
      f.aprovar = true;
    } else {
      f.incluir = false;
      f.excluir = false;
      f.pesquisar = false;
      f.alterar = false;
      f.bloquear = false;
      f.aprovar = false;
    }
  }

  toggleAcoes(f) {
    f.exibirAcoes = !f.exibirAcoes;
  }

  popularListaUsuarios() {
    this.usuarioService.listarUsuarios(this.urlUsuarios).subscribe(res => {
      if (res) {
        this.listaUsuarios = res;
        this.checkEmpty();
      }
    });
  }

  verEstadoPermissionamento(estadoPermissionamento): Observable<any[]> {
    return this.usuarioService.buscarEstadoPermissionamento(this.urlSistemas, this.sistema, estadoPermissionamento);
  }

  toggleModulo(modulo) {
    modulo.open = !modulo.open;
  }

  selecionarUsuario(usuario) {
    this.usuarioPermissao = usuario;
    this.usuarioService.buscaPermissoes(usuario.login, this.sistema, this.urlSistemas).subscribe(res => {
      if (res && res[0] && res[0].permissoes) {
        this.usuarioPermissao.permissoes = res[0].permissoes;
        this.usuarioPermissao.permissoes.forEach(p => {
          p.funcionalidades.forEach(f => {
            f.acoes = [];
            f.incluir = f.acao.indexOf("incluir") !== -1;
            f.pesquisar = f.acao.indexOf("pesquisar") !== -1;
            f.alterar = f.acao.indexOf("alterar") !== -1;
            f.excluir = f.acao.indexOf("excluir") !== -1;
            f.bloquear = f.acao.indexOf("bloquear") !== -1;
            f.aprovar = f.acao.indexOf("aprovar") !== -1;
          });
        });
        this.unirUsuarioModulos();
      }
    });
  }

  unirUsuarioModulos() {
    this.listaModulos.forEach(modulo => {
      modulo.quantidadePermissionados = 0;
      if (this.usuarioPermissao.permissoes) {
        this.usuarioPermissao.permissoes.forEach(permissao => {
          if (modulo.codigo === this.sistema + "#" + permissao.codigo) {
            modulo.funcionalidades.forEach(funcModulo => {
              modulo.todos = permissao.funcionalidades.length > 0;
              permissao.funcionalidades.forEach(funcPermissao => {
                if (funcModulo.codigo === this.sistema + "#" + permissao.codigo + "#" + funcPermissao.codigo) {

                  modulo.checkboxAtivo = true;


                  funcModulo.acao = funcPermissao.acao;
                  funcModulo.acoes = funcPermissao.acoes;
                  funcModulo.incluir = funcPermissao.incluir;
                  funcModulo.alterar = funcPermissao.alterar;
                  funcModulo.pesquisar = funcPermissao.pesquisar;
                  funcModulo.excluir = funcPermissao.excluir;
                  funcModulo.bloquear = funcPermissao.bloquear;
                  funcModulo.aprovar = funcPermissao.aprovar;
                  funcModulo.todos =
                    funcPermissao.incluir &&
                    funcPermissao.alterar &&
                    funcPermissao.pesquisar &&
                    funcPermissao.excluir &&
                    funcPermissao.aprovar &&
                    funcPermissao.bloquear;
                  if (funcModulo.incluir
                    || funcModulo.alterar
                    || funcModulo.pesquisar
                    || funcModulo.excluir
                    || funcModulo.bloquear
                    || funcModulo.aprovar) {
                    modulo.quantidadePermissionados++;
                  }
                }
              });
            });
          }
        });
      }
    });
  }

  public selecionarTodos(modulo, selectModule) {
    if (modulo && modulo.funcionalidades) {
      modulo.todos = !modulo.todos;
      modulo.funcionalidades.forEach(funcionalidade => {
        this.selecionarTodasFuncionalidade(funcionalidade, modulo, selectModule);
      });
    }
  }

  public selectAllFuncionalidades(modulo) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;
    if (modulo && modulo.funcionalidades) {
      modulo.todos = !modulo.todos;
      modulo.funcionalidades.forEach(funcionalidade => {
        funcionalidade.todos = modulo.todos;
        if (funcionalidade.todos) {
          funcionalidade.incluir = true;
          funcionalidade.excluir = true;
          funcionalidade.pesquisar = true;
          funcionalidade.alterar = true;
          funcionalidade.bloquear = true;
          funcionalidade.aprovar = true;
        } else {
          funcionalidade.incluir = false;
          funcionalidade.excluir = false;
          funcionalidade.pesquisar = false;
          funcionalidade.alterar = false;
          funcionalidade.bloquear = false;
          funcionalidade.aprovar = false;
        }
      });
    }
  }

  verificaSelecionouIncluir(modulo, func, value) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;
    func.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouAlterar(modulo, func, value) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;
    func.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouPesquisar(modulo, func, value) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;
    func.todos = func.incluir || func.alterar || value || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || func.alterar || value || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouExcluir(modulo, func, value) {
    this.checkboxModificado = true;
    func.todos = func.incluir || func.alterar || func.pesquisar || value || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || value || func.bloquear || func.aprovar;
  }
  verificaSelecionouBloquear(modulo, func, value) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
  }
  verificaSelecionouAprovar(modulo, func, value) {
    this.checkboxModificado = true;
    modulo.checkboxAtivo = false;
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
  }
}