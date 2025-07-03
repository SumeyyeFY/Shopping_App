import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { Details } from './details/details';
import { Chart } from './chart/chart';
import { Shop } from './shop/shop';
import { PreCheckout } from './pre-checkout/pre-checkout';
import { GuestCheckout } from './guest-checkout/guest-checkout';

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
    },
    {
        path: "shop/:shop",
        component: Shop,
        title: 'Shop Page'
    },
    {
        path: "pre-checkout",
        component: PreCheckout,
        title: "Pre Checkout Page"
    },
    {
        path: "guest-checkout",
        component: GuestCheckout,
        title: "Guest Checkout Page"
    }
];
