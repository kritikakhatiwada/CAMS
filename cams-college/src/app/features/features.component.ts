import { Component } from '@angular/core';
import { FeaturesService } from './features.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  userDetail: any;
  constructor(
    private featureService:FeaturesService,
    private router: Router
  ){
    this.fetchCurrentUser()
  }



  logout() {
    console.log('User logged out');
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }

  fetchCurrentUser(){
    this.featureService.getCurrentUser().subscribe((res: any)=>{
        if (res.success) {
          this.userDetail=res.user
          console.log(this.userDetail);
          
        }
        
    })
  }
}
