import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

import Swal from 'sweetalert2';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formStructure: FormGroup;
  selectedImage: File | null = null; // Variable to hold selected image

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize the form group
    this.formStructure = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      age: [0, Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      code: [environment.code],
      imageUrl: [null, Validators.required]  // Add image field
    });
  }

  // Handle file input change (image upload)
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      // Optional: you can validate file type and size here before submitting
    }
  }

  // Submit the form
  onSubmit() {
    if (this.formStructure.valid) {
      const formData = new FormData();

      //Check password and confirm password
      if (this.formStructure.value.password !== this.formStructure.value.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match!',
        });
        return;
      }

            // Append form fields to FormData
            Object.keys(this.formStructure.value).forEach(key => {
              if (key !== 'imageUrl') {
                formData.append(key, this.formStructure.value[key]);
              }
            });
      
            // If there's an image, append it to the FormData
            if (this.selectedImage) {
              formData.append('imageUrl', this.selectedImage, this.selectedImage.name);
            }
            // Call the register service
            this.registerService.submitRegister(formData).subscribe((res: any) => {
              console.log(res);
              if (res.success) {
                this.router.navigate(['']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: res.message || res.errors
                })
              }
            },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message || 'Something went wrong!'
            })
          });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      })
    }
  }
}
