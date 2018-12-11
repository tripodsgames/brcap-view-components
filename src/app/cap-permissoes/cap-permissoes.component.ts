import { Http } from "@angular/http";
import { UsuarioService } from "./../services/usuario.service";
import { Component, OnInit, Input } from "@angular/core";
import { PlataformaService } from "../services/plataforma.service";

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
  nomeCard;

  constructor(private http: Http, private plataformaService: PlataformaService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.popularListaUsuarios();
    this.popularListaModulos();
    // this.nomeCard = "blad";
  }

  popularListaModulos() {
    this.plataformaService.listarModulos(this.sistema, this.urlSistemas).subscribe(res => {
      if (res) {
        this.listaModulos = res[0].modulos;
        this.listaModulos.forEach(m => {
          m.funcionalidades.forEach(f => {
            f.exibirAcoes = false;
          });
        });
      }
    });
  }

  salvar() {
    this.montarRequest();
    this.usuarioService
      .permissionar(this.permissao, this.usuarioPermissao.login, this.sistema, this.urlUsuarios)
      .subscribe(
        res => {
          if (res) {
            swal("Sucesso!", "Operação realizada com sucesso!", "success");
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
  }

  mouseLeaveHint(modulo) {
    modulo.exibirHint = false;
    modulo.hintAtivo = false;
  }

  ativarHint(modulo) {
    modulo.hintAtivo = !modulo.hintAtivo;
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

  selecionarTodosFuncionalidade(f, modulo?, selectModule?) {
    this.checkboxModificado = true;
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
      }
    });
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
      if (this.usuarioPermissao.permissoes) {
        this.usuarioPermissao.permissoes.forEach(permissao => {
          if (modulo.codigo === this.sistema + "#" + permissao.codigo) {
            modulo.funcionalidades.forEach(funcModulo => {
              modulo.todos = permissao.funcionalidades.length > 0;
              permissao.funcionalidades.forEach(funcPermissao => {
                if (funcModulo.codigo === this.sistema + "#" + permissao.codigo + "#" + funcPermissao.codigo) {
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
        this.selecionarTodosFuncionalidade(funcionalidade, modulo, selectModule);
      });
    }
  }

  public selectAllFuncionalidades(modulo) {
    this.checkboxModificado = true;
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
    func.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouAlterar(modulo, func, value) {
    this.checkboxModificado = true;
    func.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouPesquisar(modulo, func, value) {
    this.checkboxModificado = true;
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
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
  }
  verificaSelecionouAprovar(modulo, func, value) {
    this.checkboxModificado = true;
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
  }
}
