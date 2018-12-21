// import { Observable } from "rxjs/Observable";
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import * as Rx from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/Rx";

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  endpointLogin = "authentication";
  endpointAuth = "authorization";
  endpointUsuarios = "usuarios";
  endpointEsqueciSenha = "?acao=esqueci_senha";

  login(usuario: any, url) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "testet");
    url += this.endpointLogin;

    return this.http.put(url, usuario, { headers: headers }).map(res => res);
  }

  getAuth(token, url) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    url += this.endpointAuth;

    return this.http.get(url, { headers: headers }).map(res => res);
  }

  getUser(login, url) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    url += this.endpointUsuarios;
    url += "?plataforma=darwin";
    url += "&login=" + login;

    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  esqueciSenha(usuario: any, url) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    url += this.endpointUsuarios + this.endpointEsqueciSenha;
    return this.http
      .patch(url, JSON.stringify(usuario), { headers: headers })
      .map(res => res)
      .catch(this.handleError);
  }

  private handleError(res: Response, error: any): Promise<any> {
    console.error("an error occured", error);
    return Promise.reject(error.message || error);
  }
}
