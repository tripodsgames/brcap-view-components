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

  loading;
  usuario: any = new Object();
  msg: any = {};

  loginInvalido;
  senhaInvalida;

  loginRequired;
  senhaRequired;

  ngOnInit() {}

  login() {
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
        if (res) {
          this.loginService.getAuth(res.token, this.urlEnv).subscribe(res1 => {
            if (res1) {
              this.loginService.getUser(this.usuario.login, this.urlEnv).subscribe(u => {
                if (u) {
                  u = u[0];
                  const usuarioLogado: any = new Object();
                  usuarioLogado.nome = u.nome;
                  usuarioLogado.cpf = u.cpf;
                  usuarioLogado.situacao = u.situacao;
                  usuarioLogado.login = u.login;
                  usuarioLogado.token = res.token;
                  usuarioLogado.modulos = res1;
                  sessionStorage.setItem("userSession_key_" + this.sistema, JSON.stringify(usuarioLogado));
                  localStorage.setItem("userSession_key_" + this.sistema, JSON.stringify(usuarioLogado));
                  window.location.href = this.urlRedirect;
                } else {
                  toastr["warning"]("Usuário ou senha inválidos");
                }
              });
            } else {
              toastr["warning"]("Usuário ou senha inválidos");
            }
          });
        } else {
          toastr["warning"]("Usuário ou senha inválidos");
        }
      },
      err => {
        try {
          this.msg.title = "Falha ao se logar!";
          this.msg.text = err.json().mensagem;
        } catch (err) {
          this.msg.text = "Favor entrar em contato com o administrador de sistema!.";
        }
        this.loading = false;
      }
    );
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
