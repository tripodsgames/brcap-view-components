import { Http } from "@angular/http";
import { UsuarioService } from "./../services/usuario.service";
import { Component, OnInit, Input } from "@angular/core";
import { PlataformaService } from "../services/plataforma.service";

import swal from "sweetalert2";

@Component({
  selector: "cap-permissoes",
  templateUrl: "./cap-permissoes.component.html",
  styleUrls: ["./cap-permissoes.component.css"]
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
  mock = [{"cpf":"65743117136","login":"acambuy.terceiro@brasilcap.com.br","situacao":"A","nome":"Alex Caminha Cambuy","plataforma":"darwin"},{"cpf":"11971795771","login":"admin@brasilcap.com.br","situacao":"A","nome":"Administrador","plataforma":"darwin"},{"cpf":"79912001753","login":"anasueli@brasilcap.com.br","situacao":"A","nome":"Ana Sueli","plataforma":"darwin"},{"cpf":"08311220727","login":"antojunior@brasilcap.com.br","situacao":"A","nome":"Antonio Junior","plataforma":"darwin"},{"cpf":"07209605762","login":"apoli@brasilcap.com.br","situacao":"A","nome":"Andre Poli","plataforma":"darwin"},{"cpf":"10788031708","login":"arquiteturateste@brasilcap.com.br","situacao":"A","nome":"Arquitetura teste","plataforma":"darwin"},{"cpf":"12938508700","login":"asantos@brasilcap.com.br","situacao":"A","nome":"Arthur Ávilla Santos","plataforma":"darwin"},{"cpf":"03874970728","login":"aschiaffarino@brasilcap.com.br","situacao":"A","nome":"ANTONIO OMAR SCHIAFFARINO JUNIOR","plataforma":"darwin"},{"cpf":"12536578747","login":"assumpcao.terceiro@brasilcap.com.br","situacao":"A","nome":"Rafael Assumpcao","plataforma":"darwin"},{"cpf":"53651156001","login":"clecruz@brasilcap.com.br","situacao":"A","nome":"CLEYTON GUIMARAES DA CRUZ","plataforma":"darwin"},{"cpf":"16049069794","login":"dlerner.terceiro@brasilcap.com.br","situacao":"A","nome":"david lerner","plataforma":"darwin"},{"cpf":"11971795771","login":"felipesousa@brasilcap.com.br","situacao":"A","nome":"Felipe Sousa","plataforma":"darwin"},{"cpf":"11971795771","login":"felipesousasantos1993@gmail.com","situacao":"B","nome":"Felipe de Sousa Santos","plataforma":"darwin"},{"cpf":"07924179763","login":"fferreira@brasilcap.com.br","situacao":"A","nome":"Flavia Corrêa Ferreira","plataforma":"darwin"},{"cpf":"50769536077","login":"fsousa@brasilcap.com.br","situacao":"A","nome":"Felipe Sousa","plataforma":"darwin"},{"cpf":"11032485701","login":"gazevedo@brasilcap.com.br","situacao":"A","nome":"Gustavo Azevedo","plataforma":"darwin"},{"cpf":"13708532708","login":"gfranca.terceiro@brasilcap.com.br","situacao":"A","nome":"Gilmar Barbosa","plataforma":"darwin"},{"cpf":"11615665706","login":"gilmarfranca@outlook.com","situacao":"A","nome":"Gilmar Barbosa","plataforma":"darwin"},{"cpf":"13178135707","login":"henriquecruz@brasilcap.com.br","situacao":"A","nome":"Henrique Espindola Cruz","plataforma":"darwin"},{"cpf":"10676311784","login":"hgrillo.terceiro@brasilcap.com.br","situacao":"A","nome":"Humberto Grillo","plataforma":"darwin"},{"cpf":"08787256797","login":"jthomaz@brasilcap.com.br","situacao":"A","nome":"Julio Cesar Grativol Thomaz","plataforma":"darwin"},{"cpf":"08638605757","login":"jvictorio.terceiro@brasilcap.com.br","situacao":"A","nome":"Julio Victorio","plataforma":"darwin"},{"cpf":"09952423721","login":"leandrogon@brasilcap.com.br","situacao":"A","nome":"Leandro Gonçalo de Oliveir","plataforma":"darwin"},{"cpf":"05273861705","login":"leoramos@brasilcap.com.br","situacao":"A","nome":"Leonardo Gonçalves Ramos","plataforma":"darwin"},{"cpf":"17131225533","login":"lucasncs.terceiro@brasilcap.com.br","situacao":"A","nome":"Lucas Sousa","plataforma":"darwin"},{"cpf":"13035931739","login":"lunetto@brasilcap.com.br","situacao":"A","nome":"LUIS HENRIQUE DA SILVA PINUDO DE SOUZA NETTO","plataforma":"darwin"},{"cpf":"14201594700","login":"maiello@brasilcap.com.br","situacao":"A","nome":"Mmilena Chrislei Aiello Gomes","plataforma":"darwin"},{"cpf":"12255803747","login":"maraujo@brasilcap.com.br","situacao":"A","nome":"Marcos Werneck Cardoso Araujo","plataforma":"darwin"},{"cpf":"02871373760","login":"marcelsilva@brasilcap.com.br","situacao":"A","nome":"Marcelo Rosa e Silva","plataforma":"darwin"},{"cpf":"02943701700","login":"mcunha.terceiro@brasilcap.com.br","situacao":"A","nome":"Marcio Cunha","plataforma":"darwin"},{"cpf":"14201594700","login":"milenaaiello@hotmail.com","situacao":"A","nome":"Milena Chrislei Aiello Gomes","plataforma":"darwin"},{"cpf":"13591394866","login":"mlavrador@brasilcap.com.br","situacao":"A","nome":"Marcello Lavrador","plataforma":"darwin"},{"cpf":"02836686790","login":"mousilva@brasilcap.com.br","situacao":"A","nome":"Marcos Moutinho","plataforma":"darwin"},{"cpf":"11803083794","login":"otaviopr@brasilcap.com.br","situacao":"A","nome":"Otávio Ribeiro","plataforma":"darwin"},{"cpf":"08042378750","login":"rajunior@brasilcap.com.br","situacao":"A","nome":"Rafael Rodrigues dos Santos Junior","plataforma":"darwin"},{"cpf":"10162035780","login":"rodrigomm.terceiro@brasilcap.com.br","situacao":"B","nome":"Rodrigo Moreira Martins","plataforma":"darwin"},{"cpf":"12289530743","login":"taispedreira@brasilcap.com.br","situacao":"A","nome":"Taís Raquel Pedreira Aguiar","plataforma":"darwin"},{"cpf":"04334508006","login":"teste00@brasilcap.com.br","situacao":"B","nome":"teste usuario","plataforma":"darwin"},{"cpf":"18579405041","login":"teste@gmail.com","situacao":"B","nome":"Teste","plataforma":"darwin"},{"cpf":"08787256797","login":"teste@teste.com.br","situacao":"A","nome":"testando julio","plataforma":"darwin"},{"cpf":"10788031708","login":"tsantos@brasilcap.com.br","situacao":"A","nome":"Tiago Brito","plataforma":"darwin"},{"cpf":"13267780721","login":"vitornunes@brasilcap.com.br","situacao":"A","nome":"Vitor Nunes","plataforma":"darwin"},{"cpf":"09777196776","login":"vvincler.terceiro@brasilcap.com.br","situacao":"A","nome":"Vinicius Vieira Vincler","plataforma":"darwin"}];

  constructor(private http: Http, private plataformaService: PlataformaService, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.popularListaUsuarios();
    this.popoularListaModulos();
  }

  popoularListaModulos() {
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
    func.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = value || func.alterar || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouAlterar(modulo, func, value) {
    func.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || value || func.pesquisar || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouPesquisar(modulo, func, value) {
    func.todos = func.incluir || func.alterar || value || func.excluir || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || func.alterar || value || func.excluir || func.bloquear || func.aprovar;
  }
  verificaSelecionouExcluir(modulo, func, value) {
    func.todos = func.incluir || func.alterar || func.pesquisar || value || func.bloquear || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || value || func.bloquear || func.aprovar;
  }
  verificaSelecionouBloquear(modulo, func, value) {
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || value || func.aprovar;
  }
  verificaSelecionouAprovar(modulo, func, value) {
    func.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
    modulo.todos = func.incluir || func.alterar || func.pesquisar || func.excluir || func.bloquear || value;
  }
}
