import {TestBed} from '@angular/core/testing';

import {EpisodeThumbnailService} from './episode-thumbnail.service';

describe('EpisodeThumbnailService', () => {
  let service: EpisodeThumbnailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodeThumbnailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
