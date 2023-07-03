import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaUsuarioComponent } from './cria-usuario.component';

describe('CriaUsuarioComponent', () => {
  let component: CriaUsuarioComponent;
  let fixture: ComponentFixture<CriaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
