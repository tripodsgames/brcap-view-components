import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

    return this.http.put(urlMalthus, body, { headers: headers });
  }

  getAuth(token, url): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    let urlAuth = url + this.endpointAuth;

    return this.http.get(urlAuth, { headers: headers });
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