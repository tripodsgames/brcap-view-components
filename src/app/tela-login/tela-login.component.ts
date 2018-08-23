import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  @Input() projeto: String;
  @Input() logo: String;

  urlCadastro: String;

  // emailValidationClass: String;

  constructor() {
    //TODO pegar isso a partir do env
    this.urlCadastro = 'http://darwin-dev.brasilcap.com.br/#/cadastro';
  }

  ngOnInit() {
  }

}
