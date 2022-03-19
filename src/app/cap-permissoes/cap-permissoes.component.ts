import { Component, Input, OnInit } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import swal from "sweetalert2";
import { PlataformaService } from "../services/plataforma.service";
import { UsuarioService } from "./../services/usuario.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
  @Input("exportacaoPDF")
  exportacaoPDF;

  listaUsuarios;
  listaModulos;
  usuarioPermissao;
  usuarioVisualizar;
  permissao;
  cardPermissionados = false;
  cardNaoPermissionados = false;
  modalActive = false;
  modalWarningActive = false;
  filtro;
  checkboxAtivo = false;
  listaFiltrado;
  tabelaLinha;
  emptyMessage = false;
  filtrando = false;
  value;
  quantidadeFuncionalidades;
  quantidadePermissionados;
  hasAlteracao = false;
  loading = true;

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
  numeroItens: number;

  constructor(
    private plataformaService: PlataformaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.popularListaUsuarios();
    this.popularListaModulos();
    this.verEstadoPermissionamento("usuarios-permissionados").subscribe(res => {
      this.usuariosPermissionados = res;
    });
    this.verEstadoPermissionamento("usuarios-nao-permissionados").subscribe(res => {
      this.usuariosNaoPermissionados = res;
      this.loading = false;
    });
  }

  popularListaModulos() {
    this.plataformaService.listarModulos(this.sistema, this.urlSistemas).subscribe(res => {
      if (res) {
        this.listaModulos = res[0].modulos;
        this.listaModulos.forEach(m => {
          m.quantidadePermissionados = 0;
          m.quantidadeFuncionalidades = m.funcionalidades.length;
          m.funcionalidades.forEach(f => {
            f.exibirAcoes = false;
          });
        });
      }
    });
  }

  // pagination
  montarPaginacao() {
    this.usuariosTabela = [];
    if (this.cardPermissionados) {
      this.listaFiltrado = this.usuariosPermissionados;
    }
    if (this.cardNaoPermissionados) {
      this.listaFiltrado = this.usuariosNaoPermissionados;
    }
    if (this.filtro) {
      this.filtrando = true;
      this.listaFiltrado = [];
      this.page = 1;

      this.usuariosPermissionados.forEach(element => {
        delete element.plataforma;

        if ((<any>Object).values(element).find((item) => item.toString().toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0)) {
          this.listaFiltrado.push(element);
        }
      });

      this.usuariosNaoPermissionados.forEach(element => {
        delete element.plataforma;

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
    this.numeroItens = this.listaFiltrado.length;
  }

  onNext(): void {
    this.page++;
    this.montarPaginacao();
  }

  onPrev(): void {
    this.page--;
    this.montarPaginacao();
  }

  firstPage() {
    this.page = 1;
    this.montarPaginacao();
  }

  lastPage() {
    this.page = this.contagemPaginasTotal;
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
            swal("Sucesso!", "Operação realizada com sucesso!", "success").then(function () {
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

  reload() {
    location.reload();
  }

  abrirCardPermissionados() {
    this.cardPermissionados = !this.cardPermissionados;
    this.cardNaoPermissionados = false;
    this.page = 1;
    this.montarPaginacao();
  }

  abrirCardNaoPermissionados() {
    this.cardNaoPermissionados = !this.cardNaoPermissionados;
    this.cardPermissionados = false;
    this.page = 1;
    this.montarPaginacao();
  }

  toggleModal() {
    this.modalActive = !this.modalActive;
  }

  toggleModalWarning() {
    if (this.hasAlteracao) {
      this.modalWarningActive = !this.modalWarningActive;
    } else {
      this.usuarioPermissao = null;
      this.popularListaModulos();
    }
  }

  clickOutside(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    if (!document.getElementById("old-modal-body").contains(target)) {
      this.toggleModal();
    }
  }

  clickOutsideWarning(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    if (!document.getElementById("old-modal-warning-body").contains(target)) {
      this.toggleModalWarning();
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
    this.checkEmpty();
  }

  capitalize(string) {
    if (string !== undefined) {
      var usuarioNome = string.toLowerCase();
      return usuarioNome;
    }
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
  exportarPDF() {
    let content = [];
    let firstPage = true;

    content.push({
      text: 'Usuários Permissionados',
      style: 'header'
    },
      {
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABKCAMAAABjGHrqAAAAM1BMVEX/8gAAWqG/yyh/pVA/f3kPYpcvdoNfkmXv6AqfuDzf3hQfbI2vwjLP1R6Pr0ZPiW9vnFrTrF97AAADZUlEQVR42u2Y3ZqjIAxAg/yDqO//tLvbhkTArdP5PutFc65mFCUcQpCCIAiCIAiCIAiCIAiCIAiCIIyoHucjfBPqADvD96AO+aIkUMcU+BZq1pt/OBLg4VrSFLWOU4LbUU8MPJhcFQIwNWXBrEug6AdNIXpjrEIMPTxRDxqY5KlpjkBEhWAJaiLIxmjUdaUASDU07n6sjQtdwQubYs4FaLXHkVfTeR0j2LDthQLAjwKYCR7wSpkx8ncEaNXiqns2zQLGN18tQL8SkDFSwlPqngvoxum0zs2WsyhiPhBAbS8W4HCozRhS1VK6SO3uETcD8UKAx2wGgPBcbyv3jPjhJdPK6XKhAJ5Nzd3vEyNSpJnnCl0E+JEAu8ulFS1yZmS+0kWQa2bCJQLc9MBTZeq6LzgMitRnmitSeCqAX+T3WncrYGav/RRcJ2DEhaZ7brdQJPNGc6WepHMBfGMZBuWer3Po504Baxy7T/gP5WLgucporfxEQKQbDHew4jjtGIH/nACzpNE/rfNSixHlsqbalc4F6P8IWLDGFPTaR1DUJ5eAjV33C49iq39xBXPsLv5WQK7LyFavvFymadosZudVAuymtd74azbyGHS7O+W6H0aaq2AUkfWvBBTaGzyvgenyQ9q4DeoqJNAYcLe2HlOxxpd2VmLeKSi/ELDhxwF7PRQQgbj6UzjyGPR+n984Ex25aBXY8r6ATKMO5HUQYPCpCwVwp5rHECxe4Ugju+Czm6EcCG8J4BIXWq8TutAP5gTIRwQYHgOlAN925i+O56o7TMd3BWxqYG7SiLlDQODK7NWABSKgge3lhxCnTTEPCmQ1sN4kQFP/1D1epE1qnCtiJnsnAtq9oqgDwi0CZjXUAF75Hm93+EGA/7+AgH73zSevDoifEsCHoUUb3nCb7iOmgOfom3qFBEP2RgGIo2yiBYV5FTtHHxRwsgI5BWqkyNKUab3lI3uYYhpZ0HiiHtYZnXSOwn0CxuNwVDtS/+vO+S9CTMhUPVWzAhx0XuN9Avx4HM47O0C4M3tjD1BsX0IsnpA7r+tNAtyWhsNokwLLy/3bRYCXAiAZtUMDrYDe6/wJAVNH4Yr2vBCGhgF2bXrGhw8aFG0eGZUfJ++EN5jyvJLqSwRBEARBEARBEARBEARBEAThJX8AUjIawp1LgckAAAAASUVORK5CYII=+PzrMbdqXzfH8AAAAAElFTkSuQmCC",
        style: 'logoBBCap',
        width: 150
      });
    this.usuariosPermissionados.forEach(user => {
      if (!firstPage) content.push({ text: user.nome + "\n \n", style: 'title', pageBreak: 'before' });
      else content.push({ text: user.nome + "\n \n", style: 'title' });
      firstPage = false;
      if (user.permissoes && user.permissoes.length > 0) {
        user.permissoes.forEach(p => {
          let ul = [];
          let columns = [];
          let ol = [];
          ul.push(p.codigo.replace("-", " ").toUpperCase() + "\n");
          if (p.funcionalidades && p.funcionalidades.length > 0) {
            p.funcionalidades.forEach(f => {
              columns.push({
                stack: [f.codigo.replace("-", " ").replace("-", " ").toUpperCase() + "\n", { ul: f.acao }]
              });
            });
          }
          ol.push({ columns });
          ul.push({ ol });
          content.push({ ul });
        })
      }
      else content.push({ text: "\n \n Sem nenhuma permissão", style: ['header', 'noContentStyle'] });
    })

    pdfMake.createPdf({
      content, footer: function (currentPage, pageCount, pageSize) {
        return [
          { text: "Página " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'normalText', margin: [0, 20, 50, 0] }
        ]
      },
      styles: {
        header: {
          bold: true,
          fontSize: 14
        },
        title: {
          bold: true,
          fontSize: 12
        },
        noContentStyle: {
          italics: true,
          alignment: 'center'
        },
        logoBBCap:
        {
          alignment: 'right',
        },
      },
      defaultStyle: {
        fontSize: 9.5
      }
    }).download(`UsuariosPermissionados-${new Date().getTime()}`);
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
    f.todos = !f.todos;
    if (selectModule) {
      let cont = 0;
      modulo.funcionalidades.forEach(funcionalidade => {
        if (funcionalidade.todos) {
          cont++;
        }
      });
      modulo.todos = cont > 0;
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
    this.compareOriginalEditado();
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

  verEstadoPermissionamento(estadoPermissionamento): Observable<any[]> {
    return this.usuarioService.buscarEstadoPermissionamento(this.urlSistemas, this.sistema, estadoPermissionamento, this.exportacaoPDF);
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
                  // modulo.checkboxAtivo = true;
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
                    funcModulo.todos = true;
                  }
                }
              });
            });
          }
        });
      }
    });
    localStorage.setItem("lista", JSON.stringify(this.listaModulos));
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
    if (modulo && modulo.funcionalidades) {
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

    this.compareOriginalEditado();
  }

  private compareOriginalEditado() {
    this.hasAlteracao = false;
    if (this.usuariosNaoPermissionados.find((usuNaoPerm) => usuNaoPerm.login == this.usuarioPermissao.login)) {
      this.listaModulos.forEach(naoPermiModulo => {
        if (naoPermiModulo.todos) {
          this.hasAlteracao = true;
        }
      });
    } else {
      let lista: any;
      lista = JSON.parse(localStorage.getItem("lista"));
      lista.forEach(originalM => {
        if (!originalM.todos) {
          originalM.todos = false;
        }
        originalM.funcionalidades.forEach(originalF => {
          if (!originalF.todos) {
            originalF.todos = false;
          }
          this.listaModulos.forEach(editadoM => {
            if (!editadoM.todos) {
              editadoM.todos = false;
            }
            if (originalM.codigo === editadoM.codigo && editadoM.todos !== originalM.todos) {
              this.hasAlteracao = true;
            }
            editadoM.funcionalidades.forEach(editadoF => {
              if (!editadoF.todos) {
                editadoF.todos = false;
              }
              if (!editadoF.incluir) {
                editadoF.incluir = false;
              }
              if (!editadoF.excluir) {
                editadoF.excluir = false;
              }
              if (!editadoF.alterar) {
                editadoF.alterar = false;
              }
              if (!editadoF.pesquisar) {
                editadoF.pesquisar = false;
              }
              if (!editadoF.bloquear) {
                editadoF.bloquear = false;
              }
              if (!editadoF.aprovar) {
                editadoF.aprovar = false;
              }
              if (originalF.codigo === editadoF.codigo && editadoF.todos !== originalF.todos) {
                this.hasAlteracao = true;
              }
              if (originalF.codigo === editadoF.codigo && editadoF.incluir !== originalF.incluir ||
                originalF.codigo === editadoF.codigo && editadoF.excluir !== originalF.excluir ||
                originalF.codigo === editadoF.codigo && editadoF.alterar !== originalF.alterar ||
                originalF.codigo === editadoF.codigo && editadoF.pesquisar !== originalF.pesquisar ||
                originalF.codigo === editadoF.codigo && editadoF.bloquear !== originalF.bloquear ||
                originalF.codigo === editadoF.codigo && editadoF.aprovar !== originalF.aprovar) {
                this.hasAlteracao = true;
              }
            });
          });
        });
      });
    }
  }

  verificaSelecionouIncluir(modulo, func, value) {
    func.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    this.compareOriginalEditado();
  }
  verificaSelecionouAlterar(modulo, func, value) {
    func.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    this.compareOriginalEditado();
  }
  verificaSelecionouPesquisar(modulo, func, value) {
    func.todos = func.incluir || func.alterar || value || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || func.alterar || value || func.excluir || func.bloquear || func.aprovar;
    this.compareOriginalEditado();
  }
  verificaSelecionouExcluir(modulo, func, value) {
    func.todos = func.incluir || func.alterar || func.pesquisar || value || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || value || func.bloquear || func.aprovar;
    this.compareOriginalEditado();
  }
  verificaSelecionouBloquear(modulo, func, value) {
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
    this.compareOriginalEditado();
  }
  verificaSelecionouAprovar(modulo, func, value) {
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
    this.compareOriginalEditado();
  }
}
