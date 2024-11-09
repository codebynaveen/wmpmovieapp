import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopEpisodeCardComponent} from './top-episode-card.component';

describe('TopEpisodeCardComponent', () => {
  let component: TopEpisodeCardComponent;
  let fixture: ComponentFixture<TopEpisodeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopEpisodeCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopEpisodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
