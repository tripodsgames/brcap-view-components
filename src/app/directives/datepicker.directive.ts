import { Directive, OnInit, Renderer, ElementRef } from "@angular/core";
import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;
import "assets/js/bootstrap-datepicker.js";

@Directive({
  selector: "[datepicker]",
  host: {
    "data-provide": "datepicker",
    class: "datepicker",
    "data-date-format": "dd/mm/yyyy"
  }
})
export class DatepickerDirective {
  $el: any;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.$el = $(el.nativeElement);
  }

  ngAfterViewInit() {

  }
}
