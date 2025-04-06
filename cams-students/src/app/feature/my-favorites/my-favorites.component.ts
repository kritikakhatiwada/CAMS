import { Component, OnInit } from '@angular/core';
import { MyFavoritesService } from './my-favorites.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {
  favoritesData: any;
  coverImage = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  constructor(
    private myFavoritesService: MyFavoritesService
  ) { }

  ngOnInit() {
    this.fetchFavoriteColleges();
  }

  fetchFavoriteColleges() {
    this.myFavoritesService.getFavoriteColleges().subscribe((response: any) => {
      if (response.success) {
        this.favoritesData = response.data;
      } else {
        console.error('Error fetching favorites');
      }
    });
  }

  removeFavorite(collegeId: any) {
    this.myFavoritesService.removeFavoriteColleges(collegeId).subscribe((response: any) => {
      if (response.success) {
        this.fetchFavoriteColleges();
      } else {
        console.error('Error removing favorite');
      }
    });
  }
}
