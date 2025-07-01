import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { Details } from './details/details';
import { Chart } from './chart/chart';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
        title: 'Home Page'
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'Details Page'
    },
    {
        path: 'chart',
        component: Chart,
        title: 'Chart'
    }
];
