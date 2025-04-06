import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { StudentDetailService } from '../student-detail.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  formStructure: FormGroup;
  collegeFormStructure: FormGroup;
  userData: any = {};
  educationCards: any[] = []; // Store education entries
  studentData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentService: StudentDetailService,
    private router: Router
  ) {
    // Initialize main form
    this.formStructure = this.fb.group({
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      parentName: ['', Validators.required],
      parentContact: [
        '',
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      ],
      parentEmail: ['', [Validators.required, Validators.email]],
    });

    // Initialize individual college form
    this.collegeFormStructure = this.fb.group({
      collegeName: ['', Validators.required],
      startedYear: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4}$/)],
      ],
      passedYear: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      cgpa: [0, Validators.required],
      degree: ['', Validators.required],
    });

    this.fetchUserData();
  }

  // Fetch user data
  fetchUserData() {
    this.authService.getCurrentUser().subscribe((res: any) => {
      this.userData = res.user;
    });
    this.fetchStudentData(this.userData.id);
 

  }

  // Add new college information
  addCollege() {
    const college = this.collegeFormStructure.value;
    this.educationCards.push(college);
    this.collegeFormStructure.reset();
  }

  // Edit college information by index
  editCollege(index: number) {
    const college = this.educationCards[index];
    this.collegeFormStructure.setValue({
      collegeName: college.collegeName,
      startedYear: college.startedYear,
      passedYear: college.passedYear,
      cgpa: college.cgpa,
      degree: college.degree,
    });
    this.educationCards.splice(index, 1); // Remove entry temporarily
  }

  // Delete college information by index
  deleteCollege(index: number) {
    this.educationCards.splice(index, 1);
  }

  onSubmit() {
    console.log("Form Structure::::",this.formStructure.value);
    
    if (this.formStructure.valid) {
      const formData = {
        ...this.formStructure.value,
        educations: this.educationCards.map((education) => ({
          collegeName: education.collegeName,
          startedYear: `${education.startedYear}-09-01`,
          PassedYear: `${education.passedYear}-06-30`,
          cgpa: education.cgpa,
          degree: education.degree,
        })),
      };

      console.log('Form Data:', this.studentData);
      
  
      if (this.studentData === null) {
        // Create new student details
        this.studentService.saveStudentDetailWithEducation(formData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('Success', 'Student details added successfully', 'success');
              this.formStructure.reset();
              this.educationCards = [];
              this.fetchStudentData(this.userData.id); // Refresh data
            } else {
              Swal.fire('Error', 'Failed to add student details', 'error');
            }
          },
          (error) => {
            console.error('Error saving student details:', error);
          }
        );
      } else {
        // Call update if studentData exists
        this.onUpdate(this.studentData.id, formData);
      }
    } else {
      this.formStructure.markAllAsTouched();
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
    }
  }
  

  onUpdate(id: number, formData: any) {
    this.studentService.updateStudentDetailWithEducation(id, formData).subscribe(
      (res: any) => {
        if (res.success) {
          Swal.fire('Updated', 'Student details updated successfully', 'success');
          this.fetchStudentData(this.userData.id); // Refresh data after update
        } else {
          Swal.fire('Error', 'Failed to update student details', 'error');
        }
      },
      (error) => {
        console.error('Error updating student details:', error);
      }
    );
  }
  

  fetchStudentData(userId: any) {
    this.studentService.getStudentDetailWithEducations().subscribe(
      (res: any) => {
        console.log("Student Data::::",res);
        
        if (res.student === null) {
          Swal.fire({
            icon: 'warning',
            title: 'Please fill the data',
            confirmButtonText: 'Proceed',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/details/add']);
            }
          });
          this.studentData = null;
        } else {
          this.studentData = res.student;
          this.formStructure.patchValue({
            birthDate: this.studentData.birthDate,
            gender: this.studentData.gender,
            parentName: this.studentData.parentName,
            parentContact: this.studentData.parentContact,
            parentEmail: this.studentData.parentEmail,
          });
  
          // Populate education details
          this.educationCards = this.studentData.education.map((edu: any) => ({
            collegeName: edu.collegeName,
            startedYear: new Date(edu.startedYear).getFullYear(), // Extract year only
            passedYear: new Date(edu.PassedYear).getFullYear(),
            cgpa: edu.cgpa,
            degree: edu.degree,
          }));
  
          console.log('Student Data:', this.studentData);
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }
  
}
