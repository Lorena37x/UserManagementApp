import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: any;

  constructor(private _http: HttpClient) {}

  getUserData(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/users/${id}`);
  }

  getNutritionData(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/prehrana?userId=${id}`);
  }

  getUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }

  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/users', data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }
}
