import { Component, Input, OnInit, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
declare var $: any;

@Component({
  selector: "cap-inputText",
  host: {
    class: "cap-inputText"
  },
  templateUrl: "./cap-inputText.component.html",
  styleUrls: ["./cap-inputText.component.css"]
})
export class CapInputTextComponent implements AfterViewInit {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("mask") mask: string;
  @Input("styleClass") styleClass: string;
  @Input("maxlength") maxlength: string;

  @ViewChild("input") input;

  private $el: any;

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  public ngAfterViewInit() {
    if (this.mask) {
      $(this.input.nativeElement).mask(this.mask);
    }
  }
}
