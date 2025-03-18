import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service'; // ✅ Import AuthService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Employee {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  employeeForm: FormGroup;
  employee!: Employee; // Store logged-in employee details

  constructor(
    private apiService: ApiService,
    private authService: AuthService, // ✅ Inject AuthService
    private router: Router,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngOnInit() {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails() {
    const loggedInEmployeeId = this.authService.getUserId(); // Get logged-in user ID
  
    if (loggedInEmployeeId !== null) {
      this.apiService.getEmployeeById(loggedInEmployeeId).subscribe(
        (employee) => {
          if (employee) {
            this.employee = employee;
            this.employeeForm.patchValue(this.employee); // Populate form fields
            this.employeeForm.disable(); // ✅ Disable the form fields
          } else {
            console.error('Employee not found!');
          }
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    } else {
      console.error('No logged-in user found!');
    }
  }
  
}
