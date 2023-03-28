import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageVolunteerComponent } from './admin-manage-volunteer.component';

describe('AdminManageVolunteerComponent', () => {
  let component: AdminManageVolunteerComponent;
  let fixture: ComponentFixture<AdminManageVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
