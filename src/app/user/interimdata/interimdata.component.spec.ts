import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimdataComponent } from './interimdata.component';

describe('InterimdataComponent', () => {
  let component: InterimdataComponent;
  let fixture: ComponentFixture<InterimdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterimdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterimdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
