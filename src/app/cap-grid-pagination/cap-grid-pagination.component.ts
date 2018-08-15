import { Component, OnInit, Input } from '@angular/core';
import { log } from 'util';

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

  totalPages: number
  pagedItens: any

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
    this.currentPage -= 1;
    this.setPage()
  }

  nextPage(){
    this.currentPage += 1;
    this.setPage()
  }

  setPage(isNew = false){    
    if(isNew) {
      this.currentPage = 1
      this.totalPages = Math.ceil(this.items.length/this.itemsPerPage)
    }
    this.labelPaginas = `Página ${this.currentPage} de ${this.totalPages}`
    this.pagedItens = this.items.slice((this.currentPage-1) * this.itemsPerPage, ((this.currentPage-1) * this.itemsPerPage) + this.itemsPerPage)
  }

}
