import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimerService } from 'src/service/TimerService';
import { ProjetoComponent } from '../projeto/projeto.component';
// import { dA } from '@fullcalendar/core/internal-common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  private baseUrl = 'http://localhost:8080/api/v1/tarefa';
  private baseUrlProjeto = "http://localhost:8080/api/v1/projeto"
  token: string = "";
  titulo: string = "";
  data: Date | undefined;
  descAnnotation: string | undefined;
  statusTarefa!: string;
  taskCompleted = false;
  projetoSelecionado!: number;
  projetosDisponiveis!: Projeto[];
  showOptions = false;
  nome!: string;
  public showMenu = false;

  public toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  constructor(private http: HttpClient, private timerService: TimerService) { }

  salvarTask(): void {
    console.log(this.titulo,this.data,this.descAnnotation, this.projetoSelecionado)
    const headers = new HttpHeaders().set('token', this.token);

    const Tarefa = {
      idUsuario: localStorage.getItem("idUsuario"),
      idProjeto: this.projetoSelecionado,
      titulo: this.titulo,
      data: this.data,
      descricao: this.descAnnotation,
      status: this.statusTarefa,
    };

    this.http.post(this.baseUrl, Tarefa, { headers }).subscribe(
      response => {
        console.log('Tarefa salva com sucesso!');
        location.reload();
      },
      error => {
        console.log('Erro ao salvar tarefa:', error);
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

  descartarTask(): void{
    location.reload();
  }

  updateProjetoSelecionado(event: Event) {
    this.projetoSelecionado = parseInt((<HTMLSelectElement>event.target).value, 10);
  }
  

  abrirTask(): void {

  }

  fecharTask(): void {
    // Lógica para fechar a tarefa
  }

  ngOnInit() {
    this.buscaProjetos();
    this.recuperaNomeUsuario();
  }

  buscaProjetos() {
    
    const url = this.baseUrlProjeto + '?idUsuario=' + localStorage.getItem('idUsuario')

    this.http.get<Projeto[]>(url).subscribe(
      data => {
        console.log(data)
        this.projetosDisponiveis = data;
      },
      error => {
        console.log('Erro ao buscar projetos', error);
      }
    )
  }


  //ngOnInit() {
  //  this.recuperaNomeUsuario();
  //}

 

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

interface Tarefa {
}

interface Projeto {
  id: number;
  titulo: string;
  dataInicio: Date;
  dataTermino: Date;
  tarefas: Tarefa[];
  dataCriacao: Date;
  dataAlteracao: Date;
  dataExclusao: Date;
}
interface UserReturnResponse{
  nome: string;
}
