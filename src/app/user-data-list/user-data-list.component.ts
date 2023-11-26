import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-user-data-list',
  styleUrls: ['./user-data-list.component.css'],
  templateUrl: './user-data-list.component.html',
})
export class UserDataListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService){}

  ngOnInit(): void {
    this.getUserList();
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
}

// export interface UserList {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
// }

// const USER_DATA: UserList[] = [
//   {firstName: 'Lorena', lastName: 'Papeša', phone: '0911939190', email: 'lorena.papesa37@gmail.com'},
//   {firstName: 'Pero', lastName: 'Perić', phone: '0911234567', email: 'peroperic@gmail.com'},
//   {firstName: 'Zdenko', lastName: 'Zdenkić', phone: '0981234567', email: 'zdenko_zdenkic@gmail.com'},
//   {firstName: 'Mirko', lastName: 'Mirkić', phone: '0989876543', email: 'mirko.mirkic@gmail.com'},
//   {firstName: 'Ana', lastName: 'Anić', phone: '0951122333', email: 'ana.anic1@gmail.com'},
//   {firstName: 'Iva', lastName: 'Ivić', phone: '0955550555', email: 'ivaivic123@gmail.com'},
//   {firstName: 'Dora', lastName: 'Dorić', phone: '0951115555', email: 'd_doric5@gmail.com'},
//   {firstName: 'Marko', lastName: 'Markić', phone: '0971357973', email: 'mmarkic0@gmail.com'},
//   {firstName: 'Jozo', lastName: 'Jozić', phone: '0920246820', email: 'jozo1995@gmail.com'},
//   {firstName: 'Ivan', lastName: 'Horvat', phone: '0913759123', email: 'ivan.horvat96@gmail.com'},
// ];

// export class User {

//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;

//   constructor(firstName: string = '', lastName: string = '', phone: string = '', email: string = '') {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.phone = phone;
//     this.email = email;
//   }

// export const personsData: User[] = [
//   new Person(1, 'person 1', 30, 'Software Developer'),
//   new Person(2, 'person 2', 33, 'Dentist'),
//   new Person(3, 'person 3', 32, 'Physician Assistant'),
//   new Person(4, 'person 4', 33, 'Software Developer'),
//   new Person(5, 'person 5', 34, 'Software Developer'),
//   new Person(6, 'person 6', 25, 'Nurse'),
//   new Person(7, 'person 7', 36, 'Software Developer'),
//   new Person(8, 'person 8', 27, 'Physician'),
//   new Person(9, 'person 9', 28, 'Software Developer'),
//   new Person(10, 'person 10', 28, 'Software Developer')
// ]

