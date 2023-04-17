import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVolunteerListComponent } from './admin-volunteer-list.component';

describe('AdminVolunteerListComponent', () => {
  let component: AdminVolunteerListComponent;
  let fixture: ComponentFixture<AdminVolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVolunteerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVolunteerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
