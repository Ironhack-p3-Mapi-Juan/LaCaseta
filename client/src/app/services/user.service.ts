import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { User } from "../Interfaces/user-interface"

@Injectable()
export class UserService {
user: User
constructor(private http: Http) { }

//Editar perfil Usuario

editUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/edit`)
      .map(res => res.json());
  }

//Borrar perfil Usuario

deleteUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/delete`)
      .map(res => res.json());
  }

  //Perfil público Canguro

  publicBuddy(idBudy) {
    return this.http
      .get(`${environment.BASEURL}/api/user/buddy/${idBudy}`)
      .map(res => res.json());
  }

}
