import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle, ApexTooltip } from 'ng-apexcharts';

export interface ReportData {
  vesselOffice: string;
  reportType: string;
  referenceNo: string;
  action: string;
  actionDescription: string;
  raisedOn: string;
  raisedBy: string;
  dueDate: string;
  vesselRespon: string;
}
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
  dataLabels: false;
  tooltip: ApexTooltip;
};
const ELEMENT_DATA: ReportData[] = [
  {vesselOffice: 'Alpha', reportType: 'Near Miss', referenceNo: 'AMR/NMIS/2023/016', action: 'Preventive Action', actionDescription: 'A Near Miss...', raisedOn: '06-Jun-2023', raisedBy: 'MariAppsAdmin', dueDate: '04-Sep-2023', vesselRespon: 'Captain'},
  // Add more data based on the image example
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['select', 'vesselOffice', 'reportType', 'referenceNo', 'action', 'actionDescription', 'raisedOn', 'raisedBy', 'dueDate', 'vesselRespon'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selectedRows: any[] = []; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public pieChartOptions: any;
  public chartOptions: Partial<ChartOptions> | any;
  constructor(){
    this.pieChartOptions = {
      series: [120, 37, 52, 14],
      chart: {
        type: 'donut',
        height: 200, // Reduced height for a smaller chart
      },
      labels: ['Open', 'Overdue', 'Closed', 'Cancelled'],
      colors: ['#FFA726', '#FF5722', '#66BB6A', '#42A5F5'], // Customize chart colors
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 250  // Adjust the chart width for smaller screens
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      title: {
        text: '', // No title if you want it clean
      },
      dataLabels: {
        enabled: false  // Disable data labels to avoid clutter
      },
      tooltip: {
        custom: ({ series, seriesIndex, w }: { series: number[], seriesIndex: number, w: any }) => {
          let label = w.config.labels[seriesIndex];
          let value = series[seriesIndex];
          let vessel = '';
          if (label === 'open') {
            vessel = '120'; 
          } else if (label === 'overdue') {
            vessel = '37';
          } else if (label === 'closed') {
            vessel = '52';
          } else {
            vessel = '14';          }

          return `<div style="background: #333; padding: 10px; border-radius: 8px; color: #fff; text-align: left;">
                    <strong>${label}</strong>
                    <br> Vessels: ${vessel}
                  </div>`;
        }
      }
    };
    
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getActionColor(action: string): string {
    switch(action) {
      case 'Preventive Action': return 'action-preventive';
      case 'Corrective Action': return 'action-corrective';
      case 'SBM Action': return 'action-sbm';
      default: return '';
    }
  }
  selectRow(row: any) {
    const index = this.selectedRows.indexOf(row);
    if (index === -1) {
      this.selectedRows.push(row); // Add to selected
    } else {
      this.selectedRows.splice(index, 1); // Remove from selected
    }
  }

  // Function to check if a row is selected
  isSelected(row: any) {
    return this.selectedRows.includes(row);
  }

  // Function to select or deselect all rows
  selectAll(checked: boolean) {
    if (checked) {
      this.selectedRows = [...this.dataSource.data]; // Select all
    } else {
      this.selectedRows = []; // Deselect all
    }
  }

  // Example filter function (modify as needed)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectedAction: string = 'followup';
  dateOptions: string[] = ['Select', 'Today', 'This Week', 'This Month'];
  reportTypes: string[] = ['Near Miss', 'Safety Meeting', 'Inspection/Audit'];
  actions: string[] = ['Corrective Action', 'Preventive Action', 'SBM Action'];
}
