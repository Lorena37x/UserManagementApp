import { Component, ViewChild } from '@angular/core';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDataListComponent } from '../user-data-list/user-data-list.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent {

  @ViewChild(UserDataListComponent)
  userListRef!: UserDataListComponent;

  constructor(private _dialog: MatDialog) {}

  openAddUser() {
    const dialogRef = this._dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.userListRef.getUserList();
        }
      },
    });
  }
}
