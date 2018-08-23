import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';

import { LeaveConfirmDialogComponent } from './leave-confirm-dialog.component';

describe('LeaveConfirmDialogComponent', () => {
  let component: LeaveConfirmDialogComponent;
  let fixture: ComponentFixture<LeaveConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [LeaveConfirmDialogComponent],
      providers: [MatDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
