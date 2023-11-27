import { Component } from '@angular/core';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent {

  constructor(private _dialog: MatDialog) {}

  openAddEditUser() {
    this._dialog.open(AddEditUserComponent);
  }
}
