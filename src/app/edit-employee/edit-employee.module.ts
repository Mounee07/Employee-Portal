import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'view-profile', component: ViewProfileComponent }
];

@NgModule({
  declarations: [ViewProfileComponent,EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Lazy loading setup
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,FormsModule,
    ReactiveFormsModule
  ]
})
export class EditEmployeeModule { }
