import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Note } from '../models/note';

import 'rxjs/add/operator/map';


@Injectable()
export class NoteService {

  baseUrl = environment.SERVER_PATH;
  // Need to use the behaviorSubject to monitor changes using Observables
  private _notes: BehaviorSubject<Note[]>;
  private notesStore: { notes: Note[] };
  constructor(
    private http: HttpClient
  ) {
    this.notesStore = { notes: []};
    this._notes = new BehaviorSubject<Note[]>([]);
  }

  get notes(): Observable<Note[]> {
    return this._notes.asObservable();
  }

  getAllNotes() {
    return this.http.get<any>(this.baseUrl + '/notes')
      .subscribe( data => {
        this.notesStore.notes = data.notes;
        this._notes.next(Object.assign({}, this.notesStore).notes);
      }, error => {
        console.error('error in notes-service getallnotes: ', error);
      });
  }

  getUserNotes(id: String) {
    return this.http.get<any>(this.baseUrl + '/notes/' + id);
  }

  addNote(note: Note) {
    return this.http.post(this.baseUrl + '/note', note)
      .map((res) => {
        if (res) {
          return res;
        }
      });
  }

  updateNote(note: Note) {
    return this.http.put(this.baseUrl + '/note', note)
      .map((res) => {
        if (res) {
          return res;
        }
      });
  }

  deleteNote(noteId: number) {
    return this.http.delete(`${this.baseUrl}/note/${noteId}`);
  }

}
