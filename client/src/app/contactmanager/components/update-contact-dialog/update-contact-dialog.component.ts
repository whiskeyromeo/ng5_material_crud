import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-contact-dialog',
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.scss']
})
export class UpdateContactDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  timePattern = '([01]?[0-9]|2[0-3]):[0-5][0-9]';
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  user: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateContactDialogComponent>,
    private userService: UserService,
    private router: Router,
  ) { }
   
  ngOnInit() {
    this.user = Object.assign({}, this.data);
    // Hack to get around issues with awesome-time-picker
    this.user.startTime = '';

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      bio: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      birthDate: ['', Validators.required],
      startTime: [''],
    });
    this.thirdFormGroup = this._formBuilder.group({
      avatar: ['']
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((res) => {
      this.dialogRef.close(res);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
