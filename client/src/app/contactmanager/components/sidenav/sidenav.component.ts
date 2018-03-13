import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { NoteService } from '../../services/note.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // handles automatic detection of the width of the browser using Observables

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  isDarkTheme = false;
  direction: String = 'ltr';
  users: Observable<User[]>;


  constructor(
    zone: NgZone,
    private userService: UserService,
    private noteService: NoteService,
    private router: Router
  ) {

    // triggers the sidebar change based on the width
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
    }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    // Initialize the users in the component with the users from UserService
    this.users = this.userService.users;
    this.userService.getAllUsers();

  }

  getUserPage(id) {
    // Ensure the sidenav closes when a link is clicked
    this.router.navigate(['/contactmanager', id]);
    if (this.isScreenSmall()) {
      this.sidenav.close();
    }
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDirection() {
    this.direction = (this.direction === 'ltr') ? 'rtl' : 'ltr';
  }


}
