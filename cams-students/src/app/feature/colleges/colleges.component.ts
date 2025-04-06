import { Component, OnInit } from '@angular/core';
import { CollegesService } from './colleges.service';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  coverImage = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  constructor(
    private collegeServices: CollegesService
  ) { }

  colleges: any[] = [];
  collegeByName: any;
  collegeByCourse: any;
  courses: any[] = [];

  selectedCourse: string | null = null;


  ngOnInit() {
    this.fetchAllColleges();
  }

fetchAllColleges() {
  this.collegeServices.fetchColleges().subscribe((response: any) => {
    console.log(response);
    
    // Filter out colleges with an empty 'courses' array
    this.colleges = response.filter((college: any) => college.courses && college.courses.length > 0);
  });
}

}
