import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  showOptions = false;
  nome!: string;
  date = new Date();
  daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  calendar: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.recuperaNomeUsuario();
    this.generateCalendar();
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

  recuperaDataAtual(): string {
    var dia = new Date().getDate();
    var mes = "";

    if(new Date().getMonth().toString() === '0'){
      mes = "Janeiro"
    }else if(new Date().getMonth().toString() === '1'){
      mes = "Fevereiro"
    }else if(new Date().getMonth().toString() === '2'){
      mes = "Março"
    }else if(new Date().getMonth().toString() === '3'){
      mes = "Abril"
    }else if(new Date().getMonth().toString() === '4'){
      mes = "Maio"
    }else if(new Date().getMonth().toString() === '5'){
      mes = "Junho"
    }else if(new Date().getMonth().toString() === '6'){
      mes = "Julho"
    }else if(new Date().getMonth().toString() === '7'){
      mes = "Agosto"
    }else if(new Date().getMonth().toString() === '8'){
      mes = "Setembro"
    }else if(new Date().getMonth().toString() === '9'){
      mes = "Outubro"
    }else if(new Date().getMonth().toString() === '10'){
      mes = "Novembro"
    }else if(new Date().getMonth().toString() === '11'){
      mes = "Dezembro"
    }else{
      mes = "Erro ao recuperar mês"
    }

    return dia.toString() + " de" + " " + mes.toString() + " " + "de" + " 2023";
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

  generateCalendar() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = firstDay.getDate();
    const endDate = lastDay.getDate();

    const startDayOfWeek = firstDay.getDay();

    this.calendar = [];
    
    for (let i = 0; i < startDayOfWeek; i++) {
      this.calendar.push({
        date: null,
        dayOfWeek: null,
        dayOfMonth: null,
        today: false,
        weekend: false
      });
    }
    
    for (let i = 1; i <= endDate; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      const dayOfMonth = date.getDate();
    
      this.calendar.push({
        date: date,
        dayOfWeek: this.daysOfWeek[dayOfWeek],
        dayOfMonth: dayOfMonth,
        today: this.isToday(date),
        weekend: (dayOfWeek === 0 || dayOfWeek === 6)
      });
    }
  }

  previousMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    this.calendar = [];
    this.generateCalendar();
  }

  nextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
    this.calendar = [];
    this.generateCalendar();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
  }
}

interface UserReturnResponse{
  nome: string;
}