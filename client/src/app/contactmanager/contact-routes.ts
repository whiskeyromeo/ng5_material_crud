import { Routes } from '@angular/router';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactHomeComponent } from './components/contact-home/contact-home.component';

export const routes: Routes = [
    {
        path: '', component: ContactmanagerAppComponent,
        children: [
            { path: ':id', component: MainContentComponent },
            { path: '', component: ContactHomeComponent },
        ],
    },
    { path: '**', redirectTo: '' },
];
