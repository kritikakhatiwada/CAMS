import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CollegesService {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchColleges(),
    this.fetchAllCourses()
  }

  fetchColleges() {
    let url = `${environment.base_url}college/`
    return this.http.get(url);
  }

  fetchCollegeByCourse(course: any) {
    let url = `${environment.base_url}college/by-course/?course=${course}`
    return this.http.get(url);
  }

  fetchCollegeByName(name: any) {
    let url = `${environment.base_url}college/by-name/?name=${name}`
    return this.http.get(url);
  }

  fetchAllCourses() {
    let url = `${environment.base_url}courses/all`
    return this.http.get(url); 
  }

  getCollegeById(id: any) {
    let url = `${environment.base_url}college/detail/${id}`
    return this.http.get(url);
  }

  applyCollege(data: any) {
    let url = `${environment.base_url}applications/apply`
    return this.http.post(url, data);
  }

  getCourseById(id: any) {
    let url = `${environment.base_url}courses/${id}`
    return this.http.get(url);
  }

  getUserById(id: any) {
    let url = `${environment.base_url}users/userInfo/${id}`
    return this.http.get(url);
  }

  fetchCollegesBySearch(filters: { [key: string]: any }): Observable<any>{
    return this.http.get(`${environment.base_url}college/search`, { params: filters });
  }


    
  // getCollegeById(id: string): Observable<any> {
  //   return this.http.get<any>(`${environment.base_url}/colleges/${id}`);
  // }

  // Fetch reviews for a particular college
  getCollegeReviews(collegeId: string): Observable<any> {
    return this.http.get<any>(`${environment.base_url}ratings/single/${collegeId}`);
  }

  // Post a new review for a college
  postReview(review: any): Observable<any> {
    return this.http.post<any>(`${environment.base_url}ratings/add`, review);
  }


}
