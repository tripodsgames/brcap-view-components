import { Component, OnInit, Input, Output, EventEmitter,HostListener } from '@angular/core';

@Component({
  selector: 'cap-grid-pagination',
  templateUrl: './cap-grid-pagination.component.html',
  styleUrls: ['./cap-grid-pagination.component.css']
})
export class CapGridPaginationComponent implements OnInit {
  

  @Input() items: any
  @Input() columns: any
  @Input() itemsPerPage: number
  @Input() currentPage: number
  @Input() labelPaginas: string
  @Input() rowOptions: any

  @Output() itemOptionClick = new EventEmitter<any>()

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    let nonAffectedClasses = ['row-options', 'cap-grid-options', 'cap-grid-item-option']
    if(nonAffectedClasses.indexOf(event.target.className) < 0) this.showItemOptions = null
  }

  totalPages: number
  pagedItens: any
  showItemOptions: number
  @Input() totalPaged: number
  @Input() fistItem: number
  @Input() lastItem: number
  

  constructor() {
    this.totalPages = 1
    this.pagedItens = []
    if(!this.itemsPerPage) this.itemsPerPage = 10
  }

  ngOnInit() {
    this.currentPage = 1
    this.setPage()
  }

  prevPage(){
    this.currentPage -= 1
    this.setPage()
  }

  nextPage(){
    this.currentPage += 1
    this.setPage()
  }

  setPage(isNew = false){    
    if(isNew) {
      this.currentPage = 1
      this.totalPages = Math.ceil(this.items.length/this.itemsPerPage)
      this.totalPaged = this.pagedItens.length
      this.fistItem = ((10*(this.currentPage - 1)) + 1)
      this.lastItem = this.fistItem + (this.totalPaged - 1)
      console.log("Total de Paginas = ", this.totalPages);
      console.log("Itens da Pagina = ", this.pagedItens);
      console.log("Total na Pagina = ", this.totalPaged);
      console.log("Primer => " + this.fistItem + " / last => " + this.lastItem );
    }
    this.labelPaginas = `${this.fistItem}-${this.lastItem} de ${this.items.length}`
    this.pagedItens = this.items.slice((this.currentPage-1) * this.itemsPerPage, ((this.currentPage-1) * this.itemsPerPage) + this.itemsPerPage)
  }

  clickItem(index){
    if(this.showItemOptions == index){
      this.showItemOptions = null
    }else{
      this.showItemOptions = index
    }
  }

  clickItemOption(opt, idx){
    this.itemOptionClick.emit({"option": opt, "index": (idx + ((this.currentPage-1)*10))})
    this.showItemOptions = null
  }

}
