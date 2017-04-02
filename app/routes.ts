import { Route, RouterModule } from '@angular/router';

// Pages
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { App404 } from './components/404/404.component';

// Modals
import { ModalCallback } from './modals/modal_callback';

// Route Pages
export const Routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServiceComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'modal-callback', component: ModalCallback, outlet: 'modals' },
    { path: '**', component: App404 }
];

export const routing = RouterModule.forRoot(Routes, { useHash: true });


// Route Modals
export const ModalRoute: Route[] = [
    { path: 'modal-callback', component: ModalCallback }
]

export const modal_routes = RouterModule.forRoot(ModalRoute);
