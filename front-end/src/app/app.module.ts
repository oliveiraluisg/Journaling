import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TimerService } from 'src/service/TimerService';
import { FormsModule } from '@angular/forms';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnotacoesComponent } from './anotacoes/anotacoes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { ListaAnotacoesComponent } from './lista-anotacoes/lista-anotacoes.component';
import { ListaTaskComponent } from './lista-task/lista-task.component';
import { ListaProjetoComponent } from './lista-projeto/lista-projeto.component';
import { ProjetoComponent } from './projeto/projeto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EsqueceuSenhaComponent,
    AnotacoesComponent,
    CalendarComponent,
    TaskComponent,
    ListaAnotacoesComponent,
    ListaTaskComponent,
    ListaProjetoComponent,
    ProjetoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})

export class AppModule {

 }
