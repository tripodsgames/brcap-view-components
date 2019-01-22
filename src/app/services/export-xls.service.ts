import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import {
    imgToBase64,
    addAlignment,
    alignCenter,
    addDefaultBorder,
    changeBgColor,
    stringCelulaMesclarAoLado,
    stringCelulaMesclarAbaixo,
    mesmoGrupo,
    saveAs,
    WIDTH_CELL_XSL,
} from './export-xls-utils';

@Injectable()
export class ExportXLSService {
    private book = new ExcelJS.Workbook();
    private sheet;
    private linhas: Array<object>;
    private metadadosTabela: Array<{
        chave: string,
        nome: string,
        unidade?: string,
        grupo?: string
    }>;
    private nomeArquivo: string;
    private titulo: string;
    private idLogoBrasilcap: number;
    private idLogoFinanceiro: number;
    private celulasHeaderMesclarAoLado: Array<number> = [];

    constructor() { }

    private async idImg(type): Promise<number> {
        const filename = `assets/img/logo-${type}.png`;
        const base64 = await imgToBase64(filename, 'image/png');
        return this.book.addImage({
            base64,
            extension: 'png',
        });
    }

    private async createSheet() {
        this.sheet = this.book.addWorksheet(this.titulo);
        // set default width to columns
        this.sheet.columns = this.metadadosTabela.map(({ chave }) => ({
            key: chave,
            width: WIDTH_CELL_XSL,
        }));
        this.idLogoBrasilcap = await this.idImg('brasilcap');
        this.idLogoFinanceiro = await this.idImg('financeiro');
    }

    private async addImgsHeaderToSheet() {
        this.sheet.mergeCells('A1:B4');
        addDefaultBorder(this.sheet.getCell('B4'));
        alignCenter(this.sheet.getCell('B4'));
        this.sheet.mergeCells('C1:D4');
        addDefaultBorder(this.sheet.getCell('D4'));
        alignCenter(this.sheet.getCell('D4'));
        this.sheet.addImage(this.idLogoBrasilcap, {
            tl: { col: 0.3, row: 0.6 },
            br: { col: 1.8, row: 2.8 },
        });
        this.sheet.addImage(this.idLogoFinanceiro, {
            tl: { col: 2.2, row: 0.8 },
            br: { col: 3.8, row: 2.6 },
        });
    }

    private async setSheetHeader() {
        this.sheet.mergeCells('E1:F4');
        alignCenter(this.sheet.getCell('F4'));
        addDefaultBorder(this.sheet.getCell('F4'));
        this.sheet.getCell('F4').value = this.titulo;
        this.sheet.mergeCells('G1:H4');
        alignCenter(this.sheet.getCell('H4'));
        addDefaultBorder(this.sheet.getCell('H4'));
        this.sheet.mergeCells('I1:J4');
        alignCenter(this.sheet.getCell('J4'));
        addDefaultBorder(this.sheet.getCell('J4'));
        this.addImgsHeaderToSheet();
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
    private mesclasNoHeader(headerRow) {
        headerRow.eachCell((cell) => this.headerPodeMesclarAbaixo(cell) ?
            this.sheet.mergeCells(stringCelulaMesclarAbaixo(cell.col, cell.row))
            //se não é pra mesclar, coloca o rótulo na linha abaixo (row + 1)
            : this.sheet.getCell(cell.row + 1, cell.col).value = this.rotulo(cell.col));
        this.celulasHeaderMesclarAoLado.forEach(i => this.sheet.mergeCells(
            stringCelulaMesclarAoLado(i, 5)));
    }
    private setSheetColumns() {
        //column names:
        const headerRow = this.sheet.getRow(5);
        const columns = this.columns();
        changeBgColor('E6E6E6')(headerRow);
        headerRow.values = columns;
        this.mesclasNoHeader(headerRow);
        headerRow.height = 45;
        addAlignment({ wrapText: true })(headerRow);
        alignCenter(headerRow);
        headerRow.eachCell(addDefaultBorder);
    }

    private setSheetLines() {
        this.sheet.addRows(this.linhas.map(r => this.chavesPermitidas()
            .map(key => r[key])));
        this.sheet.eachRow(addDefaultBorder);
    }

    private async downloadFile() {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const xls64 = await this.book.xlsx.writeBuffer();
        const blob = new Blob([xls64], { type });
        saveAs(blob, `${this.nomeArquivo}.xlsx`);
    }

    chavesPermitidas() {
        return this.metadadosTabela.map(e => e.chave);
    }

    async gerarXls({
        linhas,
        metadadosTabela,
        nomeArquivo,
        titulo,
    }: {
        linhas: Array<object>,
        metadadosTabela: Array<{
            chave: string,
            nome: string,
            unidade?: string,
            grupo?: string
        }>,
        nomeArquivo: string,
        titulo: string,
    }) {
        this.metadadosTabela = metadadosTabela;
        this.linhas = linhas.map(linha => this.chavesPermitidas().reduce((acc, key) =>
            ({ ...acc, [key]: linha[key] }), {}));
        this.nomeArquivo = nomeArquivo;
        this.titulo = titulo;

        await this.createSheet();
        await this.setSheetHeader();
        this.setSheetColumns();
        this.setSheetLines();
        await this.downloadFile();
    }

}
