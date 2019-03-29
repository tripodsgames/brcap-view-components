import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'cap-table',
  templateUrl: './cap-table.component.html',
  styleUrls: ['../../assets/css/cap-table.component.min.css']
})
export class CapTableComponent implements OnInit {

  @Input() items: any
  @Input() columns: any
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number;
  @Input() labelPaginas: string
  @Input() rowOptions: any
  @Input() tableTitle: string
  @Input() tableSubTitle: string
  @Input() hasSearch: boolean = true
  @Input() baixarPdf: boolean
  @Input() baixarXls: boolean

  @Output() itemOptionClick = new EventEmitter<any>()
  @Output() gerarPdf = new EventEmitter<any>()
  @Output() gerarXls = new EventEmitter<any>()

  //pagination
  totalPages: number;
  pagedItens: any;
  totalPaged: number;
  firstItem: number;
  lastItem: number;
  showItemOptions: number;
  numeroItens: number;

  itemsPesquisados;

  emptyMessage = false;

  constructor() {
    this.totalPages = 1
    this.pagedItens = []
    if (!this.itemsPerPage) this.itemsPerPage = 10
  }

  ngOnInit() {
    this.currentPage = 1
    this.setPage();
  }

  setPage(isNew = false) {
    if (isNew) {
      this.currentPage = 1
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage)
    }
    this.pagedItens = this.items.slice((this.currentPage - 1) * this.itemsPerPage, ((this.currentPage - 1) * this.itemsPerPage) + this.itemsPerPage)
    this.firstItem = (10 * (this.currentPage - 1)) + 1
    this.lastItem = this.firstItem + ((this.pagedItens.length) - 1)
    this.numeroItens = this.items.length;
  }

  prevPage() {
    this.currentPage -= 1;
    this.setPage();
  }

  nextPage() {
    this.currentPage += 1;
    this.setPage();
  }

  firstPage() {
    this.currentPage = 1;
    this.setPage();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.setPage();
  }

  clickItem(index) {
    if (this.showItemOptions == index) {
      this.showItemOptions = null;
    } else {
      this.showItemOptions = index;
    }
  }

  clickItemOption(opt, idx) {
    this.itemOptionClick.emit({ "option": opt, "index": (idx + ((this.currentPage - 1) * 10)) })
    this.showItemOptions = null
  }

  exportarPdf() {
    this.gerarPdf.emit(true);
    this.baixarPdf = true;
  }

  exportarXls() {
    this.gerarXls.emit(true);
    this.baixarXls = true;
  }

  pesquisar(query) {
    if (query.length >= 3) {
      this.itemsPesquisados = this.items.filter(el => el.toString().toLowerCase().includes(query.toLowerCase()));

      this.pagedItens = this.itemsPesquisados.slice((this.currentPage - 1) * this.itemsPerPage, ((this.currentPage - 1) * this.itemsPerPage) + this.itemsPerPage);
      this.currentPage = 1;
      this.numeroItens = this.itemsPesquisados.length;
      this.totalPages = Math.ceil(this.itemsPesquisados.length / this.itemsPerPage);

      if (this.numeroItens === 0) {
        this.emptyMessage = true;
        this.firstItem = 0;
        this.lastItem = 0;
      } else {
        this.emptyMessage = false;
        this.firstItem = (10 * (this.currentPage - 1)) + 1;
        this.lastItem = this.firstItem + ((this.pagedItens.length) - 1);
      }
    } else{
      this.emptyMessage = false;
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      this.setPage();
    }
  }

}
