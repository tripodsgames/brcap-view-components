import { Component, Input, OnInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'cap-inputText',
  host: {
    "class": "cap-inputText",
  },
  templateUrl: './cap-inputText.component.html',
  styleUrls: ['./cap-inputText.component.css']
})
export class CapInputTextComponent implements OnInit {


  @Input("id") id: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("mask") mask: string;
  @Input("styleClass") styleClass: string;

  private $el: any;

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }


  public ngOnInit() {
    if (this.mask) {
     // this.$el.mask(this.mask);
    }
  }
}
