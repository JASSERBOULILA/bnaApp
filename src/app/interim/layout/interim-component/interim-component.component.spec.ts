import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimComponentComponent } from './interim-component.component';

describe('InterimComponentComponent', () => {
  let component: InterimComponentComponent;
  let fixture: ComponentFixture<InterimComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterimComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterimComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
