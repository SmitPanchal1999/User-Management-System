import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternDataEditFormComponent } from './pattern-data-edit-form.component';

describe('PatternDataEditFormComponent', () => {
  let component: PatternDataEditFormComponent;
  let fixture: ComponentFixture<PatternDataEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternDataEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDataEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
