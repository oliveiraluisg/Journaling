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
  selector: 'app-test',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('400ms ease-in-out')
      ]),
      transition(':leave', [
        animate('400ms ease-in-out', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit{

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
      ['Aonde você quiser.', 'A qualquer hora.', 'De graça.'],
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


  enviaRequisicaoLogin(login : string, senha: string){

    const url = 'http://localhost:8080/api/v1/user/validation?token=' + this.token;

    const body = { login: login, senha: senha };

    this.http.post<UserLoginResponse>(url,body).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.statusCriarConta = "";
          this.statusSenha = "";
          this.statusLogin = 'Credenciais inválidas';
          this.corStatus = 'red';
        } else {
          this.statusCriarConta = "";
          this.statusSenha = "";
          this.statusLogin = 'Ocorreu um erro inesperado.';
          this.corStatus = 'red';
        }
        return throwError(error);
      })
    )
   .subscribe(resposta => {

    console.log(resposta)
    
    if (resposta.status == "SUCESSO_LOGIN") {
      this.statusCriarConta = "";
      this.statusSenha = "";
      this.statusLogin = "Login bem-sucedido!";
      this.corStatus = "green";
      localStorage.setItem('idUsuario', JSON.stringify(resposta.ID))
      this.idUsuario = JSON.stringify(resposta.ID)
      window.location.href = '/calendar';
    }

  });

  }

  enviaRequisicaoRecuperarSenha(email: string, senha: string){

    const url = 'http://localhost:8080/api/v1/user/password?token=' + this.token;

    const body = { login: email, senha: senha };

    this.http.post<UserLoginResponse>(url,body).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.statusCriarConta = "";
          this.statusLogin = "";
          this.statusSenha = 'Erro ao recuperar senha';
          this.corStatus = 'red';
        } else {
          this.statusCriarConta = "";
          this.statusLogin = "";
          this.statusSenha = 'Ocorreu um erro inesperado.';
          this.corStatus = 'red';
        }
        return throwError(error);
      })
    )
   .subscribe(resposta => {

    console.log(resposta)

    if(resposta.status != "USUARIO_INEXISTENTE")
    this.statusCriarConta = "";
    this.statusLogin = "";
    this.statusSenha = 'Senha atualizada com sucesso!';
    this.corStatus = 'green';
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
