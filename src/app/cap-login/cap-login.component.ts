import { Component, OnInit, Input } from "@angular/core";
import { LoginService } from "../services/login.service";
import toastr from "toastr";

@Component({
  selector: "cap-login",
  templateUrl: "./cap-login.component.html",
  styleUrls: ["./cap-login.component.scss"]
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
  @Input("env")
  env;

  userKeySession = "userSession_key_";

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
          const body = JSON.parse(res._body);
          this.loginService.getAuth(body.token, this.urlEnv).subscribe(
            modulosPermitidos => {
              if (modulosPermitidos && modulosPermitidos._body) {
                const usuarioLogado: any = new Object();
                usuarioLogado.nome = body.nome;
                usuarioLogado.login = this.usuario.login;
                usuarioLogado.email = this.usuario.login;
                usuarioLogado.token = body.token;
                usuarioLogado.modulos = JSON.parse(modulosPermitidos._body);
                sessionStorage.setItem(this.userKeySession + this.sistema + "_" + this.env, JSON.stringify(usuarioLogado));
                localStorage.setItem(this.userKeySession + this.sistema + "_" + this.env, JSON.stringify(usuarioLogado));
                window.location.href = this.urlRedirect;
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
