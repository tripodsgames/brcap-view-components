import { Injectable } from '@angular/core';
import * as ExcelJS from "exceljs/dist/exceljs.min.js";
import { MetadadosDetalhe, MetadadosXLS, DadosPlanilha } from "../types";
import ExportXLSMultiplaAba from "./export-xls-multi-aba";
import {
    imgToBase64,
    addAlignment,
    alignCenter,
    addDefaultBorder,
    changeBgColor,
    stringCelulaMesclarAoLado,
    stringCelulaMesclarAbaixo,
    stringCelulasMesclarAoLado,
    mesmoGrupo,
    saveAs,
    WIDTH_CELL_XSL,
} from './export-xls-utils';
import * as moment from "moment";

const HEADER_ROW_NUM = 5;
const PATH_LOGO_BRASILCAP = `assets/img/logo-brasilcap.png`;
const PATH_SEPARATOR = `assets/img/separator.png`;

@Injectable()
export class ExportXLSService {
    private book: ExcelJS.Workbook;
    private sheet;
    private abas;
    private linhas: Array<any>;
    private metadadosDetalhe: MetadadosDetalhe;
    private metadadosTabela: Array<MetadadosXLS>;
    private nomeArquivo: string;
    private pathLogoProjeto: string;
    private titulo: string;
    private idLogoBrasilcap: number;
    private idLogoProjeto: number;
    private idSeparator: number;
    private celulasHeaderMesclarAoLado: Array<number> = [];

    private alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"]

    constructor() { }

    private async idImg(filename: string): Promise<number> {
        const base64 = await imgToBase64(filename, 'image/png');
        return this.book.addImage({
            base64,
            extension: 'png',
        });
    }

    private init() {
        this.book = new ExcelJS.Workbook();
    }

    private async createSheet() {
        this.sheet = this.book.addWorksheet(this.titulo);
        // set default width to columns
        this.sheet.columns = this.metadadosTabela.map(({ chave }) => ({
            key: chave,
            width: WIDTH_CELL_XSL,
        }));

        this.idLogoBrasilcap = await this.idImg(PATH_LOGO_BRASILCAP);



        if (this.pathLogoProjeto) {
            this.idSeparator = await this.idImg(PATH_SEPARATOR);
            this.idLogoProjeto = await this.idImg(this.pathLogoProjeto);
        }
    }

    private async addImgsHeaderToSheet() {
        this.sheet.mergeCells('A1:D4');
        addDefaultBorder(this.sheet.getCell('D4'));
        alignCenter(this.sheet.getCell('D4'));
        this.sheet.addImage(this.idLogoBrasilcap, {
            tl: { col: 0.5, row: 0.9 },
            br: { col: 1.43, row: 2.58 },
            editAs: 'absolute'
        });

        if (this.pathLogoProjeto) {

            this.sheet.addImage(this.idSeparator, {
                tl: { col: 1.6, row: 0.5 },
                br: { col: 1.65, row: 3.2 },
                editAs: 'absolute'
            });

            this.sheet.addImage(this.idLogoProjeto, {
                tl: { col: 1.8, row: 0.9 },
                br: { col: 2.999, row: 2.55 },
                editAs: 'absolute'
                
            });
        }
    }

    private async setSheetHeader() {
        const elementos = new Array((this.metadadosTabela.length < 6) ? 6 : this.metadadosTabela.length).fill(null).map((x, i) => i);
       
        
        elementos.forEach((element, index, arr) => {
            const isPar = !(index % 2);

            if (index > 3 && isPar)
                this.setSheetMergeHeader(index, arr.length);
        });
        this.addImgsHeaderToSheet();
    }

    private setSheetMergeHeader(index, size) {
        const more = ((size - 1) === index) ? 0 : 1;
        const firstLetter = this.alfabeto[index] + 1;
        const lastLetter = this.alfabeto[index + more] + 4;

        this.sheet.mergeCells(`${firstLetter}:${lastLetter}`);
        alignCenter(this.sheet.getCell(lastLetter));
        addDefaultBorder(this.sheet.getCell(lastLetter));

        if (index === 4) {
            this.sheet.getCell(lastLetter).value = this.titulo;
        }
        
        if(index > 4 && (size - (!(size % 2)? 2: 1)) === index){
            this.sheet.getCell(lastLetter).value = `Data: ${moment(new Date()).format('DD/MM/YYYY')} \n Hora: ${moment(new Date()).format('h:mm:ss')}`;
        }
    }

    private formataColuna(formato: string, coluna: number) {
        this.sheet.getColumn(coluna).numFmt = formato;
    }
    private formataColunas() {
        this.metadadosTabela
            .map(({ formato }, index) => ({
                formato,
                coluna: index + 1,
            }))
            .filter(({ formato }) => formato)
            .forEach(({
                formato,
                coluna,
            }) => this.formataColuna(formato, coluna));
    }

    private celulaMescladaMesmoGrupo(celula, i, arr) {
        const ultimo = i === (arr.length - 1);
        const mesclar = !ultimo && mesmoGrupo(celula, arr[i + 1]);
        if (mesclar) {
            this.celulasHeaderMesclarAoLado.push(i + 1);
        }
        return mesclar;
    }

    private columns() {
        this.celulasHeaderMesclarAoLado = [];
        return this.metadadosTabela.map((elem, i, arr) =>
            this.celulaMescladaMesmoGrupo(elem, i, arr) ?
                elem.grupo : elem.nome
        );
    }

