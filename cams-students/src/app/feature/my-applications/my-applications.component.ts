import { Component } from '@angular/core';
import { MyApplicationsService } from './my-applications.service';
import { CollegesService } from '../colleges/colleges.service';
import { Router } from '@angular/router';
import { CollegeDetailService } from '../college-detail/college-detail.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent {

  applications: any[] = [];

  constructor(private applicationService: MyApplicationsService, private collegeService: CollegesService, private router: Router, private collegeDetailService: CollegeDetailService) { }

  ngOnInit() {
    this.fetchAllApplications();
  }

  fetchAllApplications() {
    this.applicationService.getApplications().subscribe((response: any) => {
      console.log(response); // college_id : 2, student_id:5, courses_id:8
      this.applications = response.data;

      // Fetch names for related data
      this.applications.forEach(application => {
        this.fetchRelatedData(application);
      });
    });
  }

  fetchRelatedData(application: any) {
    // Fetch course name
    this.collegeService.getCourseById(application.course_id).subscribe((course: any) => {
      application.courseName = course.data.name; 
    });

    // Fetch college name
    this.collegeService.getCollegeById(application.college_id).subscribe((college: any) => {
      console.log("college", college);
      
      application.collegeName = college.college.name;
      application.collegeId = college.college.id;
    });

    // Fetch student name
    this.collegeService.getUserById(application.student_id).subscribe((user: any) => {
      application.studentName = user.user.email; 
    });
  }

  getTimeAgo(date: string | Date): string {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }

  navigateToCollegeDetail(collegeId: number) {
    this.router.navigate([`/college/${collegeId}`]);
  }

  initRes: any;

  payNow(applicationId: number, event: Event) {
    event.stopPropagation(); // Prevents row click from triggering navigation
    console.log("Initiating payment for application ID:", applicationId);
  
    this.collegeDetailService.initPayment(applicationId).subscribe(
      (res: any) => {
        console.log('Payment response:', res);
        if (res.success) {
          window.location.href = res.data.payment_url; // Redirect to payment
        } else {
          alert('Payment initialization failed.');
        }
      },
      (error) => {
        console.error('Error processing payment:', error);
        alert('Payment error. Please try again.');
      }
    );
  }
  
}
