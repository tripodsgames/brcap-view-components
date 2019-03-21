import { Component, OnInit, Input, Output, EventEmitter,HostListener } from '@angular/core';

@Component({
  selector: 'cap-grid-pagination',
  templateUrl: './cap-grid-pagination.component.html',
  styleUrls: ['./cap-grid-pagination.component.css']
})
export class CapGridPaginationComponent implements OnInit {
  

  @Input() items: any
  @Input() columns: any
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number;
  //@Input() totalPaged: number
  //@Input() firstItem: number
  //@Input() lastItem: number
  @Input() labelPaginas: string
  @Input() rowOptions: any
  @Input() fullTable: boolean
  // @Input() primeiraInformacao: any
  // @Input() segundaInformacao: any
  // @Input() terceiraInformacao: any

  @Output() itemOptionClick = new EventEmitter<any>()

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    let nonAffectedClasses = ['row-options', 'cap-grid-options', 'cap-grid-item-option']
    if(nonAffectedClasses.indexOf(event.target.className) < 0) this.showItemOptions = null
  }

  totalPages: number;
  pagedItens: any;
  totalPaged: number;
  firstItem: number;
  lastItem: number;
  showItemOptions: number;

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
    }
    this.pagedItens = this.items.slice((this.currentPage-1) * this.itemsPerPage, ((this.currentPage-1) * this.itemsPerPage) + this.itemsPerPage)
    this.firstItem = (10*(this.currentPage - 1)) + 1
    this.lastItem = this.firstItem + ((this.pagedItens.length) - 1)
    this.labelPaginas = `${this.firstItem}-${this.lastItem} de ${this.totalPages}`
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
