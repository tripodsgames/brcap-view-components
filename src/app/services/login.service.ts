import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  endpointLogin = "authentication";
  endpointAuth = "authorization";
  endpointUsuarios = "usuarios";
  endpointEsqueciSenha = "?acao=esqueci_senha";

  login(usuario: any, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "testet");
    url += this.endpointLogin;

    return this.http.put(url, usuario, { headers: headers });
  }

  getAuth(token, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    url += this.endpointAuth;

    return this.http.get(url, { headers: headers });
  }

  getUser(login, url): Observable<any[]> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    url += this.endpointUsuarios;
    url += "?plataforma=darwin";
    url += "&login=" + login;

    return this.http
      .get(url, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  esqueciSenha(usuario: any, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    url += this.endpointUsuarios + this.endpointEsqueciSenha;
    return this.http
      .patch(url, JSON.stringify(usuario), { headers: headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(res: Response, error: any): Promise<any> {
    console.error("an error occured", error);
    return Promise.reject(error.message || error);
  }
}
