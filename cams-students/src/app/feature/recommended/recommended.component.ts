import { Component } from '@angular/core';
import { RecommendedService } from './recommended.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent {

  recommendedColleges: any[] = [];
  coverImage = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


  constructor(private recommendedService: RecommendedService) {
    this.fetchRecommendedColleges();
  }

  fetchRecommendedColleges() {
    this.recommendedService.fetchRecommendedColleges().subscribe((response: any) => {
      console.log(response);
      
      this.recommendedColleges = response.recommendedColleges;
    });
  }

}
