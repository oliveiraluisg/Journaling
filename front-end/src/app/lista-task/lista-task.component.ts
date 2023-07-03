import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-lista-task',
  templateUrl: './lista-task.component.html',
  styleUrls: ['./lista-task.component.css']
})
export class ListaTaskComponent implements OnInit{

  showOptions = false;
  nome!: string;
  tarefas!: Tarefa[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.recuperaTarefas();
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

  recuperaTarefas(){

    const idUsuario = localStorage.getItem('idUsuario')

    const url = `http://localhost:8080/api/v1/tarefa?idUsuario=${idUsuario}`;
  
    this.http.get<Tarefa[]>(url, {
      headers: {
        'Content-Type': 'application/json',
      }
      
    }).pipe(
      catchError((error) => {
        console.error('Error fetching tarefas', error);
        return throwError(error);
      })
    ).subscribe(resposta => {
      this.tarefas = resposta;
    });
  }

}

interface Projeto{

}

interface Tarefa {
  id: number;
  idUsuario: number;
  projeto: Projeto;
  idProjeto: number;
  titulo: string;
  descricao: string;
  data: Date;
  status: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  dataExclusao: Date;
}

interface UserReturnResponse{
  nome: string;
}
