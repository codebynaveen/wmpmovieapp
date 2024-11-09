import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSearchResultCardComponent } from './episode-search-result-card.component';

describe('EpisodeSearchResultCardComponent', () => {
  let component: EpisodeSearchResultCardComponent;
  let fixture: ComponentFixture<EpisodeSearchResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeSearchResultCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeSearchResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
