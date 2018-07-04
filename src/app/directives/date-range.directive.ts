import { Directive, Input, ElementRef, Renderer } from "@angular/core";
import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;
import "assets/js/bootstrap-datepicker.js";
@Directive({
  selector: "[dateRange]",
  host: {
    class: "input-daterange",
    "data-date-format": "dd/mm/yyyy"
  }
})
export class DateRangeDirective {
  $el: any;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.$el = $(el.nativeElement);
  }

  ngAfterViewInit() {
    $(document)
      .ready(function() {
        this.$el.datepicker();
      })
      .on("changeDate", event => {
        let inputEvent = new Event("input", { bubbles: true });
        this.renderer.invokeElementMethod(this.el.nativeElement, "dispatchEvent", [inputEvent]);
      });
  }
}
