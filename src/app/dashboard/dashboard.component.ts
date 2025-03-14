import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Employee {
  id: number;
  name: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource = new MatTableDataSource<Employee>(); 
  totalEmployees = 0;
  filterValue = ''; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees() {
    this.apiService.getEmployeeDetails().subscribe((response: any) => {
      if (Array.isArray(response)) {
        this.dataSource.data = response; // Assign full dataset
        this.totalEmployees = response.length;
      } else {
        console.error('Invalid response structure:', response);
      }
    }, (error) => {
      console.error('Error fetching employee data:', error);
    });
  }

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }
}
