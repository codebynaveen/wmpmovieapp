import { Component, OnInit } from '@angular/core';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { NgFor, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { TopEpisodesListComponent } from '../../components/top-episodes-list/top-episodes-list.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { EpisodesService } from '../../core/services/episodes.service';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { Episode } from '../../core/models/episode';
import {
  EpisodeSearchResultCardComponent
} from '../../components/episode-search-result-card/episode-search-result-card.component';

@Component({
  selector: 'app-episode-search',
  standalone: true,
  imports: [
    EpisodeCardComponent,
    TopEpisodesListComponent,
    FaIconComponent,
    SearchBoxComponent,
    NgOptimizedImage,
    NgFor, NgIf,
    EpisodeSearchResultCardComponent
  ],
  templateUrl: './episode-search.component.html',
  styleUrl: './episode-search.component.scss'
})
export class EpisodeSearchComponent implements OnInit {

  protected readonly faInfoCircle = faInfoCircle;
  episodesList: Episode[] = [];
  isLoading: boolean = false;

  constructor(private episodeService: EpisodesService) {

  }

  ngOnInit(): void {
    this.loadLatestEpisodes();
  }

  loadLatestEpisodes() {
    this.isLoading = true;
    this.episodeService.getEpisodes(1, 5).subscribe((data: Episode[]) => {
      this.episodesList = data;
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching episodes:', error);
      this.isLoading = false;
    })
  }
}
