import { Observable } from "rxjs/Observable";
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  endpointLogin = "authentication";
  endpointAuth = "authorization";
  endpointUsuarios = "usuarios";

  login(usuario: any, url): Observable<any> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    //headers.append("authorization", this.service.getAuth());
    url += this.endpointLogin;

    return this.http
      .put(url, usuario, { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAuth(token, url): Observable<any> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    url += this.endpointAuth;

    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getUser(login, url): Observable<any> {
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

  private handleError(res: Response, error: any): Promise<any> {
    console.error("an error occured", error);
    return Promise.reject(error.message || error);
  }
}
