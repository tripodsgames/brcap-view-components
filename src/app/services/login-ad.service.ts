import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class LoginAdService {
  constructor(private http: HttpClient) { }

  endpointLoginAd = "authentication/active-directory";
  endpointLogin = "authentication";
  endpointAuth = "authorization";
  endpointUsuarios = "usuarios";
  endpointEsqueciSenha = "?acao=esqueci_senha";

  login(body: any, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let urlMalthus = url + this.endpointLoginAd;

    return this.http.put(urlMalthus, body, { headers: headers }).map(res => res);
  }

  getAuth(token, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    let urlAuth = url + this.endpointAuth;

    return this.http.get(urlAuth, { headers: headers }).map(res => res);
  }

  getUser(login, url): Observable<any[]> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    url += this.endpointUsuarios;
    url += "?plataforma=darwin";
    url += "&login=" + login;

    return this.http
      .get(url, { headers: headers })
      .catch(this.handleError);
  }

  esqueciSenha(usuario: any, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    url += this.endpointUsuarios + this.endpointEsqueciSenha;
    return this.http
      .patch(url, JSON.stringify(usuario), { headers: headers })
      .catch(this.handleError);
  }

  private handleError(res: Response, error: any): Promise<any> {
    console.error("an error occured", error);
    return Promise.reject(error.message || error);
  }
}