import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteRoleComponent } from './edit-delete-role.component';

describe('EditDeleteRoleComponent', () => {
  let component: EditDeleteRoleComponent;
  let fixture: ComponentFixture<EditDeleteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
