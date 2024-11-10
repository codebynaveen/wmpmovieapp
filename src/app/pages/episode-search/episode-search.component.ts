import {Component, OnDestroy, OnInit} from '@angular/core';
import {EpisodeCardComponent} from '../../components/episode-card/episode-card.component';
import {NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import {TopEpisodesListComponent} from '../../components/top-episodes-list/top-episodes-list.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faAngleLeft, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {EpisodesService} from '../../core/services/episodes.service';
import {Episode, EpisodeResult} from '../../core/models/episode';
import {
  EpisodeSearchResultCardComponent
} from '../../components/episode-search-result-card/episode-search-result-card.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodeThumbnailService} from '../../core/services/episode-thumbnail.service';
import {Stills, Thumbnail} from '../../core/models/thumbnail';
import {extractEpisodeNumber} from '../../core/shared/utils';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-episode-search',
  standalone: true,
  imports: [
    EpisodeCardComponent,
    TopEpisodesListComponent,
    FaIconComponent,
    NgOptimizedImage,
    NgFor, NgIf,
    EpisodeSearchResultCardComponent, FormsModule
  ],
  templateUrl: './episode-search.component.html',
  styleUrl: './episode-search.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(10px)'}),
          stagger(100, [
            animate('600ms ease-out',
              style({opacity: 1, transform: 'translateY(0)'})
            )
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class EpisodeSearchComponent implements OnInit, OnDestroy {

  protected readonly faInfoCircle = faInfoCircle;
  protected readonly faAngleLeft = faAngleLeft;

  episodesList: Episode[] = [];
  isLoading: boolean = false;

  searchText: string = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private episodeService: EpisodesService,
    private episodeThumbnailService: EpisodeThumbnailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let activeRouteServiceSub = this.activatedRoute.params.subscribe(params => {
      this.searchText = params['searchText'] || '';
      if (this.searchText) {
        this.searchEpisode();
      } else {
        this.loadDefaultEpisodes();
      }
    });
    this.subscriptions.push(activeRouteServiceSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadDefaultEpisodes() {
    this.isLoading = true;
    this.episodeService.getEpisodes(1, 6).subscribe((data: Episode[]) => {
      this.episodesList = data;
      this.loadThumbnailsForEpisodes();
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching episodes:', error);
      this.isLoading = false;
    })
  }

  loadThumbnailsForEpisodes() {
    this.episodesList.forEach(episode => {
      this.loadThumbnailImages(extractEpisodeNumber(episode.episode), episode.id, episode);
    });
  }

  goBack() {
    this.router.navigate([`episode/all`]);
  }

  searchEpisode() {
    this.isLoading = true;
    let episodeServiceSub = this.episodeService.searchEpisodesByName(this.searchText).subscribe((episodes: EpisodeResult) => {
      this.episodesList = episodes.results;
      this.loadThumbnailsForEpisodes();
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching episodes:', error);
      this.isLoading = false;
      this.episodesList = [];
    })
    this.subscriptions.push(episodeServiceSub);
  }

  generateEpisodeThumbnailImageURL(imagesArray: Stills[]) {
    return `https://image.tmdb.org/t/p/w500${imagesArray[0].file_path}`;
  }

  loadThumbnailImages(seasonId: number, episodeId: number, episode: Episode) {
    let episodeThumbnailServiceSub = this.episodeThumbnailService.loadEpisodeThumbnailData(seasonId, episodeId).subscribe((thumbnailData: Thumbnail) => {
      episode.thumbnail = this.generateEpisodeThumbnailImageURL(thumbnailData.stills);
    }, (error) => {
      console.error('Error fetching episode thumbnail:', error);
      episode.thumbnail = 'https://rickandmortyapi.com/api/character/avatar/249.jpeg' // setting this as the placeholder image because i found this one return the placeholder image like from the DB
    });
    this.subscriptions.push(episodeThumbnailServiceSub);
  }
}
