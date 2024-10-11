import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInterimComponent } from './gestion-interim.component';

describe('GestionInterimComponent', () => {
  let component: GestionInterimComponent;
  let fixture: ComponentFixture<GestionInterimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionInterimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
