import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UserManagementApp';

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _userService: UserService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  openAddEditUser() {
    this._dialog.open(AddEditUserComponent);
    }

  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
    interface DeleteResponse {}
    this._userService.deleteUser(id).subscribe({
      next: (res: DeleteResponse) => {
        alert('User deleted');
        this.getUserList()
      },
      error: console.log,
    });
  }
}