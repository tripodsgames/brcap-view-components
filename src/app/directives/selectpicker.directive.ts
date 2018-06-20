import { Directive, OnInit, Renderer, ElementRef } from "@angular/core";
declare var $: any;

@Directive({
  selector: "[selectpicker]",
  host: {
    "data-provide": "selectpicker",
    class: "selectpicker"
  }
})
export class SelectpickerDirective {
  $el: any;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.$el = $(el.nativeElement);
  }

  ngAfterViewInit() {
    $(document).ready(function() {
        $('.selectpicker').selectpicker();
    });
  }
}
