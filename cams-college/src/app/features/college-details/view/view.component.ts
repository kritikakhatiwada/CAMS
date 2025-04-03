import { Component, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../dashboard/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CollegeDetailService } from '../college-details.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  collegeDetail: any;
  formStructure: FormGroup;
  sanitizedDescription: SafeHtml | null = null;
  coverImage = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private collegeService: CollegeDetailService
  ) {
    this.formStructure = this.fb.group({
      location: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', Validators.required],
      courses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.collegeService.fetchOwnCollege().subscribe(
      (response: any) => {
        this.collegeDetail = response.college;
        console.log("College Details: ", this.collegeDetail.id);
        
        this.collegeService.setCollegeId(this.collegeDetail.id);

        this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
          this.collegeDetail.description
        )
        
        console.log("Response of college details: ", this.sanitizedDescription);
        

        if (this.collegeDetail) {
          console.log("College Desc", this.collegeDetail.description);
          
          this.formStructure.patchValue({
            location: this.collegeDetail.location,
            contact: this.collegeDetail.contact,
            email: this.collegeDetail.email,
            website: this.collegeDetail.website,
            description: this.collegeDetail.description
          });

          console.log("Patched value", this.formStructure.value);
          

          if (this.collegeDetail.courses && this.collegeDetail.courses.length > 0) {
            this.setCourses(this.collegeDetail.courses);
          }
        }
      },
      (error) => console.error('Error fetching college data', error)
    );
  }

  openPreview() {
    const content = document.querySelector('.content-wrapper').innerHTML;
    const previewWindow = window.open('', '_blank');
  
    // Copy the content styles from the main page into the preview window
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(link => link.outerHTML)
      .join('');
  
    previewWindow.document.write(`
      <html>
        <head>
          <title>College Details Preview</title>
          ${styles} <!-- Injecting styles from the main page -->
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div class="container-fluid p-0">
            <div class="content-wrapper" style="max-height: 100vh; overflow-y: auto;">
              ${content} <!-- Injecting the entire content -->
            </div>
          </div>
        </body>
      </html>
    `);
    
    previewWindow.document.close();
  }
  
  

  setCourses(courses: any[]) {
    const courseFormGroups = courses.map((course) =>
      this.fb.group({
        name: [course.name, Validators.required],
        seatsAvailable: [course.seatsAvailable, [Validators.required, Validators.min(1)]],
        requirement: [course.requirement, Validators.required]
      })
    );
    this.formStructure.setControl('courses', this.fb.array(courseFormGroups));
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  get courses(): FormArray {
    return this.formStructure.get('courses') as FormArray;
  }

  addCourse() {
    this.courses.push(
      this.fb.group({
        name: ['', Validators.required],
        seatsAvailable: [1, [Validators.required, Validators.min(1)]],
        requirement: ['', Validators.required]
      })
    );
  }

  removeCourse(index: number) {
    this.courses.removeAt(index);
  }

  onSubmit() {
    if (this.formStructure.valid) {
      this.collegeService.updateCollegeDetails(this.formStructure.value, this.collegeDetail.id).subscribe(
        (response) => {
          this.fetchData();
          this.modalService.dismissAll();
        },
        (error) => console.error('Error updating college details', error)
      );
    } else {
      console.error('Form is invalid');
    }
  }
}

