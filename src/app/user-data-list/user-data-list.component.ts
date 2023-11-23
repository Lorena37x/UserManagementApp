import { Component } from '@angular/core';

@Component({
  selector: 'app-user-data-list',
  styleUrls: ['./user-data-list.component.css'],
  templateUrl: './user-data-list.component.html',
})
export class UserDataListComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email'];
  dataSource = USER_DATA;
}

export interface UserList {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const USER_DATA: UserList[] = [
  {firstName: 'Lorena', lastName: 'Papeša', phone: '0911939190', email: 'lorena.papesa37@gmail.com'},
  {firstName: 'Pero', lastName: 'Perić', phone: '0911234567', email: 'peroperic@gmail.com'},
  {firstName: 'Zdenko', lastName: 'Zdenkić', phone: '0981234567', email: 'zdenko_zdenkic@gmail.com'},
  {firstName: 'Mirko', lastName: 'Mirkić', phone: '0989876543', email: 'mirko.mirkic@gmail.com'},
  {firstName: 'Ana', lastName: 'Anić', phone: '0951122333', email: 'ana.anic1@gmail.com'},
  {firstName: 'Iva', lastName: 'Ivić', phone: '0955550555', email: 'ivaivic123@gmail.com'},
  {firstName: 'Dora', lastName: 'Dorić', phone: '0951115555', email: 'd_doric5@gmail.com'},
  {firstName: 'Marko', lastName: 'Markić', phone: '0971357973', email: 'mmarkic0@gmail.com'},
  {firstName: 'Jozo', lastName: 'Jozić', phone: '0920246820', email: 'jozo1995@gmail.com'},
  {firstName: 'Ivan', lastName: 'Horvat', phone: '0913759123', email: 'ivan.horvat96@gmail.com'},
];

