import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from '../model/User';
import { Res } from '../model/Res';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user:User): Observable<Res>{
    return this.http.post<Res>('http://localhost:3000/api/createuser', user)
  }

}
