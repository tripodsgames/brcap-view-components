import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class PlataformaService {
  endPointSistemas = "sistemas";

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "authorization": "testet"
  });

  constructor(
    private http: HttpClient
  ) {
  }

  listarModulos(sistema, urlSistemas): Observable<any[]> {
    let url = urlSistemas + this.endPointSistemas;
    url += "?plataforma=darwin";
    url += "&codigo=" + sistema;
    return this.http.get<any[]>(url, { headers: this.headers });
  }

}
