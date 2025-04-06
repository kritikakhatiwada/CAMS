import { Component, TemplateRef } from '@angular/core';
import { CollegesService } from '../colleges/colleges.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { CollegeDetailService } from './college-detail.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentDetailService } from '../student-detail/student-detail.service';

@Component({
  selector: 'app-college-detail',
  templateUrl: './college-detail.component.html',
  styleUrls: ['./college-detail.component.css']
})
export class CollegeDetailComponent {
  collegeDetail: any;
  sanitizedDescription: SafeHtml | null = null;
  coverImage = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  collegeId: any;
  reviews: any[] = []; // To store the reviews for the college
  selectedRating = 0; // For the rating value selected by user
  hoverRating = 0; // For hover effect on stars
  reviewComment = ''; // For the review comment entered by the user
  userId: any;
  isFavorite: boolean = false;
  selectedCourses: string[] = []; // To store the selected courses
  studentDetails: any;
  selectedCourse: number | null = null; // Store only one selected course
  appliedCourses: string[] = []; // List of applied course IDs


  constructor(
    private collegeServices: CollegesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private collegeDetailService: CollegeDetailService,
    private modalService: NgbModal,
    private studentService: StudentDetailService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.fetchCollegeById(params['id']);
      console.log(params['id']);
    });

    this.fetchUserId();
    this.fetchStudentDetail();
    this.fetchAppliedCourse();
  }

  fetchCollegeById(id: any) {
    this.collegeServices.getCollegeById(id).subscribe((response: any) => {
      console.log(response);
      this.collegeDetail = response.college;

      // Sanitize the description for safe HTML rendering
      this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.collegeDetail.description);
      console.log(this.collegeDetail);
      
      // Fetch the reviews for the college
      this.fetchReviews(id);
      
      // Check if this college is a favorite for the user
      this.checkIfFavorite(id);
    });
  }

  fetchReviews(collegeId: string) {
    this.collegeServices.getCollegeReviews(collegeId).subscribe((response: any) => {
      this.reviews = response.ratings; // Storing the fetched reviews
      console.log("response", response);
    });
  }

  selectRating(rating: number) {
    this.selectedRating = rating; // Set selected rating
  }

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

  postReview() {
    if (!this.selectedRating || !this.reviewComment.trim()) return; // Check if rating and comment are provided

    const newReview = {
      collegeId: this.collegeDetail.id,
      userId: this.userId, // Replace with actual logged-in user ID
      rating: this.selectedRating,
      comment: this.reviewComment
    };

    // Post review to backend service
    this.collegeServices.postReview(newReview).subscribe(() => {
      // Fetch the updated reviews after posting
      this.fetchReviews(this.collegeDetail.id);
      
      // Reset the review form
      this.selectedRating = 0;
      this.reviewComment = '';
    });
  }

  applyToCollege(id: any, content: TemplateRef<any>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    })
  }

  
  addToFavorites(id: any) {
    const data = { student_id: this.userId, college_id: id };
    this.collegeDetailService.postFavoriteColleges(data).subscribe((response: any) => {
      if (response.success) {
        console.log('College added to favorites:', response);
        Swal.fire('Success', 'College added to favorites!', 'success');
        this.isFavorite = true;
      }
    });
  }

  checkIfFavorite(collegeId: any) {
    this.collegeDetailService.getFavoriteColleges().subscribe((response: any) => {
      // Check if the current collegeId is present in the favorites list
      const isFavorite = response.data.favorites.some((fav: any) => fav.college_id == collegeId);
      console.log('Is favorite:', isFavorite);
      
      this.isFavorite = isFavorite; // Set the isFavorite flag accordingly
    }, (error) => {
      console.error('Error fetching favorites:', error);
      this.isFavorite = false; // Default to false if there is an error
    });
  }

  removeFromFavorites(collegeId: any) {
    // Call the service to remove the college from the favorites
    this.collegeDetailService.removeFavoriteColleges(collegeId).subscribe((response: any) => {
      if (response.success) {
        // If removal was successful, update the favorite status
        Swal.fire('Success', 'College removed from favorites!', 'success');
        this.isFavorite = false; // Update the isFavorite flag to false
        
        // Optionally, refresh the college details to reflect changes
        this.fetchCollegeById(this.collegeDetail.id);
      } else {
        console.error('Error removing favorite');
      }
    });
  }
  
  
  onCourseSelectionChange(courseId: string, event: any) {
    if (event.target.checked) {
      this.selectedCourses.push(courseId);
    } else {
      const index = this.selectedCourses.indexOf(courseId);
      if (index > -1) {
        this.selectedCourses.splice(index, 1);
      }
    }
  }


  fetchStudentDetail() {
    this.studentService.getStudentDetailWithEducations().subscribe((response: any) => {
      console.log('Student detail:', response);
      this.studentDetails = response.student;
    });
  }

  // filteredCourses() {
  //   if (!this.studentDetails || !this.studentDetails.education?.length) {
  //     return [];
  //   }
  
  //   // Define education levels in order
  //   const educationLevels = ["SEE", "+2", "+2 Science", "+2 Management", "Bachelors", "Masters", "PhD"];
  
  //   // Sort student education based on predefined levels
  //   const sortedEducation = this.studentDetails.education.sort((a: any, b: any) => {
  //     return educationLevels.indexOf(a.degree) - educationLevels.indexOf(b.degree);
  //   });
  
  //   // Get the highest degree of the student
  //   const highestDegree = sortedEducation[sortedEducation.length - 1]?.degree;
  
  //   // Filter courses based on the requirement
  //   return this.collegeDetail?.courses?.filter((course: { requirement: string }) => {
  //     const courseRequirements = course.requirement.split(",").map(req => req.trim()); // Ensure array format
  
  //     // Check if the course requirement is exactly '+2'
  //     if (courseRequirements.includes("+2")) {
  //       // Allow students with "+2 Science" or "+2 Management" degrees
  //       if (highestDegree === "+2 Science" || highestDegree === "+2 Management") {
  //         return true;
  //       }
  //     }
  
  //     // Handle specific +2 Science or +2 Management requirement
  //     if (highestDegree === "+2 Science" && courseRequirements.includes("+2 Science")) {
  //       return true;
  //     }
  
  //     if (highestDegree === "+2 Management" && courseRequirements.includes("+2 Management")) {
  //       return true;
  //     }
  
  //     // Direct match for exact degree
  //     return courseRequirements.includes(highestDegree);
  //   }) || [];
  // }


  fetchAppliedCourse() {
    this.collegeDetailService.getAppliedCourses().subscribe((response: any) => {
      console.log('Applied courses:', response);
      // Assume response contains a list of applied course IDs
      this.appliedCourses = response.data.map((course: any) => course.course_id);
    });
  }


  filteredCourses() {
    if (!this.studentDetails || !this.studentDetails.education?.length) {
      return [];
    }

    const educationLevels = ["SEE", "+2", "+2 Science", "+2 Management", "Bachelors", "Masters", "PhD"];

    const sortedEducation = this.studentDetails.education.sort((a: any, b: any) => {
      return educationLevels.indexOf(a.degree) - educationLevels.indexOf(b.degree);
    });

    const highestDegree = sortedEducation[sortedEducation.length - 1]?.degree;

    return this.collegeDetail?.courses?.filter((course: { requirement: string }) => {
      const courseRequirements = course.requirement.split(",").map(req => req.trim());

      if (courseRequirements.includes("+2")) {
        if (highestDegree === "+2 Science" || highestDegree === "+2 Management") {
          return true;
        }
      }

      if (highestDegree === "+2 Science" && courseRequirements.includes("+2 Science")) {
        return true;
      }

      if (highestDegree === "+2 Management" && courseRequirements.includes("+2 Management")) {
        return true;
      }

      return courseRequirements.includes(highestDegree);
    }) || [];
  }
  
  isCourseApplied(courseId: string): boolean {
    return this.appliedCourses.includes(courseId);
  }
  
  
  
  

  applyForCourse() {
    if (!this.selectedCourse) {
      console.error("No course selected!");
      return;
    }

    console.log('Applying for course:', this.selectedCourse);

    const applicationData = {
      student_id: this.studentDetails.id,
      college_id: this.collegeDetail.id,
      course_id: this.selectedCourse
    };

    

    console.log('Application data:', applicationData);
    

    // Call service to apply for the selected course
    this.collegeDetailService.applyCollege(applicationData).subscribe((response: any) => {
      if (response.success) {
        this.initPayment(response.data.id);
        // alert('Application submitted successfully!');
        // this.modalService.dismissAll();
        // this.router.navigate(['/my-applications']);
      } else {
        alert('Failed to submit application.');
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  initRes: any;
  initPayment(id:any): void {
    if (this.studentDetails.id !== null || this.collegeDetail.id !== null) {
      this.collegeDetailService.initPayment(id).subscribe((res: any) => {
        
        console.log('Payment response:', res);
        this.initRes = res; 
        const paymentUrl = res.data.payment_url; 
        window.location.href = paymentUrl;
      }, error => {
        console.error('Error processing payment:', error);
      });
    } else {
      console.error('Application ID is null, cannot process payment.');
    }
  }
}
