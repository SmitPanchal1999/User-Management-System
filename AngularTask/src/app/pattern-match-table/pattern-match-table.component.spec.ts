import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternMatchTableComponent } from './pattern-match-table.component';

describe('PatternMatchTableComponent', () => {
  let component: PatternMatchTableComponent;
  let fixture: ComponentFixture<PatternMatchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternMatchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternMatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
