import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Employee } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements AfterViewInit {
  @ViewChild('nameField') nameField!: ElementRef;
  employeeForm: FormGroup;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngAfterViewInit() {
    this.nameField.nativeElement.focus();
  }

  restrictToNumbers(event: any): void {
    let inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    event.target.value = inputValue;
    this.employeeForm.controls['contact'].setValue(inputValue);
  }

  addEmployee() {
    if (this.employeeForm.invalid) {
      alert("Please fill all fields correctly.");
      return;
    }
    this.apiService.addEmployee(this.employeeForm.value);
    this.router.navigate(['/employee-listing']);
  }
}
