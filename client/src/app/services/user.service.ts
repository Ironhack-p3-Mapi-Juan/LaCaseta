import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { User } from "../Interfaces/user-interface";

@Injectable()
export class UserService {
  user: User;
  options: any = { withCredentials: true };
  constructor(private http: Http) {}

  //Editar perfil Usuario

  editUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/edit`)
      .map(res => res.json())
      .map(user => this.user = user);
  }

  //Borrar perfil Usuario

  deleteUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/delete`, this.options)
      .map(() => this.user = null);
  }

  //Perfil público Canguro

  publicBuddy(idBudy) {
    return this.http
      .get(`${environment.BASEURL}/api/user/buddy/${idBudy}`)
      .map(res => res.json())
      .map(user => this.user = user);
  }
  //Perfil privado del usuario

  profileUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/profile`, this.options)
      .map(res => res.json())
      .map(user => (this.user = user));
  }
}
