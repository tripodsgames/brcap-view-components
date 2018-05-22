import * as moment_ from "moment/moment";

const moment = moment_;

import { Component, Injectable } from "@angular/core";

const DATE_PATTERN_DDMMYYYY = "DD/MM/YYYY";
const DATE_PATTERN_DDMMYY = "DD/MM/YY";
const DATE_PATTERN_YYYY_MM_DD = "YYYY-MM-DD";
const DATE_PATTERN_DDMMYYY_HHMMSSS = "DD/MM/YYYY HH:mm:ss";
const LOCALE_PT_BR = "pt-BR";
const LOCALE_CURRENCY_CODE_PT_BR = "BRL";

export default class BRCapUtil {
  static formatCurrency = function(value, moneySymbol) {
    if (moneySymbol) {
      return new Intl.NumberFormat(LOCALE_PT_BR, { style: "currency", currency: LOCALE_CURRENCY_CODE_PT_BR }).format(value);
    } else {
      return new Intl.NumberFormat(LOCALE_PT_BR, { style: "currency", currency: LOCALE_CURRENCY_CODE_PT_BR }).format(value).replace("R$", "");
    }
  };

  static removeSpecialCharacters = function(value) {
    return value.replace(/[\(\)_\.\s-]+/g, "");
  };

  static isNull = function(value) {
    return value === null;
  };

  static isNullOrEmpty = function(value) {
    return value === null || value === "";
  };

  static isUndefined = function(value) {
    return value === undefined;
  };

  static nullToEmpty = function(value) {
    return value == null ? "" : value;
  };

  static lettersOnly = function(event: any) {
    const charCode = event.keyCode;

    return (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8;
  };

  static formatDatePattern = function(data, pattern) {
    return moment(data)
      .utc()
      .format(pattern);
  };

  static formatDate = function(data) {
    return moment(data)
      .utc()
      .format(DATE_PATTERN_DDMMYY);
  };

  static formatDateTime = function(data) {
    return moment(data)
      .utc()
      .format(DATE_PATTERN_DDMMYYY_HHMMSSS);
  };

  static isValidCPF = function(cpf) {
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
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
    } else {
      return true;
    }
  };

  static isValidDate = function(date) {
    let bissexto = 0;
    const data = date;
    const tam = data.length;
    if (tam === 10) {
      const dia = data.substr(0, 2);
      const mes = data.substr(3, 2);
      const ano = data.substr(6, 4);
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
}
