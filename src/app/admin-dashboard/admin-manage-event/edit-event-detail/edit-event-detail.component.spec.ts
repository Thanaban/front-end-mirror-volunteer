import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventDetailComponent } from './edit-event-detail.component';

describe('EditEventDetailComponent', () => {
  let component: EditEventDetailComponent;
  let fixture: ComponentFixture<EditEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
