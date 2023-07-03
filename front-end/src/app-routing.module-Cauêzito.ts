import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriaUsuarioComponent } from './app/cria-usuario/cria-usuario.component';
import { EsqueceuSenhaComponent } from './app/esqueceu-senha/esqueceu-senha.component';
import { LoginComponent } from './app/login/login.component';
import { AnotacoesComponent } from './app/anotacoes/anotacoes.component';
import { ListaProjetoComponent } from './app/lista-projeto/lista-projeto.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'esqueceuSenha', component: EsqueceuSenhaComponent },
  { path: 'anotacoes', component: AnotacoesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
