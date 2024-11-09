import {Component, OnInit} from '@angular/core';
import { TopEpisodesListComponent } from "../../components/top-episodes-list/top-episodes-list.component";
import { NgClass, NgFor } from '@angular/common';
import { EpisodeCardComponent } from "../../components/episode-card/episode-card.component";
import {Episode} from '../../core/models/episode';
import {EpisodesService} from '../../core/services/episodes.service';
import {MainNavigationComponent} from '../../components/main-navigation/main-navigation.component';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [
    NgFor, NgClass, TopEpisodesListComponent,
    EpisodeCardComponent, MainNavigationComponent
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent implements OnInit {

  episodeList: Episode[] = [];

  tabList: string[] = [
    'Now Playing',
    'Upcoming',
    'Top Rated',
    'Popular'
  ];
  selectedTab: string = this.tabList[0];

  episodes: Episode[] = []

  constructor(private episodeService: EpisodesService) {
    this.selectedTab = this.tabList[0];
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.loadLatestEpisodes();
  }

  loadLatestEpisodes() {
    this.episodeService.getEpisodes(1,5).subscribe((data: Episode[]) => {
      console.log(data);
      this.episodeList = data;
      console.log(data);
      this.episodes = data;
    })
  }

}
