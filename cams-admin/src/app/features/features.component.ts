import { Component } from '@angular/core';
import { FeaturesService } from './features.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  userDetail:any;
  constructor(
    private featureservice:FeaturesService,
    private router:Router
  ){
      this.fetchCurrentUser()
  }

  logout(){
    console.log("User Logged out");
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }

  fetchCurrentUser(){
    this.featureservice.getCurrentUser().subscribe((res:any)=>{
      if(res.success){
        this.userDetail=res.user
        console.log(this.userDetail);
        
      }
    })
  }
}
