import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  constructor(
    private http:HttpClient
  ) { }
  getCurrentUser(){
    let url=`${environment.base_url}users/currentUser`
    return this.http.get(url)
  }
}
