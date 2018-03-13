import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
 } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import { merge, tap } from 'rxjs/operators';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { NewNoteDialogComponent } from '../../new-note-dialog/new-note-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() userId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  notes: Note[];
  selectedNote: Note;
  dataSource: MatTableDataSource<Note>;
  displayedColumns = ['id', 'title', 'date', 'options'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue.trim();
  }

  constructor(
    private noteService: NoteService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  ngOnChanges() {
    this.updateDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddNoteDialog(): void {
    const data = (this.selectedNote) ? this.selectedNote : {author: this.userId};
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '450px',
      data
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        if (response.success) {
          this.updateDataSource();
        }
        this.snackBarService
          .openSnackBarWithCloseAction(response.message);
      }
      // Reset the selected note
      this.selectedNote = undefined;
    });
  }

  deleteNote(noteId) {
    this.noteService.deleteNote(noteId).subscribe(res => {
      this.updateDataSource();
      this.snackBarService
        .openSnackBarWithCloseAction(res['message']);
    });
    this.noteService.getUserNotes(this.userId);
  }

  editNote(note) {
    this.selectedNote = note;
    this.openAddNoteDialog();
  }

  updateDataSource() {
    this.noteService.getUserNotes(this.userId).subscribe(res => {
      this.dataSource.data = res.notes.map((note, index) => {
        return Object.assign({ id: index + 1 }, note);
      });
    });
  }

}

