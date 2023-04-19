import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditVolunteerListComponent } from './confirm-edit-volunteer-list.component';

describe('ConfirmEditVolunteerListComponent', () => {
  let component: ConfirmEditVolunteerListComponent;
  let fixture: ComponentFixture<ConfirmEditVolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEditVolunteerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEditVolunteerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
