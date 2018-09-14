import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs";

@Injectable()
export class PlataformaService {
  endPointSistemas = "sistemas";

  headers = new Headers();

  constructor(private _http: Http) {
    this.headers.append("Content-Type", "application/json");
  }

  listarModulos(sistema, urlSistemas) {
    let url = urlSistemas + this.endPointSistemas;
    url += "?plataforma=darwin";
    url += "&codigo=" + sistema;
    return this._http.get(url, { headers: this.headers }).map(res => res.json());
  }
}
