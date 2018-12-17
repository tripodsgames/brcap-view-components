import { Observable } from "rxjs/Observable";
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import * as Rx from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/Rx";

@Injectable()
export class PlataformaService {
  endPointSistemas = "sistemas";

  headers = new Headers();

  constructor(private _http: Http) {
    this.headers.append("Content-Type", "application/json");
    this.headers.append("authorization", "testet");
  }

  listarModulos(sistema, urlSistemas) {
    let url = urlSistemas + this.endPointSistemas;
    url += "?plataforma=darwin";
    url += "&codigo=" + sistema;
    return this._http.get(url, { headers: this.headers }).map(res => res.json());
  }
}
