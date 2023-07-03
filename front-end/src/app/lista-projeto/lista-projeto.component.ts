import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-lista-projeto',
  templateUrl: './lista-projeto.component.html',
  styleUrls: ['./lista-projeto.component.css']
})
export class ListaProjetoComponent {

  projetos!: Projeto[];
  showOptions = false;
  nome!: string;

    ngOnInit() {
      this.recuperaProjetos()
      this.recuperaNomeUsuario();
    }


    constructor(private http: HttpClient) { }

    toggleDropdown(): void {
      const dropdownContent = document.getElementById('dropdown-content');
      if (dropdownContent) {
        dropdownContent.classList.toggle('show');
      }
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

    recuperaProjetos() {

      const idUsuario = localStorage.getItem('idUsuario')
  
      const url = `http://localhost:8080/api/v1/projeto?idUsuario=${idUsuario}`;
    
      this.http.get<Projeto[]>(url, {
        headers: {
          'Content-Type': 'application/json',
        }
        
      }).pipe(
        catchError((error) => {
          console.error('Error fetching lembretes', error);
          return throwError(error);
        })
      ).subscribe(resposta => {
        this.projetos = resposta;
      });
    }
  
  }

  interface Tarefa {
  }
  
  interface Projeto {
    id: number;
    titulo: string;
    dataInicio: Date;
    dataTermino: Date;
    descricao: string;
    tarefas: Tarefa[];
    dataCriacao: Date;
    dataAlteracao: Date;
    dataExclusao: Date;
  }
  

interface UserReturnResponse{
  nome: string;
}
