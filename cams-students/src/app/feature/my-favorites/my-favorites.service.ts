import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class MyFavoritesService {

  constructor(private http: HttpClient) { }

    getFavoriteColleges() {
        return this.http.get(`${environment.base_url}favorites/student`);
    }


    postFavoriteColleges(data: any) {
        return this.http.post(`${environment.base_url}favorites/add`, data);
    }

    removeFavoriteColleges(college_id: any) {
        return this.http.delete(`${environment.base_url}favorites/remove/${college_id}`);
    }

}
