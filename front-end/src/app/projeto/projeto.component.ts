import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent {

  dataTerminoProjeto!: string;
  dataInicioProjeto!:string;
  nomeProjeto!:string;
  descricaoProjeto!:string;
  baseUrlProjeto = "http://localhost:8080/api/v1/projeto"
  showOptions = false;
  nome!: string;
  public showMenu = false;

  public toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  closeProjeto() : void{
    location.reload();
  }
  
  ngOnInit() {
    this.recuperaNomeUsuario();
  }

  logout() {

    localStorage.removeItem('idUsuario'); 
  
    window.location.href = '/'; 
  } 

  criaProjeto(){

    const url = this.baseUrlProjeto + '?idUsuario=' + localStorage.getItem('idUsuario')

    const Projeto = {
      titulo: this.nomeProjeto,
      idUsuario: localStorage.getItem('idUsuario'),
      dataInicio: this.dataInicioProjeto,
      dataTermino: this.dataTerminoProjeto,
      descricao: this.descricaoProjeto
    }

    this.http.post(url, Projeto).subscribe(
      response => {
        console.log('Projeto salvo com sucesso!');
        location.reload();
      },
      error => {
        console.log('Erro ao salvar projeto:', error);
      }
    );

  }

  constructor(private http: HttpClient) { }

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
}

interface UserReturnResponse{
  nome: string;
}

