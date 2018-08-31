import { Component, OnInit, Input } from "@angular/core";
import { LoginService } from "../services/login.service";
import toastr from "toastr";

@Component({
  selector: "cap-login",
  templateUrl: "./cap-login.component.html",
  styleUrls: ["./cap-login.component.css"]
})
export class CapLoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  @Input("linkCadastro")
  linkCadastro;
  @Input("srcLogo")
  srcLogo;
  @Input("urlEnv")
  urlEnv;
  @Input("urlCadastro")
  urlCadastro;
  @Input("sistema")
  sistema;
  @Input("urlRedirect")
  urlRedirect;

  loading;
  usuario: any = new Object();
  msg: any = {};

  loginInvalido;
  senhaInvalida;

  loginRequired;
  senhaRequired;

  ngOnInit() {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "0",
      hideDuration: "0",
      timeOut: "0",
      extendedTimeOut: "0",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
  }

  login() {
    toastr.clear();
    this.loginRequired = false;
    this.loginInvalido = false;
    this.senhaInvalida = false;
    this.senhaRequired = false;
    toastr.clear();
    if (!this.usuario.login || !this.usuario.senha) {
      this.loginRequired = !this.usuario.login;
      this.senhaRequired = !this.usuario.senha;
      return;
    } else if (!this.validateEmail(this.usuario.login)) {
      this.loginInvalido = true;
      return;
    }

    this.usuario.plataforma = "darwin";
    this.usuario.sistema = this.sistema;
    this.loginService.login(this.usuario, this.urlEnv).subscribe(
      res => {
        if (res && res._body) {
          this.loginService.getAuth(JSON.parse(res._body).token, this.urlEnv).subscribe(
            res1 => {
              if (res1) {
                this.loginService.getUser(this.usuario.login, this.urlEnv).subscribe(
                  u => {
                    if (u) {
                      u = u[0];
                      const usuarioLogado: any = new Object();
                      usuarioLogado.nome = u.nome;
                      usuarioLogado.cpf = u.cpf;
                      usuarioLogado.situacao = u.situacao;
                      usuarioLogado.login = u.login;
                      usuarioLogado.email = u.login;
                      usuarioLogado.token = res.token;
                      usuarioLogado.modulos = res1;
                      sessionStorage.setItem("userSession_key_" + this.sistema, JSON.stringify(usuarioLogado));
                      localStorage.setItem("userSession_key_" + this.sistema, JSON.stringify(usuarioLogado));
                      window.location.href = this.urlRedirect;
                    } else {
                      toastr["warning"]("Usuário ou senha inválidos");
                    }
                  },
                  err => {
                    toastr["warning"]("Usuário ou senha inválidos");
                  }
                );
              } else {
                toastr["warning"]("Usuário ou senha inválidos");
              }
            },
            err => {
              if (err) {
                if (err.status === 401) {
                  toastr["warning"]("Usuário sem permissão de acesso.");
                } else if (err._body) {
                  toastr["warning"](JSON.parse(err._body).mensagem);
                }
              }
            }
          );
        } else {
          toastr["warning"]("Usuário ou senha inválidos");
        }
      },
      err => {
        if (err && err._body) {
          toastr["warning"](JSON.parse(err._body).mensagem);
        }
      }
    );
  }

  esqueciSenha(usuario) {
    usuario.plataforma = "darwin";

    this.loginService.esqueciSenha(usuario, this.urlEnv).subscribe(
      resp1 => {
        if (resp1.status === 200) {
          toastr["warning"]("Em alguns minutos você receberá um email com instruções para redefinição de senha.");
        } else if (resp1.status === 204) {
          toastr["warning"]("Usuário e/ou senha inválido(s)");
        } else if (resp1.status === 400) {
          toastr["warning"]("Não possivél realizar a operação, por favor tente mais tarde!");
        }
      },
      err => {
        try {
          if (err.status === 401) {
            toastr["warning"](
              "Usuário não possui permissão de acesso, favor entrar em contato com o administrador de sistema!"
            );
          } else {
            toastr["warning"](
              "Não possivél realizar a operação, por favor entre em contato com o administrador de sistema."
            );
          }
        } catch (error) {
          console.log("error: ", error);
          console.log("err sv: ", err);
        }
      }
    );
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
