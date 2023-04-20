import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelEventConfirmComponent } from './cancel-event-confirm.component';

describe('CancelEventConfirmComponent', () => {
  let component: CancelEventConfirmComponent;
  let fixture: ComponentFixture<CancelEventConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelEventConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelEventConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
