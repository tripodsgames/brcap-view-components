import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "cap-hint",
    templateUrl: "./cap-hint.component.html",
    styleUrls: ["../../assets/css/cap-hint.component.min.css"]
})
export class CapHintComponent implements OnInit {
    @Input() texto: string
    @Input("styleClass") styleClass: string;

    exibirHint;

    constructor() { }

    ngOnInit() { }

    toggleHint() {
        this.exibirHint = !this.exibirHint;
    }

    mouseLeaveHint() {
        this.exibirHint = false;
    }
}
