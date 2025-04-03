import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CollegeDetailsService } from './college-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css'],
})
export class CollegeDetailsComponent {
  formStructure: FormGroup;
  num: string = 'Hello';
  selectedImage: File | null = null; // Variable to hold selected image
  collegeById: any = null;
  collegeData: any[] = []; // Holds the list of colleges
  courses: any[] = []; // Holds the list of faculties/courses
  users: any[] = [];
  selectedEmail: string = '';

  selectedCourses: any[] = []; // To store courses for the current modal

  isEditMode = false;
  editingCollegeId: string | null = null;

  constructor(
    private modalService: NgbModal,
    private collegeDetailsService: CollegeDetailsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // Initialize form
    this.formStructure = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      collegeLogo: ['', Validators.required],
      belongsTo: ['', Validators.required],
      does_accept_first_year_applications: [0], // Use 0 for false
      is_public: [0], // Use 0 for false
      is_private: [0], // Use 0 for false
      student_capacity: [0, [Validators.required, Validators.min(0)]],
    });

    // Fetch college and faculties data
    this.getFaculties();
  }

  ngOnInit() {
    this.viewCollegeDetail();
    this.getUsers();
  }

  viewCourses(courses: any[], content: TemplateRef<any>) {
    this.selectedCourses = courses;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  editCollege(college: any, content: TemplateRef<any>) {
    this.isEditMode = true;
    this.editingCollegeId = college.id;

    console.log('Editing college:', college);

    // Populate the form with the selected college data
    this.formStructure.patchValue({
      name: college.name,
      location: college.location,
      belongsTo: college.belongsTo,
      collegeLogo: college.collegeLogo || null, // Set the logo if available
      does_accept_first_year_applications:
        college.does_accept_first_year_applications || false,
      is_public: college.is_public || false,
      is_private: college.is_private || false,
      student_capacity: college.student_capacity || 0,
    });

    console.log('Patch value', this.formStructure.value);

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  // onUpdate() {
  //   debugger;

  //   if (this.formStructure.valid && this.editingCollegeId) {
  //     // Add the file (if selected) to the form structure value
  //     const updatedCollegeData = {
  //       ...this.formStructure.value,
  //       collegeLogo: this.selectedImage || null, // Add the file (or null if none is selected)
  //     };

  //     console.log('Updated Data:', updatedCollegeData); // Debugging: Log the payload

  //     // Send the data directly as JSON to the service
  //     this.collegeDetailsService.updateCollege(this.editingCollegeId, updatedCollegeData).subscribe(
  //       (res: any) => {
  //         if (res.success) {
  //           this.toastr.success(res.message, 'Success');
  //           this.modalService.dismissAll();
  //           this.viewCollegeDetail();
  //         } else {
  //           this.toastr.error(res.message, 'Error');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error updating college:', error);
  //         this.toastr.error('An error occurred while updating the college.', 'Error');
  //       }
  //     );
  //   } else {
  //     console.warn('Form is invalid or editingCollegeId is missing');
  //   }
  // }

  onUpdate() {
    debugger;

    if (this.formStructure.valid && this.editingCollegeId) {
      // If no new image is selected, keep the previous image
      const updatedCollegeData = {
        ...this.formStructure.value,
        collegeLogo: this.selectedImage
          ? this.selectedImage
          : this.formStructure.value.collegeLogo,
      };

      console.log('Updated Data:', updatedCollegeData); // Debugging: Log the payload

      this.collegeDetailsService
        .updateCollege(this.editingCollegeId, updatedCollegeData)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success(res.message, 'Success');
              this.modalService.dismissAll();
              this.viewCollegeDetail();
            } else {
              this.toastr.error(res.message, 'Error');
            }
          },
          (error) => {
            console.error('Error updating college:', error);
            this.toastr.error(
              'An error occurred while updating the college.',
              'Error'
            );
          }
        );
    } else {
      console.warn('Form is invalid or editingCollegeId is missing');
    }
  }

  viewCollegeDetail() {
    this.collegeDetailsService.getCollegeDetails().subscribe((res: any) => {
      // Directly assigning the response to collegeData
      if (res && Array.isArray(res)) {
        this.collegeData = res; // Assuming res is an array of colleges
        console.log('College data: ', this.collegeData);
      } else {
        console.error('Invalid data structure for college details.');
      }
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file; // Set new image if uploaded
    }
  }

  getFaculties() {
    this.collegeDetailsService.getFaculties().subscribe((res: any) => {
      console.log('Faculties: ', res);
      this.courses = res; // Assuming the response is an array of courses
    });
  }
  onCoursesChange() {
    const selectedCourses = this.formStructure.value.courses;
    // Empty the array
    this.selectedCourses = [];
    // Add new courses
    selectedCourses.forEach((id: number) => {
      if (!this.selectedCourses.includes(id)) {
        this.selectedCourses.push(id);
      }
    });
  }

  onSubmit() {
    debugger;
    if (this.formStructure.valid) {
      const formData = new FormData();

      // Get the selected user ID (belongsTo)
      const selectedUserId = this.formStructure.value.belongsTo;

      // Append other form fields to FormData
      Object.keys(this.formStructure.value).forEach((key) => {
        if (key !== 'collegeLogo' && key !== 'belongsTo') {
          formData.append(key, this.formStructure.value[key]);
        }
      });

      // Append belongsTo (selected user ID) to FormData
      formData.append('belongsTo', selectedUserId);

      // If there's an image, append it to FormData
      if (this.selectedImage) {
        formData.append(
          'collegeLogo',
          this.selectedImage,
          this.selectedImage.name
        );
      }

      // Send FormData to the backend
      this.collegeDetailsService.addCollege(formData).subscribe((res: any) => {
        if (res.success) {
          this.viewCollegeDetail();
          this.modalService.dismissAll();
        }
      });
    }
  }

  viewCollegeDetailById(id: any, content: TemplateRef<any>): void {
    this.collegeDetailsService.getCollegeDetail(id).subscribe((res: any) => {
      if (res.success && res.college) {
        this.collegeById = res.college;
        this.modalService.open(content, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        });
      }
    });
  }

  getUsers() {
    this.collegeDetailsService
      .getUserByCode(environment.staff_code)
      .subscribe((res: any) => {
        if (res.success) {
          this.users = res.users; // Assign fetched data to the usersWithRoles array
          console.log('Users: ', this.users);
        }
      });
  }

  onEmailChange(selectedEmail: string) {
    console.log('Selected email:', selectedEmail);
    this.selectedEmail = selectedEmail; // Update selected email
  }

  deleteCollege(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.collegeDetailsService.deleteCollege(id).subscribe((res: any) => {
          if (res.success) {
            this.toastr.success(res.message, 'Success');
            this.viewCollegeDetail();
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Failed to delete', '', 'error');
      }
    });
  }
}
