import * as ExcelJS from "exceljs/dist/exceljs.min.js";
import { DadosPlanilha } from "../types";
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

const HEADER_ROW_NUM = 5;
const PATH_LOGO_BRASILCAP = `assets/img/logo-brasilcap.png`;

export default class ExportXLSMultiplaAba { 

    private book: ExcelJS.Workbook;
    private pathLogoProjeto: string;
    private idLogoBrasilcap: number;
    private idLogoProjeto: number;
    private nomeArquivo: string;

   constructor(nomeArquivo, pathLogoProjeto,) {
    this.book = new ExcelJS.Workbook();
    this.pathLogoProjeto = pathLogoProjeto;
    this.nomeArquivo = nomeArquivo;
   }
    

    async gerarAba(planilha: DadosPlanilha, logoProjeto?: string) {
        planilha.linhas = this.filtraLinhasMA(planilha);
        this.pathLogoProjeto = logoProjeto;

        await this.createSheetMA(planilha);
        await this.setSheetHeaderMA(planilha.titulo);
        this.setSheetColumnsMA(planilha);
        this.setSheetLinesMA(planilha);
        this.addBorderToLinesMA(planilha.titulo);
        this.formataColunasMA(planilha);
    }

    private async idImg(filename: string): Promise<number> {
        const base64 = await imgToBase64(filename, 'image/png');
        return this.book.addImage({
            base64,
            extension: 'png',
        });
    }
    
    private chavesPermitidasMA(planilha): Array<string> {
        return planilha.metadadosTabela.filter(metadado => !planilha.metadadosDetalhe
            || !metadado[planilha.metadadosDetalhe.chave])
            .map(metadado => metadado.chave);
    }
    
   private filtraLinhasMA(planilha: DadosPlanilha): Array<object> {
        return planilha.linhas.map(linha => ({
            ...this.chavesPermitidasMA(planilha)
                .reduce((acc, key) => ({ ...acc, [key]: linha[key] }), {}),
            ...(planilha.metadadosDetalhe
                ? { detalhes: linha[planilha.metadadosDetalhe.chave] }
                : {})
            }));
    }
    
    private async  createSheetMA(planilha) {
        this.book.addWorksheet(planilha.titulo);
        this.sheetBy(planilha.titulo).columns = planilha.metadadosTabela.map(({ chave }) => ({
            key: chave,
            width: WIDTH_CELL_XSL,
        }));
        this.idLogoBrasilcap = await this.idImg(PATH_LOGO_BRASILCAP);
        if (this.pathLogoProjeto) {
            this.idLogoProjeto = await this.idImg(this.pathLogoProjeto);
        }
    }
    
    private sheetBy(titulo) {
        return this.book.getWorksheet(titulo);
    }
    
    private async setSheetHeaderMA(titulo) {
        this.sheetBy(titulo).mergeCells('E1:F4');
        alignCenter(this.sheetBy(titulo).getCell('F4'));
        addDefaultBorder(this.sheetBy(titulo).getCell('F4'));
        this.sheetBy(titulo).getCell('F4').value = titulo;
        this.sheetBy(titulo).mergeCells('G1:H4');
        alignCenter(this.sheetBy(titulo).getCell('H4'));
        addDefaultBorder(this.sheetBy(titulo).getCell('H4'));
        this.sheetBy(titulo).mergeCells('I1:J4');
        alignCenter(this.sheetBy(titulo).getCell('J4'));
        addDefaultBorder(this.sheetBy(titulo).getCell('J4'));
        this.addImgsHeaderToSheetMA(titulo);
    }
    
    private async  addImgsHeaderToSheetMA(titulo) {
        this.sheetBy(titulo).mergeCells('A1:B4');
        addDefaultBorder(this.sheetBy(titulo).getCell('B4'));
        alignCenter(this.sheetBy(titulo).getCell('B4'));
        this.sheetBy(titulo).mergeCells('C1:D4');
        addDefaultBorder(this.sheetBy(titulo).getCell('D4'));
        alignCenter(this.sheetBy(titulo).getCell('D4'));
        this.sheetBy(titulo).addImage(this.idLogoBrasilcap, {
            tl: { col: 0.3, row: 0.6 },
            br: { col: 1.8, row: 2.8 },
        });
        if (this.pathLogoProjeto) {
            this.sheetBy(titulo).addImage(this.idLogoProjeto, {
                tl: { col: 2.2, row: 0.8 },
                br: { col: 3.8, row: 2.6 },
            });
        }
    }
    
    private setSheetColumnsMA(planilha) {
        const headerRow = this.sheetBy(planilha.titulo).getRow(HEADER_ROW_NUM);
        const columns = this.columnsMA(planilha);
        headerRow.values = columns;
        this.mesclasNoHeaderMA(headerRow, planilha);
        headerRow.height = 45;
        addAlignment({ wrapText: true })(headerRow);
        alignCenter(headerRow);
        headerRow.eachCell(addDefaultBorder);
        headerRow.eachCell(changeBgColor('E6E6E6'));
    }
    
