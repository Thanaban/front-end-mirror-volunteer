import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageVolunteerListComponent } from './admin-manage-volunteer-list.component';

describe('AdminManageVolunteerListComponent', () => {
  let component: AdminManageVolunteerListComponent;
  let fixture: ComponentFixture<AdminManageVolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageVolunteerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageVolunteerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
