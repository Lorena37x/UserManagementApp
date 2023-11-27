import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UserManagementApp';

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog, 
    private _userService: UserService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  openAddEditUser() {
    const dialogRef = this._dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
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

  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('User deleted!');
      },
      error: console.log,
    });
  }
}