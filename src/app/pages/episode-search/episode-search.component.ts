import { Component, OnInit } from '@angular/core';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { NgForOf } from '@angular/common';
import { TopEpisodesListComponent } from '../../components/top-episodes-list/top-episodes-list.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { EpisodesService } from '../../core/services/episodes.service';
import {SearchBoxComponent} from '../../components/search-box/search-box.component';

@Component({
  selector: 'app-episode-search',
  standalone: true,
  imports: [
    EpisodeCardComponent,
    NgForOf,
    TopEpisodesListComponent,
    FaIconComponent,
    SearchBoxComponent
  ],
  templateUrl: './episode-search.component.html',
  styleUrl: './episode-search.component.scss'
})
export class EpisodeSearchComponent implements OnInit {

  protected readonly faInfoCircle = faInfoCircle;

  constructor(private episodeService: EpisodesService) {

  }

  ngOnInit(): void {

  }

}
