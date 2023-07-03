import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-lista-anotacoes',
  templateUrl: './lista-anotacoes.component.html',
  styleUrls: ['./lista-anotacoes.component.css']
})
export class ListaAnotacoesComponent implements OnInit{

  showOptions = false;
  nome!: string;
  lembretes!: Lembrete[];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.recuperaLembretes();
    this.recuperaNomeUsuario();
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

  recuperaLembretes(): void{

    const idUsuario = localStorage.getItem('idUsuario')

    const url = 'http://localhost:8080/api/v1/lembrete?idUsuario=' + idUsuario;
  
    this.http.get<Lembrete[]>(url, {
      headers: {
        'Content-Type': 'application/json',
      }
      
    }).pipe(
      catchError((error) => {
        console.error('Error fetching lembretes', error);
        return throwError(error);
      })
    ).subscribe(resposta => {
      this.lembretes = resposta;
    });
  }


  deleteLembretes(lembrete: Lembrete): void{


    const url = 'http://localhost:8080/api/v1/lembrete';
  
    this.http.delete<Lembrete[]>(url, {
      headers: {
        'idLembrete' : lembrete.Id,
        'Content-Type': 'application/json',
      }
      
    }).pipe(
      catchError((error) => {
        console.error('Error fetching lembretes', error);
        return throwError(error);
      })
    ).subscribe(resposta => {
      this.lembretes = resposta;
    });
  }

}

interface Lembrete{
  Id: any;
  user: User;
  anotacao: string;
  data: Date;
  descricao: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  dataExclusao: Date;
}

interface User{
  Id: any;
  nome: string;
  login: string;
  senha: string;
}

interface UserReturnResponse{
  nome: string;
}