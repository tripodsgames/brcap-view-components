import { Component, Input } from "@angular/core";

@Component({
    selector: "cap-hint",
    templateUrl: "./cap-hint.component.html",
    styleUrls: ["./cap-hint.component.scss"]
})
export class CapHintComponent {
    @Input() texto: string
    @Input("styleClass") styleClass: string;

    exibirHint;

    toggleHint() {
        this.exibirHint = !this.exibirHint;
    }

    mouseLeaveHint() {
        this.exibirHint = false;
    }
}
