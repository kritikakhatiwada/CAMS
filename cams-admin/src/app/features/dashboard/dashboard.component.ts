import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard-service.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any[] = [];

  // Chart configuration
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataset[] = [
    { data: [], label: 'Total Courses' },
    { data: [], label: 'Total Applications' },
    { data: [], label: 'Approved Applications' },
    { data: [], label: 'Total Reviews' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments() {
    this.dashboardService.fetchDashboardDetail().subscribe(
      (response: any) => {
        this.data = response.data;
        this.updateChartData();
        console.log('Dashboard:', this.data);
      },
      error => {
        console.error('Error fetching payments:', error);
      }
    );
  }

  private updateChartData() {
    // Update labels (college names)
    this.barChartLabels = this.data.map(item => item.collegeName);

    // Update datasets
    this.barChartData = [
      { 
        data: this.data.map(item => item.totalCourses),
        label: 'Total Courses',
        backgroundColor: '#8884d8'
      },
      { 
        data: this.data.map(item => item.totalApplications),
        label: 'Total Applications',
        backgroundColor: '#82ca9d'
      },
      { 
        data: this.data.map(item => item.approvedApplications),
        label: 'Approved Applications',
        backgroundColor: '#ffc658'
      },
      { 
        data: this.data.map(item => item.totalReviews),
        label: 'Total Reviews',
        backgroundColor: '#ff7300'
      }
    ];
  }
}