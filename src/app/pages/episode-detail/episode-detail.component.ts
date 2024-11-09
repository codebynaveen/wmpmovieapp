import {Component, OnInit} from '@angular/core';
import {
  EpisodeSearchResultCardComponent
} from "../../components/episode-search-result-card/episode-search-result-card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import {Episode} from '../../core/models/episode';
import {CharacterCardComponent} from '../../components/character-card/character-card.component';
import {Character} from '../../core/models/character';
import {ActivatedRoute} from '@angular/router';
import {EpisodesService} from '../../core/services/episodes.service';
import {CharactersService} from '../../core/services/characters.service';
import {extractIdsFromUrls, extractSeasonNumber} from '../../core/shared/utils';
import {EpisodeThumbnailService} from '../../core/services/episode-thumbnail.service';
import {Stills, Thumbnail} from '../../core/models/thumbnail';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [
    EpisodeSearchResultCardComponent,
    FaIconComponent,
    NgForOf,
    NgIf,
    CharacterCardComponent,
    NgClass
  ],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss'
})
export class EpisodeDetailComponent implements OnInit {

  protected readonly faBookmark = faBookmark;

  isLoading: boolean = true;

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

  constructor(
    private route: ActivatedRoute,
    private episodesService: EpisodesService,
    private charactersService: CharactersService,
    private episodeThumbnailService: EpisodeThumbnailService,
  ) {
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const episodeId = params['episodeId'];
      this.loadEpisodeInfo(episodeId);
    });
  }

  loadEpisodeInfo(episodeId: number) {
    this.episodesService.getEpisodeInfo(episodeId).subscribe((data: Episode) => {
      this.episodeData = data;
      this.isLoading = false;
      console.log(extractIdsFromUrls(data.characters));
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
    return `https://image.tmdb.org/t/p/w500${imagesArray[2].file_path}`;
  }

  loadThumbnailImages(seasonId: number, episodeId: number) {
    this.episodeThumbnailService.loadEpisodeThumbnailData(seasonId, episodeId).subscribe((thumbnailData: Thumbnail) => {
      this.episodeCoverImage = this.generateCoverImageURL(thumbnailData.stills);
      this.episodeThumbnailImage = this.generateEpisodeThumbnailImageURL(thumbnailData.stills);
      console.log(this.episodeCoverImage);
    }, (error) => {
      console.error('Error fetching character info:', error);
    })
  }
}
