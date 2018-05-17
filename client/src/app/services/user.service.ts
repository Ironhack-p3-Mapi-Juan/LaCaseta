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
  buddies: any;
  options: any = { withCredentials: true };
  startDay: Date;
  endDay: Date;
  constructor(private http: Http) {}

  //Obtener Usuario

  getUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/get-user`, this.options)
      .map(res => res.json());
  }

  //Editar perfil Usuario

  editUser(user) {
    return this.http
      .post(`${environment.BASEURL}/api/user/edit`, user, this.options)
      .map(res => res.json());
  }

  //Borrar perfil Usuario

  deleteUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/delete`, this.options)
      .map(res => res.json());
  }

  //Perfil público Canguro

  publicBuddy(idBudy) {
    return this.http
      .get(`${environment.BASEURL}/api/user/buddy/${idBudy}`, this.options)
      .map(res => res.json())
      .map(user => (this.user = user));
  }
  //Perfil privado del usuario

  profileUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/profile`, this.options)
      .map(res => res.json())
      .map(user => (this.user = user));
  }
  getBuddies(pc, startDay, endDay) {
    return this.http
      .post(
        `${environment.BASEURL}/api`,
        { pc, startDay, endDay },
        this.options
      )
      .map(res => {
        return res.json();
      });
  }

  // Guardar favorito
  saveFavourite(idBuddy) {
    return this.http
      .get(`${environment.BASEURL}/api/user/favourit/${idBuddy}`, this.options)
      .map(res => res.json());
  }

  removeFavourite(idBuddy) {
    return this.http.get(`${environment.BASEURL}/api/user/removeFavourit/${idBuddy}`, this.options)
    .map(res => res.json());
  }

  // Obtener favoritos
  getFavourites() {
    return this.http
      .get(`${environment.BASEURL}/api/user/favourit`, this.options)
      .map(res => res.json());
  }

}
