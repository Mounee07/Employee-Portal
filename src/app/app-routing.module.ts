import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on app load
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee-listing', component: EmployeeListingComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
