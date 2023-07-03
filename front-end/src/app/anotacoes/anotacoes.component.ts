// import { Component, OnInit } from '@angular/core';
// import { AnotacoesComponent } from '/anotacoes.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimerService } from 'src/service/TimerService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.component.html',
  styleUrls: ['./anotacoes.component.css']
})
export class AnotacoesComponent {
  private baseUrl = 'http://localhost:8080/api/v1/lembrete';

  titulo!: string;
  data: Date | undefined;
  descAnnotation!: string;
  token: string = "";
  nome!: string;
  showOptions = false;


  @ViewChild('annotationsForm', { static: true }) annotationsForm!: ElementRef;

  constructor(private http: HttpClient, private timerService: TimerService) { }

  ngOnInit(): void {
    this.geraToken();

    this.timerService.getTimer().subscribe(() => {
      this.geraToken();
   });

    this.recuperaNomeUsuario();
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

  

  closeAnnotation() : void{
    location.reload();
  }

  salvarAnotacao() {
    console.log(this.titulo, this.descAnnotation);
    const headers = new HttpHeaders().set('token', this.token);
  
    const LembreteRequest = {
      user: null,
      idUsuario: localStorage.getItem('idUsuario'),
      anotacao: this.titulo,
      descricao: this.descAnnotation,
      data: this.data,
      dataCriacao: null,
      dataAlteracao: null,
      dataExclusao: null
    };
  
    this.http.post(this.baseUrl, LembreteRequest, { headers }).subscribe(
      response => {
        console.log('Anotação salva com sucesso!');
        location.reload();
      },
      error => {
        console.log('Erro ao salvar anotação:', error);
      }
    );
  }

  toggleDropdown(): void {
    const dropdownContent = document.getElementById('dropdown-content');
    if (dropdownContent) {
      dropdownContent.classList.toggle('show');
    }
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  fecharAnotacao(): void {

  }

  recuperaNomeUsuario(): void {
    const idUsuario = localStorage.getItem('idUsuario');
    const url = `http://localhost:8080/api/v1/user?idUsuario=${idUsuario}`;

    this.http.get<UserReturnResponse>(url).subscribe(
      (response) => {
        console.log(response);
        this.nome = response.nome
      },
      (error) => {
        console.log('Erro ao recuperar o nome do usuário:', error);
      }
    );
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

interface UserReturnResponse{
  nome: string;
}