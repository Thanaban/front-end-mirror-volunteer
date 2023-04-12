import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistSnackBarComponent } from './blacklist-snack-bar.component';

describe('BlacklistSnackBarComponent', () => {
  let component: BlacklistSnackBarComponent;
  let fixture: ComponentFixture<BlacklistSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlacklistSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlacklistSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
