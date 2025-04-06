import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';  // Adjust if necessary

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  // Creating a BehaviorSubject to store the user data.
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Method to set the user data in the BehaviorSubject.
  setUserData(data: any): void {
    this.userDataSubject.next(data); 
  }

  // Method to get the user data as an Observable.
  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

}
