import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimCheckComponent } from './interim-check.component';

describe('InterimCheckComponent', () => {
  let component: InterimCheckComponent;
  let fixture: ComponentFixture<InterimCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterimCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterimCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
