import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NoteService } from '../../services/note.service';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { Note } from '../../models/note';

import { UpdateContactDialogComponent } from '../update-contact-dialog/update-contact-dialog.component';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  // create with the activated route and user service to allow for viewing of individual users
  constructor(
    private dialog: MatDialog,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackbarService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.user = null;
      this.userService.users.subscribe(users => {
        if (users.length > 0) {
          this.user = this.userService.userById(id);
        }
      });
    });
  }

  editUser() {
    // edit the user
    this.openUpdateContactDialog();
    this.userService.updateUser(this.user);
  }

  deleteUser() {
    // delete the user
    this.userService.deleteUser(this.user._id)
      .subscribe(response => {
        this.snackBarService
          .openSnackBarWithCloseAction(response['message']);
        this.userService.getAllUsers();
        this.router.navigate(['']);
      });
  }

  openUpdateContactDialog(): void {
    const dialogRef = this.dialog.open(UpdateContactDialogComponent, {
      minWidth: '500px',
      data: this.user,
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.snackBarService
          .openSnackBarWithCloseAction(response.message);
          if (response.success) {
            // this.user = response.user;
            this.userService.getAllUsers();
          }
      }
    });
  }




}
