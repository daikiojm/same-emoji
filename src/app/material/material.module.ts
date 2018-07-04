import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
})
export class MaterialModule {}
