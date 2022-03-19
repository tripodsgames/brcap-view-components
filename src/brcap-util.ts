import moment from "moment";

const DATE_PATTERN_DDMMYY = "DD/MM/YY";
const DATE_PATTERN_DDMMYYY_HHMMSSS = "DD/MM/YYYY HH:mm:ss";
const LOCALE_PT_BR = "pt-BR";
const LOCALE_CURRENCY_CODE_PT_BR = "BRL";

const cpfBlacklist = Object.freeze([
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
]);

export default class BRCapUtil {
  static formatCurrency = function (value, moneySymbol) {
    if (moneySymbol) {
      return new Intl.NumberFormat(LOCALE_PT_BR, { style: "currency", currency: LOCALE_CURRENCY_CODE_PT_BR }).format(value);
    } else {
      return new Intl.NumberFormat(LOCALE_PT_BR, { style: "currency", currency: LOCALE_CURRENCY_CODE_PT_BR }).format(value).replace("R$", "");
    }
  };

  static removeSpecialCharacters = (value: string) => value.replace(/[\(\)_\.\s-]+/g, "");

  static isNull = (value: any) => value === null;

  static isNullOrEmpty = (value: string) => value === null || value === ""

  static isUndefined = (value: any) => value === undefined;

  static nullToEmpty = (value: string) => value == null ? "" : value;

  static lettersOnly = (event: KeyboardEvent) => {
    const charCode = event.keyCode;
    return (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8;
  };

  static formatDatePattern = (data: moment.MomentInput, pattern: string) => {
    return moment(data)
      .utc()
      .format(pattern);
  };

  static formatDate = (data: moment.MomentInput) => {
    return moment(data)
      .utc()
      .format(DATE_PATTERN_DDMMYY);
  };

  static formatDateTime = (data: moment.MomentInput) => {
    return moment(data)
      .utc()
      .format(DATE_PATTERN_DDMMYYY_HHMMSSS);
  };

  static isValidCPF = (cpf: string | number) => {
    if (cpf == null) {
      return false;
    }

    cpf = `${cpf}`;

    if (cpf.length !== 11 || cpfBlacklist.includes(cpf)) {
      return false;
    }

    let numero = 0;
    let caracter = "";
    let numeros = "0123456789";
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = "";
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf !== cpfAux) {
      return false;
    }

    return true;
  };

  static isValidDate = (date: string) => {
    let bissexto = 0;
    const data = date;
    const tam = data.length;
    if (tam === 10) {
      const dia = parseInt(data.substr(0, 2));
      const mes = data.substr(3, 2);
      const ano = parseInt(data.substr(6, 4));
      if (ano > 1900 || ano < 2100) {
        switch (mes) {
          case "01":
          case "03":
          case "05":
          case "07":
          case "08":
          case "10":
          case "12":
            if (dia <= 31) {
              return true;
            }
            break;
          case "04":
          case "06":
          case "09":
          case "11":
            if (dia <= 30) {
              return true;
            }
            break;
          case "02":
            if (ano % 4 === 0 || ano % 100 === 0 || ano % 400 === 0) {
              bissexto = 1;
            }
            if (bissexto === 1 && dia <= 29) {
              return true;
            }
            if (bissexto !== 1 && dia <= 28) {
              return true;
            }
            break;
        }
      }
    }
    return false;
  };

  static guid() {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
  }

  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}
