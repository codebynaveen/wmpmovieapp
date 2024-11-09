import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSearchComponent } from './episode-search.component';

describe('EpisodeSearchComponent', () => {
  let component: EpisodeSearchComponent;
  let fixture: ComponentFixture<EpisodeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