    private columnsMA(planilha) {
        return planilha.metadadosTabela.map((elem, i, arr) =>
            this.celulaMescladaMesmoGrupoMA(elem, i, arr, planilha) ?
                elem.grupo : elem.nome
        );
    }
    
    private celulaMescladaMesmoGrupoMA(celula, i, arr, planilha) {
        const ultimo = i === (arr.length - 1);
        const mesclar = !ultimo && mesmoGrupo(celula, arr[i + 1]);
        if (mesclar) {
            planilha.celulasHeaderMesclarAoLado.push(i + 1);
        }
        return mesclar;
    }
    
    private mesclasNoHeaderMA(headerRow, planilha) {
        if (this.existemGruposMA(planilha)) {
            headerRow.eachCell((cell) => this.headerPodeMesclarAbaixoMA(cell, planilha) ?
                this.sheetBy(planilha.titulo).mergeCells(stringCelulaMesclarAbaixo(cell.col, cell.row))
                //se não é pra mesclar, coloca o rótulo na linha abaixo (row + 1)
                : this.sheetBy(planilha.titulo).getCell(cell.row + 1, cell.col).value = this.rotuloMA(cell.col, planilha));
            planilha.celulasHeaderMesclarAoLado.forEach(i => this.sheetBy(planilha.titulo).mergeCells(
                stringCelulaMesclarAoLado(i, HEADER_ROW_NUM)));
        }
    }
    
    private existemGruposMA(planilha) {
        return planilha.metadadosTabela.map(({ grupo }) => grupo)
            .filter(e => e).length > 0;
    }
    
    private headerPodeMesclarAbaixoMA({ col }, planilha) {
        return !planilha.celulasHeaderMesclarAoLado.includes(col)
            && (col === 1 || !planilha.celulasHeaderMesclarAoLado.includes(col - 1));
    }
    
    private rotuloMA(col,planilha) {
        return planilha.metadadosTabela.map(elem => elem.grupo ? elem.nome : '')[col - 1];
    }
    
    private setSheetLinesMA(planilha) {
        for (let linha of planilha.linhas) {
            this.sheetBy(planilha.titulo).addRow(this.chavesPermitidasMA(planilha).map(key => linha[key]));
            if (linha.detalhes && linha.detalhes.length > 0) {
                this.setSubSheetMA(linha, planilha);
            }
        }
    }
    
    private setSubSheetMA({ detalhes }, planilha) {
        this.adicionarSubheaderMA(planilha);
        detalhes.forEach(el => this.mesclaLinhaSubSheetMA(this.arrayLinhaMescladaMA(el, planilha), planilha));
        // linha vazia no final
        this.sheetBy(planilha.titulo).addRow([' ']);
    }
    
    private adicionarSubheaderMA(planilha) {
        const row: Array<string> = planilha.metadadosDetalhe.detalhes
            .reduce((acc: Array<string>, { tamanho, nome }) => [
                ...acc,
                ...this.elemLinhaMescladaMA(tamanho, nome),
            ], []);
        this.mesclaLinhaSubSheetMA(row, planilha);
    } 
    
    private arrayLinhaMescladaMA(linha: object, planilha): any[] {
        return Object.entries(linha).reduce((acc, [k, v]) =>  [
            ...acc,
            ...this.elemLinhaMescladaMA(this.tamanhoDetalheMA(k, planilha), v),
        ], []);
    }
    
    private mesclaLinhaSubSheetMA(row, planilha) {
        this.sheetBy(planilha.titulo).addRow(row);
        const linhaSheet = this.sheetBy(planilha.titulo).lastRow;
        const mesclas = planilha.metadadosDetalhe.detalhes
            .reduce((acc, { tamanho }, i) => tamanho <=1 ? acc
                : [
                    ...acc,
                    stringCelulasMesclarAoLado(i + 1, linhaSheet.number, tamanho - 1),
                ], []);
        mesclas.map(str => this.sheetBy(planilha.titulo).mergeCells(str));
    }
    
    private tamanhoDetalheMA(chave: string, planilha): number {
        return planilha.metadadosDetalhe.detalhes
            .find(detalhe => detalhe.chave === chave).tamanho;
    }
    
    private elemLinhaMescladaMA(tamanho: number, valor): any[] {
        return [...Array(tamanho).fill(valor)];
    }
    
    private addBorderToLinesMA(titulo) {
        this.sheetBy(titulo).eachRow(row => row.eachCell(addDefaultBorder));
    }
    
    private formataColunasMA(planilha) {
        planilha.metadadosTabela
            .map(({ formato }, index) => ({
                formato,
                coluna: index + 1,
            }))
            .filter(({ formato }) => formato)
            .forEach(({
                formato,
                coluna,
            }) => this.formataColunaMA(formato, coluna, planilha));
    }
    
    private formataColunaMA(formato: string, coluna: number, planilha) {
        this.sheetBy(planilha.titulo).getColumn(coluna).numFmt = formato;
    }

    async downloadFile() {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const xls64 = await this.book.xlsx.writeBuffer();
        const blob = new Blob([xls64], { type });
        saveAs(blob, `${this.nomeArquivo}.xlsx`);
    }
}

