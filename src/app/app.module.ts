import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module'; // Import SharedModule
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Required if using input fields
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgApexchartsModule } from "ng-apexcharts";
import { HttpClientModule } from '@angular/common/http';

// Define the routes
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee-listing', component: EmployeeListingComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Default route to login
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeListingComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // Add RouterModule here
    SharedModule,  // Import SharedModule here
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    NgApexchartsModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonToggleModule, 
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
