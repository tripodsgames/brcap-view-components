import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  @Input() sistema: String;
  @Input() logo: String;
  @Input() linkCadastro: String;
  @Input() urlEnv: String;
  @Input() urlCadastro: String;
  @Input() urlRedirect: String;

  // emailValidationClass: String;

  constructor() {
  }

  ngOnInit() {
  }

}
