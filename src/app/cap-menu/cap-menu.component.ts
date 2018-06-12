import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "cap-menu",
  templateUrl: "./cap-menu.component.html",
  styleUrls: ["./cap-menu.component.css"]
})
export class CapMenuComponent implements OnInit {
  @Input("id") id: string;
  @Input("value") value: Array<any>;
  @Input("width") width: number;
  @Input("colors") colors: any;
  @Input("modulo") modulo: string;
  @ViewChild("divMenu") divMenu: ElementRef;

  constructor() {}

  paletaCoresSitemas = {
    produtos: {
      sistema: "produtos",
      cores: {
        corPrincipal: "#A5761B",
        corSecundaria: "#B8841F"
      }
    },
    posvenda: {
      sistema: "posvenda",
      cores: {
        corPrincipal: "#006BBB",
        corSecundaria: "#008CDE"
      }
    }
  };

  ngOnInit() {
    if (this.width) {
      this.divMenu.nativeElement.style.width = this.width + "px";
    }
    if (this.modulo) {
      this.colors = this.paletaCoresSitemas[this.modulo].cores;
    }
    if (this.colors.corPrincipal) {
      this.divMenu.nativeElement.style.background = this.colors.corPrincipal;
    }
  }
}
