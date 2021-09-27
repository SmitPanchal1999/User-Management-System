import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameInitialComponent } from './name-initial.component';

describe('NameInitialComponent', () => {
  let component: NameInitialComponent;
  let fixture: ComponentFixture<NameInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameInitialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
