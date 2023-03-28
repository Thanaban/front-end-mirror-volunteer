import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageEventComponent } from './admin-manage-event.component';

describe('AdminManageEventComponent', () => {
  let component: AdminManageEventComponent;
  let fixture: ComponentFixture<AdminManageEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
