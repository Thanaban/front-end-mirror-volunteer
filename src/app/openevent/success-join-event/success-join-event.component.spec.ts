import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessJoinEventComponent } from './success-join-event.component';

describe('SuccessJoinEventComponent', () => {
  let component: SuccessJoinEventComponent;
  let fixture: ComponentFixture<SuccessJoinEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessJoinEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessJoinEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
