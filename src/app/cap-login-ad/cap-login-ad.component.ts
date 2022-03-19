import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import toastr from "toastr";
import { LoginAdService } from "../services/login-ad.service";

@Component({
  selector: 'cap-login-ad',
  templateUrl: './cap-login-ad.component.html',
  styleUrls: ['./cap-login-ad.component.scss']
})
export class CapLoginAdComponent implements OnInit, OnDestroy {

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
  @Input("environment")
  environment;

  @ViewChild("senha", { static: true })
  senha;
  @ViewChild("iconeEmail", { static: true })
  iconeEmail;
  @ViewChild("icone", { static: true })
  icone;

  userKeySession = "userSession_key_";

  loading;
  usuario: any = new Object();
  msg: any = {};

  loginInvalido;
  senhaInvalida;

  loginRequired;
  senhaRequired;

  private subscription$: Subscription = new Subscription();

  constructor(
    private loginService: LoginAdService
  ) { }

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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  checkLoginValido() {
    this.loginRequired = !this.usuario.login;
    // if (this.loginRequired) {
    //   this.loginInvalido = false;
    // } else {
    //   this.loginInvalido = !this.validateEmail(this.usuario.login);
    // }
  }

  iconEmail() {
    if (this.loginInvalido || this.loginRequired) {
      this.iconeEmail.icon = "alerta";
    } else if (this.usuario.login) {
      this.iconeEmail.icon = "check-circulo";
    }
  }

  checkSenhaValida() {
    this.senhaRequired = !this.usuario.senha;
    if (!this.senhaRequired) {
      this.icone.icon = "esconder-senha";
    } else {
      this.icone.icon = "alerta";
    }
  }

  toggle() {
    this.senha.nativeElement.type = this.senha.nativeElement.type === "text" ? "password" : "text";
    this.icone.icon = this.icone.icon === "ver-senha" ? "esconder-senha" : "ver-senha";
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
      this.icone.icon = "alerta";
      return;
    }

    this.usuario.plataforma = "darwin";
    this.usuario.sistema = this.sistema;
    this.usuario.login = this.usuario.login;

    const loginSub = this.loginService.login(this.usuario, this.urlEnv)
      .pipe(first())
      .subscribe(
        res => {
          if (res && res["_body"]) {
            const body = JSON.parse(res["_body"]);

            const authSub = this.loginService.getAuth(body.token, this.urlEnv)
              .pipe(first())
              .subscribe(
                modulosPermitidos => this.authHandler(modulosPermitidos, body),
                err => {
                  if (err) {
                    if (err.status === 401) {
                      toastr["warning"]("Usuário sem permissão de acesso.");
                    } else if (err["_body"]) {
                      toastr["warning"](JSON.parse(err["_body"]).mensagem);
                    }
                  }
                }
              );

            this.subscription$.add(authSub);
          } else {
            toastr["warning"]("Usuário ou senha inválidos");
          }
        },
        err => {
          if (err && err["_body"]) {
            console.log("Error: ", JSON.parse(err["_body"]).mensagem);
          }
          toastr["warning"]("Usuário ou senha inválidos");
        }
      );

    this.subscription$.add(loginSub);
  }

  authHandler(modulosPermitidos, body) {
    if (modulosPermitidos && modulosPermitidos["_body"]) {
      const usuarioLogado: any = new Object();
      usuarioLogado.nome = body.nome;
      usuarioLogado.login = this.usuario.login;
      usuarioLogado.email = this.usuario.login;
      usuarioLogado.token = body.token;
      usuarioLogado.modulos = JSON.parse(modulosPermitidos["_body"]);
      sessionStorage.setItem(
        this.userKeySession + this.sistema + "_" + this.environment,
        JSON.stringify(usuarioLogado)
      );
      localStorage.setItem(
        this.userKeySession + this.sistema + "_" + this.environment,
        JSON.stringify(usuarioLogado)
      );
      window.location.href = this.urlRedirect;
    } else {
      toastr["warning"]("Usuário ou senha inválidos");
    }
  }

  esqueciSenha(usuario) {
    toastr.clear();
    if (!usuario.login) {
      toastr["info"]("É necessário informar o e-mail.");
      return;
    }
    usuario.senha = undefined;
    usuario.plataforma = "darwin";

    const esqueciSenhaSub = this.loginService.esqueciSenha(usuario, this.urlEnv)
      .pipe(first())
      .subscribe(
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

    this.subscription$.add(esqueciSenhaSub);
  }

}
