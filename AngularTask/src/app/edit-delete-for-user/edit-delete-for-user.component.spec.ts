import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteForUserComponent } from './edit-delete-for-user.component';

describe('EditDeleteForUserComponent', () => {
  let component: EditDeleteForUserComponent;
  let fixture: ComponentFixture<EditDeleteForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
