import { NgModule } from '@angular/core';
import {
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
