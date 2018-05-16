import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { Reply } from "../Interfaces/reply-interface";

@Injectable()
export class ReplysService {
  reply: Reply
  
  options: any = { withCredentials: true };

  constructor(private http: Http) {}
  
  //Crear comentario
  
  newReply(userTo, comment) {
      return this.http.post(`${environment.BASEURL}/api/reply/new/${userTo}`, comment, this.options)
      .map(res => res.json())
      .map(reply => this.reply = reply)
    }

    //Mostar comentarios

    getReply(userTo) {
        
        return this.http.get(`${environment.BASEURL}/api/reply/buddy/${userTo}`, this.options)
        .map(res => {return res.json()})
      }
}
