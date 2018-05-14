import { Component } from "@angular/core";
import { DateRangeDTO } from "./model/date-range.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "app";

  lista = [];
  listaExibicao: any;

  data;
  loading = false;

  teste() {
    this.loading = true;
    setTimeout(() => {
      alert("funcionou");
      this.loading = false;
    }, 3000);
  }
}
