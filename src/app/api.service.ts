// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; 
import { BehaviorSubject, Observable } from 'rxjs';
export interface Employee {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';
  private getEmployee = 'assets/employee.json';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private employees: Employee[] = [];
  constructor(private http: HttpClient) {
    this.loadInitialData(); 
   }
   private loadInitialData() {
    this.http.get<Employee[]>('assets/employee.json').subscribe((data: Employee[]) => {
      this.employees = [...data]; 
      this.employeesSubject.next(this.employees); 
    });
  }
  // API 1: Get all categories
  getEmployeeDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee) {
    employee.id = this.employees.length + 1; 
    this.employees.push(employee);
    this.employeesSubject.next([...this.employees]); 
  }
  }

