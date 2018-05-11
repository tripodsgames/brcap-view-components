import { Directive, Input } from "@angular/core";
declare var $: any;
@Directive({
  selector: "[dateRange]",
  host: {
    class: "input-daterange",
    "data-date-format": "dd/mm/yyyy"
  }
})
export class DateRangeDirective {
  constructor() {}

  @Input("clearButton") clearButton: boolean;

  ngAfterViewInit() {
    $(document).ready(function() {
      $.fn.datepicker.dates["pt-BR"] = {
        days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        daysMin: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthsShort: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
        today: "Hoje",
        monthsTitle: "Meses",
        clear: "Limpar",
        format: "dd/mm/yyyy"
      };
      $(".input-daterange").datepicker({
        format: "dd/mm/yyyy",
        language: "pt-BR",
        clearBtn: this.clearButton
      });
    });
  }
}
