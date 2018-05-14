import { Directive, OnInit, Renderer, ElementRef } from "@angular/core";
declare var $: any;

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
    $(document)
      .ready(function() {
        $(".datepicker").datepicker({
          format: "dd/mm/yyyy"
        });
      })
      .on("changeDate", event => {
        let inputEvent = new Event("input", { bubbles: true });
        this.renderer.invokeElementMethod(this.el.nativeElement, "dispatchEvent", [inputEvent]);
      });
  }
}
