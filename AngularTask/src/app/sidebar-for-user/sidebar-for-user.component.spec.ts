import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarForUserComponent } from './sidebar-for-user.component';

describe('SidebarForUserComponent', () => {
  let component: SidebarForUserComponent;
  let fixture: ComponentFixture<SidebarForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
