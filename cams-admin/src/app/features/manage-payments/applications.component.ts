import { Component, OnInit } from '@angular/core'; 
import { ManagePaymentsService } from './manage-service.service';
import { CollegeDetailsService } from '../college-details/college-details.service';

@Component({
  selector: 'app-manage-payments', 
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ManagePaymentsComponent implements OnInit {
  payments: any[] = [];

  constructor(private paymentService: ManagePaymentsService, private collegeService: CollegeDetailsService) {}

  ngOnInit() {
    this.fetchPayments();
  }

  fetchPayments() {
    this.paymentService.fetchPaymentsDetails().subscribe(
      (response: any) => {
        if (response.success) {
          this.payments = response.data;
          console.log('Payments:', this.payments); 
  
          // Iterate through payments and fetch username for each user
          
          this.payments.forEach(payment => {
            this.paymentService.getUserById(payment.user_id).subscribe(
              (user: any) => {
                console.log('User:', user);
                
                payment.userName = user.user.firstName+ " " + user.user.lastName;  // Add username to each payment object
              },
              error => {
                console.error('Error fetching user by ID:', error);
              }
            );
          });
        }
      },
      error => {
        console.error('Error fetching payments:', error);
      }
    );
  }
  
  formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  // fetchRelatedData(application: any) {
  //   // Fetch course name
  //   this.collegeService.getCourseById(application.course_id).subscribe(
  //     (course: any) => {
  //       application.courseName = course.data.name;
  //     },
  //     error => {
  //       console.error('Error fetching course:', error);
  //     }
  //   );

  //   // Fetch college name
  //   this.collegeService.getCollegeById(application.college_id).subscribe(
  //     (college: any) => {
  //       console.log("college", college);
  //       application.collegeName = college.college.name;
  //       application.collegeId = college.college.id;
  //     },
  //     error => {
  //       console.error('Error fetching college:', error);
  //     }
  //   );

  //   // Fetch student name
  //   this.collegeService.getUserById(application.student_id).subscribe(
  //     (user: any) => {
  //       application.studentName = user.user.email;
  //     },
  //     error => {
  //       console.error('Error fetching student:', error);
  //     }
  //   );
  // }
}