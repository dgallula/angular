import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, EMPTY, Subject } from 'rxjs';
import { User } from '../model/User';
import { Res } from '../model/Res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new Subject<User>();
  currentUser:User = {
    id: "",
    email: "",
    password: "",
    city: "",
    street: "",
    name: "",
    lastname: "",
    role: 0
  };

  constructor(private http: HttpClient) { }

  login(id:string, password:string): Observable<Res>{
    return this.http.post<Res>('http://localhost:3000/api/auth', {id: id, password: password})
  }

  userIsAuthenticate(): boolean{
    const userData = this.getUserData();
    console.log('userData: ', userData);
    if (userData.id != ""){
      return true
    }
    return false
  }

  saveUserData(userData:User){
    this.currentUser = userData;
    this.userData.next(userData);
  }

  getUserData(): User {
    return this.currentUser;
  }

  userIsAdmin(): boolean{
    const userdata = this.getUserData();
    if (userdata.id != "" && userdata.role === 1){
        return true;
      }
      else{
        return false;
      }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error instanceof ErrorEvent) {
      errorMessage = `Error: ${errorRes.error.message}`;
    } else {
      errorMessage = `Error Code: ${errorRes.status}\nMessage: ${errorRes.message}`;
    }
    window.alert('An error occurred while retrieving the recipes.');
    return throwError(errorMessage);
  }
}
