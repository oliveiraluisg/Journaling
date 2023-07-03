import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnotacoesComponent } from './lista-anotacoes.component';

describe('ListaAnotacoesComponent', () => {
  let component: ListaAnotacoesComponent;
  let fixture: ComponentFixture<ListaAnotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnotacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAnotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
