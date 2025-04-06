import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollegesService } from '../colleges/colleges.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
  coverImage =
    'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  searchTerm: string | null = '';
  results: any[] = []; // Store search results
  filters: { [key: string]: any } = {}; // Store all filters for the query

  constructor(private route: ActivatedRoute, private collegeService: CollegesService) {}

  ngOnInit(): void {
    // Listen to query params from the route
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['name'] || null;
      this.filters = { ...params }; // Include all query parameters
      this.fetchResults();
    });
  }

  fetchResults(): void {
    this.collegeService.fetchCollegesBySearch(this.filters).subscribe(
      (response: any) => {
        this.results = response.data; // Adjust based on your backend's response structure
        console.log('Results:', this.results);
      },
      (error: any) => {
        console.error('Error fetching colleges:', error);
      }
    );
  }
}
