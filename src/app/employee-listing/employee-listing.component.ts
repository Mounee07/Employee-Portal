import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService, Employee } from '../api.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'contact', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEmployeeData();
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter) ||
        data.address.toLowerCase().includes(filter) ||
        data.contact.toLowerCase().includes(filter)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadEmployeeData() {
    this.apiService.getEmployees().subscribe((data: Employee[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteEmployee(id: number) {
    this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== id);
    this.dataSource._updateChangeSubscription();
  }
}
