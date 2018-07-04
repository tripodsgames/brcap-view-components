import { Directive, OnInit, Renderer, ElementRef, AfterViewInit } from "@angular/core";
import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;
import "assets/js/bootstrap-select.min.js";

@Directive({
  selector: "[selectpicker]",
  host: {
    class: "selectpicker"
  }
})
export class SelectpickerDirective implements AfterViewInit {
  $el: any;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.$el = $(el.nativeElement);
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      this.$el.selectpicker();
      $(".bootstrap-select")
        .find(".dropdown-menu")
        .removeClass("open");
      $(".bootstrap-select").click(function() {
        $(this)
          .find(".dropdown-menu")
          .toggleClass("open");
        $(this)
          .find(".brcap-ico")
          .toggleClass("expandir");
        $(this)
          .find(".brcap-ico")
          .toggleClass("anterior");
      });
    });
  }
}
