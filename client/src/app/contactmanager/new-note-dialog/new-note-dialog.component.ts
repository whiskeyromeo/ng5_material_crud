import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../models/note';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss']
})
export class NewNoteDialogComponent implements OnInit {

  note: Note;
  noteForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewNoteDialogComponent>,
    private noteService: NoteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.note = this.data;
    this.createForm();
  }

  createForm() {
    this.noteForm = this.fb.group({
      title: new FormControl(this.note.title, [Validators.minLength(3), Validators.maxLength(40), Validators.required]),
      content: new FormControl(this.note.content, [Validators.minLength(5), Validators.maxLength(160), Validators.required]),
    });
  }

  save() {
    this.note = <Note>Object.assign(this.note, this.noteForm.value);
    if (this.note._id) {
      this.noteService.updateNote(this.note)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    } else {
      this.noteService.addNote(this.note)
        .subscribe(res => {
          this.dialogRef.close(res);
      });
    }
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
