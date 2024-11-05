import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'loading',
    loadComponent:()=>import('./pages/loading/loading.component').then(m=>m.LoadingComponent)
  },
  {
    path:'search',
    loadComponent:()=>import('./pages/search/search.component').then(m=>m.SearchComponent)
  }
];
