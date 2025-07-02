import { Routes } from '@angular/router';
import { Results } from './components/results/results';
import { Home } from './components/home/home';

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
        path: 'results',
        component: Results
    },
    {
        path: '**',
        redirectTo: ''
    }
];
// All routes above are already configured for lazy loading using loadChildren.