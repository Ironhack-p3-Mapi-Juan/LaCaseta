import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { User } from "../Interfaces/user-interface"

@Injectable()
export class UserService {
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
      .get(`${environment.BASEURL}/api/user/buddy/${idBudy}`)
      .map(res => res.json());
  }
  //Perfil privado del usuario
  
  profileUser() {
    console.log("Hola")
    return this.http
      .get(`${environment.BASEURL}/api/user/profile`, this.options)
      .map(res => {
        console.log('jjj')
        return res.json()
      })
       .map(user => {
         console.log(user)
       this.user = user
        return user
      });   
  }

}
