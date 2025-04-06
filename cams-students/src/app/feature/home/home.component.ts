import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentDetailService } from '../student-detail/student-detail.service';
import Swal from 'sweetalert2';
import { FeatureService } from '../feature.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  recommendedColleges: any[] = [];

  filters: { [key: string]: boolean } = {
    acceptsFirstYear: false,
    isPublic: false,
    isPrivate: false,
    small: false,
    medium: false,
    large: false,
  };

  searchForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentDetailService,
    private featureService: FeatureService,
    private authService: AuthService
  ) {
    this.searchForm = this.fb.group({
      keyword: [''], // Adding validation for the search input
    });

    this.featureService.getUserData().subscribe((response: any) => {
      this.user = response;
      this.fetchStudentData(this.user.id);
    });
  }

  onFilterClick(filterKey: string): void {
    this.filters[filterKey] = !this.filters[filterKey]; // Toggle filter value
  }

  user: any;

  fetchStudentData(userId: any) {
    this.studentService.getStudentDetailWithEducations().subscribe(
      (res: any) => {
        if (res.student === null) {
          Swal.fire({
            icon: 'warning',
            title: 'Please fill Student Form',

            confirmButtonText: 'Proceed',
          }).then((result: any) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/details/add']);
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info');
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const keyword = this.searchForm.get('keyword')?.value;

      // Create an object to hold selected filters
      let filtersQuery: { [key: string]: boolean } = {};

      // Loop through the filters and check if they are selected
      for (let key in this.filters) {
        if (this.filters[key]) {
          filtersQuery[key] = true;
        }
      }

      // Combine the keyword and selected filters into the queryParams
      const queryParams: any = { name: keyword, ...filtersQuery };

      // Navigate to the search page with the query parameters
      this.router.navigate(['/search'], { queryParams });
    }
  }
}
