import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { User } from "../Interfaces/user-interface";

@Injectable()
export class UserService {
<<<<<<< HEAD
  user: User;
  options: any = { withCredentials: true };
  constructor(private http: Http) {}

  //Editar perfil Usuario

  editUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/edit`)
      .map(res => res.json())
      .map(user => this.user = user);
=======
user: User;
options: any = {withCredentials: true}
constructor(private http: Http) { }


//Obtener Usuario

getUser() {
  return this.http
      .get(`${environment.BASEURL}/api/user/get-user`, this.options)
      .map(res => res.json());
}

//Editar perfil Usuario

editUser(user) {
  console.log(user)
    return this.http
      .put(`${environment.BASEURL}/api/user/edit`, user, this.options)
      .map(res => res.json());
>>>>>>> 74f382738db3a4cc9e377ba82df07c9f42b4c1bd
  }

  //Borrar perfil Usuario

  deleteUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/delete`, this.options)
<<<<<<< HEAD
      .map(() => this.user = null);
=======
      .map(res => res.json());
>>>>>>> 74f382738db3a4cc9e377ba82df07c9f42b4c1bd
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
