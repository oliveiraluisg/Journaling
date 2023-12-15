import { Component, ElementRef, OnInit } from '@angular/core';
import { TypingService } from 'src/service/TypingService';
import { HttpClient } from '@angular/common/http';
import { TimerService } from 'src/service/TimerService';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{

  idUsuario: string = "";
  statusSenha: string = "";
  senhaRecuperacao!: string;
  emailRecuperacao!: string;
  slideState: string = 'in';
  mostrarRecuperarSenha: boolean = false;
  statusCriarConta: string = "";
  statusLogin: string = "";
  corStatus: string = "";
  typingText = '';
  nome!: string;
  usuario!: string;
  senha!: string;
  token!: string;
  signUpButton: any;
  signInButton: any;
  container: any;

  constructor(private elementRef: ElementRef,private typingService: TypingService, private http: HttpClient, private timerService: TimerService) {
    this.typingService.typeText(
      ['Bem vindo de volta!'],
      200,
      (text) => {
        this.typingText = text;
      }
    );    
  }

  ngOnInit(): void {
    this.geraToken();

    this.timerService.getTimer().subscribe(() => {
      this.geraToken();
   });
  }
  
  exibirRecuperarSenha(mostrar: boolean = true) {
    this.mostrarRecuperarSenha = mostrar;
  }

  geraToken() {
    const tokenUser = new TokenUser();
    tokenUser.email = 'squerentino@gmail.com';

    const url = 'http://localhost:8080/api/v1/token';

     this.http.post<TokenResponse>(url, tokenUser)
      .subscribe(resposta => {
        console.log(resposta);
        this.token = resposta.tokenSeq;
        console.log(this.token)
      })
  }

  botaoCriarHabilitado: boolean = false;

  checkCamposPreenchidos() {
    if (this.nome && this.usuario && this.senha) {
      this.botaoCriarHabilitado = true;
    } else {
      this.botaoCriarHabilitado = false;
    }
  }

  enviaRequisicaoCriarConta(nome: string, login: string, senha: string){

    const url = 'http://localhost:8080/api/v1/user/create?token=' + this.token;

    const body = { nome: nome, login: login, senha: senha };

    this.http.post<UserLoginResponse>(url,body).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.statusSenha = "";
          this.statusLogin = "";
          this.statusCriarConta = 'Erro ao criar conta';
          this.corStatus = 'red';
        } else {
          this.statusSenha = "";
          this.statusLogin = "";
          this.statusCriarConta = 'Ocorreu um erro inesperado.';
          this.corStatus = 'red';
        }
        return throwError(error);
      })
    )
   .subscribe(resposta => {

    console.log(resposta)

    if(resposta.status == "CONTA_CRIADA")
    this.statusSenha = "";
    this.statusLogin = "";
    this.statusCriarConta = 'Conta criada com sucesso!';
    this.corStatus = 'green';
   })

  }
  
}

interface UserLoginResponse {
  response: string;
  status: string;
  ID: string;
}

interface TokenResponse {
  tokenSeq: string;
  tempoExipracao: string;
}

export class TokenUser {
  email!: string;
}


