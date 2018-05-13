import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class SessionService {

  user:any;
  userEvent: EventEmitter<any> = new EventEmitter();
  options: any = { withCredentials:true };

  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
    /*if(this.user){
    console.log(this.user)
    }else{
      console.log(this.user)
    }  */
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  handleUser(user?:object){
    this.user = user;
    this.userEvent.emit(this.user);
    return this.user;
  }

  signup(user) {
    return this.http.post(`${environment.BASEURL}/api/auth/signup`, user, this.options)
      .map(res => res.json())
      .map(user => this.user = user)
      .catch(this.handleError);
  }

  login(user) {  
    return this.http.post(`${environment.BASEURL}/api/auth/login`, user, this.options)
      .map(res => res.json())
      .map(user => this.user = user)
      .catch(this.handleError);
  }

  logout() {
    return this.http.get(`${environment.BASEURL}/api/auth/logout`,this.options)
      .map(() => this.user = null)
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${environment.BASEURL}/api/auth/loggedin`, this.options)
      .map(res => res.json())
      .map(user => {
        console.log (user)
        return this.handleUser(user)
      })
      .catch(this.handleError);
  }

}