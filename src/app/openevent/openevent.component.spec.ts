import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeneventComponent } from './openevent.component';

describe('OpeneventComponent', () => {
  let component: OpeneventComponent;
  let fixture: ComponentFixture<OpeneventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeneventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeneventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
