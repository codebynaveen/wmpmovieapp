import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

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
    path: 'episode',
    component: MainLayoutComponent,
    children: [
      {
        path: 'all',
        loadComponent: () => import('./pages/episode-list/episode-list.component').then(m => m.EpisodeListComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/episode-search/episode-search.component').then(m => m.EpisodeSearchComponent)
      },
      {
        path: 'detail/:episodeId',
        loadComponent: () => import('./pages/episode-detail/episode-detail.component').then(m => m.EpisodeDetailComponent)
      }
    ]
  },
];
