import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings-toolbar',
  template: `
        <div class="settings-overlay">
          <button class="settings-button" [matMenuTriggerFor]="menu" mat-button>
            <mat-icon class="slow-spin">settings</mat-icon>
          </button>
          <mat-menu #menu="matMenu" xPosition="before" yPosition="below">
            <button mat-menu-item (click)="toggleTheme.emit()">Toggle Theme</button>
            <button mat-menu-item (click)="toggleDirection.emit()">Toggle Direction</button>
          </mat-menu>
        </div>
  `,
  styleUrls: ['./settings-toolbar.component.scss']
})
export class SettingsToolbarComponent implements OnInit {
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDirection = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
