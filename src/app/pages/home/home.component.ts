import {Component, OnInit} from '@angular/core';
import {MovieNamesService} from './movie-names.service';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  episodes: any[] = []


  constructor(private movieNameService: MovieNamesService) {

  }

  ngOnInit(): void {
    this.loadAllMovies();
  }


  loadAllMovies() {
    this.movieNameService.getAllEpisodes().subscribe((data: any) => {
      this.episodes = data.results;
      // let episodesList = data?.results;

      // episodesList.forEach((episode, index) => {
      //   this.episodes.push(episode);
      // })
    });

  }
}
