import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'loading',
    loadComponent: () => import('./pages/loading/loading.component').then(m => m.LoadingComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movie-list/movie-list.component').then(m => m.MovieListComponent)
  }
];
