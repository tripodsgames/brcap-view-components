import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class UsuarioService {
  endpointUsuarios = "usuarios";

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "authorization": "teste"
  });

  constructor(
    private http: HttpClient
  ) { }

  alterar(usuario: any, urlUsuarios): Observable<any[]> {
    const url = urlUsuarios + this.endpointUsuarios;

    return this.http.put<any[]>(url, usuario, { headers: this.headers });
  }

  listarUsuarios(urlUsuarios): Observable<any> {
    const url = urlUsuarios + this.endpointUsuarios + "?plataforma=darwin";

    return this.http.get<any[]>(url, { headers: this.headers });
  }

  permissionar(permissioes, login, sistema, urlUsuarios): Observable<any[]> {
    let url = urlUsuarios + this.endpointUsuarios;
    url += "/" + login;
    url += "%23" + sistema;
    url += "/sistemas";
    url += "/darwin";
    url += "/permissoes";

    return this.http.post<any[]>(url, permissioes, { headers: this.headers });
  }

  buscaPermissoes(login, sistema, urlUsuarios): Observable<any[]> {
    let url = urlUsuarios + this.endpointUsuarios;
    url += "/" + login;
    url += "%23" + sistema;
    url += "/sistemas";
    url += "/darwin";
    url += "/permissoes";

    return this.http.get<any[]>(url, { headers: this.headers });
  }

  buscarEstadoPermissionamento(urlUsuarios, sistema, estadoPermissionamento, exportacaoPDF): Observable<any[]> {
    let url = urlUsuarios + this.endpointUsuarios;
    url += "/plataformas/darwin/sistemas";
    url += "/" + sistema;
    url += "/permissoes";
    url += "?filtro=";
    url += estadoPermissionamento;
    if (exportacaoPDF)
      url += "&permissoes=true";

    return this.http.get<any[]>(url, { headers: this.headers });
  }
}
