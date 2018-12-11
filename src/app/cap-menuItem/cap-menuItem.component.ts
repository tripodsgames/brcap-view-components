import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "cap-menuItem",
  templateUrl: "./cap-menuItem.component.html",
  styleUrls: ["./cap-menuItem.component.css"]
})
export class CapMenuItemComponent {
  @Input("id")
  id: string;
  @Input("value")
  value: any;
  @Input("link")
  link: string;
  @Input("styleClass")
  styleClass: string;
  @Input("principal")
  principal: boolean;
  @ViewChild("items")
  items: ElementRef;
  @ViewChild("menuItem")
  menuItem: ElementRef;

  exibir = false;

  mod = "";
  status = "";
  subClass = "";

  constructor() {}

  public getIconUrl(icone) {
    return icone ? icone.replace(/#/g, "%23") : null;
  }

  toggleClass(hasChild) {
    if (hasChild) {
      this.exibir = !this.exibir;
    }
  }

  // ativando(item) {

  //   this.selecionado = item.nome;

  //   if (this.selecionado == item.nome) {
  //     this.subClass = "ativado";
  //    } else {
  //      this.subClass = "";
  //    }

  //   console.log("item = " + item);
  //   console.log("Selecionado = " + item.nome);
  //   console.log("Selec. Funcio = " + item[0]);
  //   console.log("menuItem = " + this.styleClass);
  //   console.log("subClass = " + this.subClass);
  // }


  clickEvent(value,item)
   {
    this.mod = value.nome
    this.status = item.nome;
    this.subClass = "ativado"
    

    console.log("Mod = " + this.mod);
    console.log("Item Nome = " + item.nome);
    console.log("Status = " + this.status);
  }

  cleanerAll() {
    // this.mod = value.nome
    // this.status = item.nome;

    //if (this.selecionado == item.nome)
    this.subClass = "";
  }
}
