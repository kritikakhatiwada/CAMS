import { TestBed } from '@angular/core/testing';

import { CollegeDetailsService } from './college-details.service';

describe('CollegeDetailsService', () => {
  let service: CollegeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
