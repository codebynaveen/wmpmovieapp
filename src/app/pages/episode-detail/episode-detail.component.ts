import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  EpisodeSearchResultCardComponent
} from "../../components/episode-search-result-card/episode-search-result-card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {faAngleLeft, faBookmark} from '@fortawesome/free-solid-svg-icons';
import {Episode} from '../../core/models/episode';
import {CharacterCardComponent} from '../../components/character-card/character-card.component';
import {Character} from '../../core/models/character';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodesService} from '../../core/services/episodes.service';
import {CharactersService} from '../../core/services/characters.service';
import {extractIdsFromUrls, extractSeasonNumber} from '../../core/shared/utils';
import {EpisodeThumbnailService} from '../../core/services/episode-thumbnail.service';
import {Stills, Thumbnail} from '../../core/models/thumbnail';
import {FormsModule} from '@angular/forms';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [
    EpisodeSearchResultCardComponent,
    FaIconComponent,
    NgForOf,
    NgIf,
    CharacterCardComponent,
    NgClass,
    FormsModule
  ],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
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
export class EpisodeDetailComponent implements OnInit, OnDestroy {

  protected readonly faBookmark = faBookmark;

  isLoading: boolean = true;
  isModalOpen: boolean = false;

  episodeData: Episode | undefined = undefined;
  episodeCoverImage: string = 'https://placehold.co/1600x260?text=Cover Image';
  episodeThumbnailImage: string = 'https://placehold.co/260x360?text=Thumbnail Image';
  characterList: Character[] = [];

  tabList: string[] = [
    'About Movie',
    'Reviews',
    'Cast',
  ];
  selectedTab: string = this.tabList[2];
  ratingScore: number = 0;

  protected readonly faAngleLeft = faAngleLeft;

  private subscriptions: Subscription[] = [];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private episodesService: EpisodesService,
    private charactersService: CharactersService,
    private episodeThumbnailService: EpisodeThumbnailService,
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const episodeId = params['episodeId'];
      const episodeSubscription = this.episodesService.getEpisodeInfo(episodeId).subscribe((data: Episode) => {
        this.episodeData = data;
        this.isLoading = false;
        this.loadCharactersByIds(extractIdsFromUrls(data.characters));

        this.loadThumbnailImages(extractSeasonNumber(this.episodeData.episode), episodeId);
      }, (error) => {
        console.error('Error fetching episode info:', error);
        this.isLoading = false;
      });

      this.subscriptions.push(episodeSubscription);
    });
  }

  loadEpisodeInfo(episodeId: number) {
    this.episodesService.getEpisodeInfo(episodeId).subscribe((data: Episode) => {
      this.episodeData = data;
      this.isLoading = false;
      this.loadCharactersByIds(extractIdsFromUrls(data.characters));

      this.loadThumbnailImages(extractSeasonNumber(this.episodeData.episode), episodeId);
    }, (error) => {
      console.error('Error fetching episode info:', error);
      this.isLoading = false;
    })
  }

  loadCharactersByIds(characterIdList: number[]) {
    this.charactersService.getCharacterDataByIds(characterIdList).subscribe((characters: Character[]) => {
      this.characterList = characters;
    }, (error) => {
      console.error('Error fetching character info:', error);
    });
  }

  generateEpisodeThumbnailImageURL(imagesArray: Stills[]) {
    return `https://image.tmdb.org/t/p/w500${imagesArray[0].file_path}`;
  }

  generateCoverImageURL(imagesArray: Stills[]) {
    return `https://image.tmdb.org/t/p/original${imagesArray[2].file_path}`;
  }

  loadThumbnailImages(seasonId: number, episodeId: number) {
    this.episodeThumbnailService.loadEpisodeThumbnailData(seasonId, episodeId).subscribe((thumbnailData: Thumbnail) => {
      this.episodeCoverImage = this.generateCoverImageURL(thumbnailData.stills);
      this.episodeThumbnailImage = this.generateEpisodeThumbnailImageURL(thumbnailData.stills);
    }, (error) => {
      console.error('Error fetching character info:', error);
    })
  }

  openScoreModal() {
    this.isModalOpen = true;
    this.ratingScore = 5.8;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  goBack() {
    this.router.navigate([`episode/all`]);
  }
}
