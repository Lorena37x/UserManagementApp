import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrehranaView } from '../core/modules/prehrana-view';
import { UserView } from '../core/modules/user-view';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: any;

  constructor(private _http: HttpClient) {}

  getUserData(id: number): Observable<UserView> {
    return this._http.get<UserView>(`http://localhost:3000/users/${id}`);
  }

  getNutritionData(id: number): Observable<PrehranaView[]> {
    return this._http.get<PrehranaView[]>(`http://localhost:3000/prehrana?userId=${id}`);
  }

  getUserList(): Observable<UserView[]> {
    return this._http.get<UserView[]>('http://localhost:3000/users');
  }

  addUser(data: UserView): Observable<any> {
    return this._http.post('http://localhost:3000/users', data);
  }

  addNutrition(data: PrehranaView): Observable<any> {
    return this._http.post(`http://localhost:3000/prehrana`, data);
  }

  updateUser(id: number, data: UserView): Observable<any> {
    return this._http.put(`http://localhost:3000/users/${id}`, data);
  }
  
  updateNutrition(id: number, data: PrehranaView): Observable<any> {
    return this._http.put(`http://localhost:3000/prehrana/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }
}
