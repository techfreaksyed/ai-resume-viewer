import { Routes } from '@angular/router';
import { Results } from './components/results/results';
import { Home } from './components/home/home';
import { Preview } from './components/preview/preview';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'preview',
        component: Preview
    },
    {
        path: 'results',
        component: Results
    },
    // {
    //     path: '**',
    //     redirectTo: ''
    // }
];
// All routes above are already configured for lazy loading using loadChildren.