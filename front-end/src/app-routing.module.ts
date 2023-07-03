import { TaskComponent } from './app/task/task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriaUsuarioComponent } from './app/cria-usuario/cria-usuario.component';
import { EsqueceuSenhaComponent } from './app/esqueceu-senha/esqueceu-senha.component';
import { LoginComponent } from './app/login/login.component';
import { AnotacoesComponent } from './app/anotacoes/anotacoes.component';
import { CalendarComponent } from './app/calendar/calendar.component';
import { ProjetoComponent } from './app/projeto/projeto.component';
import { ListaProjetoComponent } from './app/lista-projeto/lista-projeto.component';
import { ListaAnotacoesComponent } from './app/lista-anotacoes/lista-anotacoes.component';
import { ListaTaskComponent } from './app/lista-task/lista-task.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'anotacoes', component: AnotacoesComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'task', component: TaskComponent},
  { path: 'projeto', component: ProjetoComponent},
  { path: 'lista-projeto', component: ListaProjetoComponent},
  { path: 'lista-anotacoes', component: ListaAnotacoesComponent},
  { path: 'lista-task', component: ListaTaskComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
