import {Component, OnInit} from '@angular/core';
import {
  EpisodeSearchResultCardComponent
} from "../../components/episode-search-result-card/episode-search-result-card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import {SearchBoxComponent} from "../../components/search-box/search-box.component";
import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import {Episode} from '../../core/models/episode';
import {CharacterCardComponent} from '../../components/character-card/character-card.component';
import {Character} from '../../core/models/character';
import {ActivatedRoute} from '@angular/router';
import { EpisodesService } from '../../core/services/episodes.service';
import { CharactersService } from '../../core/services/characters.service';
import {extractIdsFromUrls} from '../../core/shared/utils';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [
    EpisodeSearchResultCardComponent,
    FaIconComponent,
    NgForOf,
    NgIf,
    SearchBoxComponent,
    CharacterCardComponent
  ],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss'
})
export class EpisodeDetailComponent implements OnInit {

  protected readonly faBookmark = faBookmark;

  episodeData: Episode | undefined = undefined;
  isLoading: boolean = true;
  characterList: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private episodesService: EpisodesService,
    private charactersService: CharactersService
  ) {  }

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

}
