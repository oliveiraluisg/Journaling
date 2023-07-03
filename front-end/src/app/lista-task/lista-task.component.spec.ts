import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTaskComponent } from './lista-task.component';

describe('ListaTaskComponent', () => {
  let component: ListaTaskComponent;
  let fixture: ComponentFixture<ListaTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
