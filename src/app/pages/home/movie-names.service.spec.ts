import { TestBed } from '@angular/core/testing';

import { MovieNamesService } from './movie-names.service';

describe('MovieNamesService', () => {
  let service: MovieNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
