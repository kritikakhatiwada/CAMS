import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { StudentDetailService } from '../student-detail.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  studentData: any = null; // Holds student details with education
  userId: any = null; // Holds the current user's ID

  constructor(
    private authService: AuthService,
    private studentService: StudentDetailService,
    private router: Router
  ) {
    this.initialize();
  }

  // Initialize the process of fetching data
  initialize() {
    this.fetchUserId()
      .then((id) => this.fetchStudentData(id))
      .catch((error) => console.error('Error in initialization:', error));
  }

  // Fetch the user ID
  fetchUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().subscribe(
        (res: any) => {
          this.userId = res.user.id;
          console.log('User ID fetched:', this.userId);
          resolve(this.userId);
        },
        (error) => {
          console.error('Error fetching user ID:', error);
          reject(error);
        }
      );
    });
  }

  // Fetch student details with education using the user ID
  fetchStudentData(userId: any) {
    this.studentService.getStudentDetailWithEducations().subscribe(
      (res: any) => {
        if (res.student === null) {
          Swal.fire({
            icon: "warning",
            title: "Please fill the data",
           
            confirmButtonText: "Proceed",
            
          }).then((result: any) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(["/details/add"]);
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        }
        this.studentData = res.student;
        console.log('Student Data:', this.studentData);

      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  onUpdate(id: any) {
    this.router.navigate(['/details/add']);
  }
}
