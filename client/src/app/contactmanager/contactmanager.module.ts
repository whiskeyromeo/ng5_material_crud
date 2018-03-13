import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { UserService } from './services/user.service';

import { routes } from './contact-routes';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { ApiService } from './services/api.service';
import { NoteService } from './services/note.service';
import { NewNoteDialogComponent } from './new-note-dialog/new-note-dialog.component';
import { ContactHomeComponent } from './components/contact-home/contact-home.component';
import { SettingsToolbarComponent } from './components/settings-toolbar/settings-toolbar.component';
import { UpdateContactDialogComponent } from './components/update-contact-dialog/update-contact-dialog.component';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  imports: [
    AmazingTimePickerModule,
    AngularFontAwesomeModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent,
    NewNoteDialogComponent,
    ContactHomeComponent,
    SettingsToolbarComponent,
    UpdateContactDialogComponent,
  ],
  entryComponents: [
    NewContactDialogComponent,
    NewNoteDialogComponent,
    UpdateContactDialogComponent,
  ],
  providers: [
    UserService,
    ApiService,
    NoteService,
    SnackbarService
  ]
})
export class ContactmanagerModule { }
