import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopEpisodesListComponent} from './top-episodes-list.component';

describe('SeasonsListComponent', () => {
  let component: TopEpisodesListComponent;
  let fixture: ComponentFixture<TopEpisodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopEpisodesListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopEpisodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