    private headerPodeMesclarAbaixo({ col }) {
        return !this.celulasHeaderMesclarAoLado.includes(col)
            && (col === 1 || !this.celulasHeaderMesclarAoLado.includes(col - 1));
    }
    private rotulo(col) {
        return this.metadadosTabela.map(elem => elem.grupo ? elem.nome : '')[col - 1];
    }
    private existemGrupos() {
        return this.metadadosTabela.map(({ grupo }) => grupo)
            .filter(e => e).length > 0;
    }
    private mesclasNoHeader(headerRow) {
        if (this.existemGrupos()) {
            headerRow.eachCell((cell) => this.headerPodeMesclarAbaixo(cell) ?
                this.sheet.mergeCells(stringCelulaMesclarAbaixo(cell.col, cell.row))
                //se não é pra mesclar, coloca o rótulo na linha abaixo (row + 1)
                : this.sheet.getCell(cell.row + 1, cell.col).value = this.rotulo(cell.col));
            this.celulasHeaderMesclarAoLado.forEach(i => this.sheet.mergeCells(
                stringCelulaMesclarAoLado(i, HEADER_ROW_NUM)));
        }
    }
    private setSheetColumns() {
        //column names:
        const headerRow = this.sheet.getRow(HEADER_ROW_NUM);
        const columns = this.columns();
        headerRow.values = columns;
        this.mesclasNoHeader(headerRow);
        headerRow.height = 20;
        addAlignment({ wrapText: true })(headerRow);
        alignCenter(headerRow);
        headerRow.eachCell(addDefaultBorder);
        headerRow.eachCell(changeBgColor('E6E6E6'));
    }

    private setSheetLines() {
        for (let linha of this.linhas) {
            this.sheet.addRow(this.chavesPermitidas().map(key => linha[key] || ''));
            if (linha.detalhes && linha.detalhes.length > 0) {
                this.setSubSheet(linha);
            }
        }
    }

    private addBorderToLines() {
        this.sheet.eachRow(row => row.eachCell(addDefaultBorder));
    }

    private tamanhoDetalhe(chave: string): number {
        return this.metadadosDetalhe.detalhes
            .find(detalhe => detalhe.chave === chave).tamanho;
    }

    private elemLinhaMesclada(tamanho: number, valor): any[] {
        return [...Array(tamanho).fill(valor)];
    }

    private arrayLinhaMesclada(linha: object): any[] {
        return Object.entries(linha).reduce((acc, [k, v]) => [
            ...acc,
            ...this.elemLinhaMesclada(this.tamanhoDetalhe(k), v),
        ], []);
    }

    private adicionarSubheader() {
        const row: Array<string> = this.metadadosDetalhe.detalhes
            .reduce((acc: Array<string>, { tamanho, nome }) => [
                ...acc,
                ...this.elemLinhaMesclada(tamanho, nome),
            ], []);
        this.mesclaLinhaSubSheet(row);
    }
    private mesclaLinhaSubSheet(row) {
        this.sheet.addRow(row);
        const linhaSheet = this.sheet.lastRow;
        const mesclas = this.metadadosDetalhe.detalhes
            .reduce((acc, { tamanho }, i) => tamanho <= 1 ? acc
                : [
                    ...acc,
                    stringCelulasMesclarAoLado(i + 1, linhaSheet.number, tamanho - 1),
                ], []);
        mesclas.map(str => this.sheet.mergeCells(str));
    }

    private setSubSheet({ detalhes }) {
        this.adicionarSubheader();
        detalhes.forEach(el => this.mesclaLinhaSubSheet(this.arrayLinhaMesclada(el)));
        // linha vazia no final
        this.sheet.addRow([' ']);
    }

    private async downloadFile() {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const xls64 = await this.book.xlsx.writeBuffer();
        const blob = new Blob([xls64], { type });
        saveAs(blob, `${this.nomeArquivo}.xlsx`);
    }

    chavesPermitidas(): Array<string> {
        return this.metadadosTabela.filter(metadado => !this.metadadosDetalhe
            || !metadado[this.metadadosDetalhe.chave])
            .map(metadado => metadado.chave);
    }

    filtraLinhas(linhas: Array<object>): Array<object> {
        return linhas.map(linha => ({
            ...this.chavesPermitidas()
                .reduce((acc, key) => ({ ...acc, [key]: linha[key] }), {}),
            ...(this.metadadosDetalhe
                ? { detalhes: linha[this.metadadosDetalhe.chave] }
                : {})
        }));
    }

    async gerarXls({
        linhas,
        metadadosTabela,
        nomeArquivo,
        titulo,
        logoProjeto,
        metadadosDetalhe,
    }: {
        linhas: Array<object>,
        metadadosTabela: Array<MetadadosXLS>,
        nomeArquivo: string,
        titulo: string,
        logoProjeto?: string,
        metadadosDetalhe?: MetadadosDetalhe,
    }) {
        this.metadadosTabela = metadadosTabela;
        this.metadadosDetalhe = metadadosDetalhe;
        this.linhas = this.filtraLinhas(linhas);
        this.nomeArquivo = nomeArquivo;
        this.titulo = titulo;
        this.pathLogoProjeto = logoProjeto;

        this.init();
        await this.createSheet();
        await this.setSheetHeader();
        this.setSheetColumns();
        this.setSheetLines();
        this.addBorderToLines();
        this.formataColunas();
        await this.downloadFile();
    }
    // TODO: Refatorar implementacao de multi aba
    async gerarXlsMultiplasAbas({
        planilhas,
        nomeArquivo,
        logoProjeto,
    }: {
        planilhas: Array<DadosPlanilha>,
        nomeArquivo: string,
        logoProjeto?: string,
    }) {
        const multiAba = new ExportXLSMultiplaAba(nomeArquivo, logoProjeto);
        const promises = planilhas.map(planilha => multiAba.gerarAba(planilha, logoProjeto));
        for (const gerarAba of promises)
            await gerarAba
        await multiAba.downloadFile();
    }
}