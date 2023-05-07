import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyappointmentsComponent } from './emergencyappointments.component';

describe('EmergencyappointmentsComponent', () => {
  let component: EmergencyappointmentsComponent;
  let fixture: ComponentFixture<EmergencyappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyappointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
