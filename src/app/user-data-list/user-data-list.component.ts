import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';


@Component({
  selector: 'app-user-data-list',
  styleUrls: ['./user-data-list.component.css'],
  templateUrl: './user-data-list.component.html',
})
export class UserDataListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _userService: UserService,
    private _dialog: MatDialog
    )
    {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
   }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('User deleted!');
        this.getUserList()
      },
      error: console.log,
    });
  }

  openEditUser(data: any) {
    const dialogRef = this._dialog.open(AddEditUserComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }
}

