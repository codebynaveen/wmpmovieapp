import {Component, OnDestroy, OnInit} from '@angular/core';
import {TopEpisodesListComponent} from "../../components/top-episodes-list/top-episodes-list.component";
import {NgClass, NgFor} from '@angular/common';
import {EpisodeCardComponent} from "../../components/episode-card/episode-card.component";
import {Episode, EpisodeResult} from '../../core/models/episode';
import {EpisodesService} from '../../core/services/episodes.service';
import {MainNavigationComponent} from '../../components/main-navigation/main-navigation.component';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {EpisodeThumbnailService} from '../../core/services/episode-thumbnail.service';
import {extractEpisodeNumber} from '../../core/shared/utils';
import {Stills, Thumbnail} from '../../core/models/thumbnail';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [
    NgFor, NgClass, TopEpisodesListComponent,
    EpisodeCardComponent, MainNavigationComponent, FormsModule
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(10px)'}),
          stagger(100, [
            animate('1000ms ease-out',
              style({opacity: 1, transform: 'translateY(0)'})
            )
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class EpisodeListComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  tabList: string[] = [
    'Now Playing',
    'Upcoming',
    'Top Rated',
    'Popular'
  ];
  selectedTab: string = this.tabList[0];

  topEpisodeList: Episode[] = [];
  searchText: string = '';

  allEpisodeList: Episode[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private episodeService: EpisodesService,
    private episodeThumbnailService: EpisodeThumbnailService,
    private router: Router
  ) {
    this.selectedTab = this.tabList[0];
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.loadLatestEpisodes();
    this.loadAllEpisodes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadLatestEpisodes() {
    this.isLoading = true;
    const latestEpisodesSub = this.episodeService.getEpisodes(1, 5).subscribe((data: Episode[]) => {
      this.topEpisodeList = data;
      this.loadThumbnailsForEpisodes();
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching episodes:', error);
      this.isLoading = false;
    });
    this.subscriptions.push(latestEpisodesSub);
  }

  loadThumbnailsForEpisodes() {
    this.topEpisodeList.forEach(episode => {
      this.loadThumbnailImages(extractEpisodeNumber(episode.episode), episode.id, episode);
    });
  }

  generateEpisodeThumbnailImageURL(imagesArray: Stills[]) {
    return `https://image.tmdb.org/t/p/w500${imagesArray[0].file_path}`;
  }

  loadThumbnailImages(seasonId: number, episodeId: number, episode: Episode) {
    this.episodeThumbnailService.loadEpisodeThumbnailData(seasonId, episodeId).subscribe((thumbnailData: Thumbnail) => {
      episode.thumbnail = this.generateEpisodeThumbnailImageURL(thumbnailData.stills);
    }, (error) => {
      // console.error('Error fetching episode thumbnail:', error);
      episode.thumbnail = 'https://rickandmortyapi.com/api/character/avatar/249.jpeg' // setting this as the placeholder image because i found this one return the placeholder image like from the DB
    })
  }

  loadAllEpisodes() {
    this.isLoading = true;
    const allEpisodesSub = this.episodeService.getAllEpisodes().subscribe((data: EpisodeResult) => {
      this.allEpisodeList = data.results;
      this.loadThumbnailsForAllEpisodes();
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching episodes:', error);
      this.allEpisodeList = [];
      this.isLoading = false;
    });

    this.subscriptions.push(allEpisodesSub);
  }

  generateAllEpisodeThumbnailImageURL(imagesArray: Stills[]) {
    return `https://image.tmdb.org/t/p/w500${imagesArray[2].file_path}`;
  }

  loadAllThumbnailImages(seasonId: number, episodeId: number, episode: Episode) {
    this.episodeThumbnailService.loadEpisodeThumbnailData(seasonId, episodeId).subscribe((thumbnailData: Thumbnail) => {
      episode.thumbnail = this.generateAllEpisodeThumbnailImageURL(thumbnailData.stills);
    }, (error) => {
      // console.error('Error fetching episode thumbnail:', error);
      episode.thumbnail = 'https://rickandmortyapi.com/api/character/avatar/249.jpeg' // setting this as the placeholder image because i found this one return the placeholder image like from the DB
    })
  }

  loadThumbnailsForAllEpisodes() {
    this.allEpisodeList.forEach(episode => {
      this.loadAllThumbnailImages(extractEpisodeNumber(episode.episode), episode.id, episode);
    });
  }

  searchEpisode() {
    this.router.navigate([`episode/search/${this.searchText}`]);
  }

}
