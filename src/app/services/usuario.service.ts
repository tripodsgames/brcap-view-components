import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs";

@Injectable()
export class UsuarioService {
  endpointUsuarios = "usuarios";

  headers = new Headers();

  constructor(private _http: Http) {
    this.headers.append("Content-Type", "application/json");
  }

  alterar(usuario: any, urlUsuarios) {
    const url = urlUsuarios + this.endpointUsuarios;

    return this._http.put(url, usuario, { headers: this.headers }).map(res => {
      res.json();
    });
  }

  listarUsuarios(urlUsuarios) {
    const url = urlUsuarios + this.endpointUsuarios + "?plataforma=darwin";

    return this._http.get(url, { headers: this.headers }).map(res => res.json());
  }

  permissionar(permissioes, login, sistema, urlUsuarios) {
    let url = urlUsuarios + this.endpointUsuarios;
    url += "/" + login;
    url += "%23" + sistema;
    url += "/sistemas";
    url += "/darwin";
    url += "/permissoes";

    return this._http.post(url, permissioes, { headers: this.headers }).map(res => res.json());
  }

  buscaPermissoes(login, sistema, urlUsuarios) {
    let url = urlUsuarios + this.endpointUsuarios;
    url += "/" + login;
    url += "%23" + sistema;
    url += "/sistemas";
    url += "/darwin";
    url += "/permissoes";

    return this._http.get(url, { headers: this.headers }).map(res => res.json());
  }
}
