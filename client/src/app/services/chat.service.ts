import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';

import {environment} from "../../environments/environment";

interface ChatMessage{
  type:string;
  text:string;
}

@Injectable()
export class ChatService {
  socket:any;
  socketId: string;
  messages:Array<ChatMessage> = new Array();
  constructor(){
    this.socket = io(environment.BASEURL);
    this.socket.on("connect", () => {
      this.socket.on('chatmessage', this.receiveMessageFromServer.bind(this));
    })
  }

  private receiveMessageFromServer(msg){
    console.log("MESSAGE RECEIVED");
    this.messages.push({text:msg.message, type:'received'});
  }

  sendMessage(msg){
    console.log(this.socketId);
    //console.log(`Sending message: ${msg}`)
    this.socket.emit('chatmessage',{message:msg, id:this.socketId});
    this.messages.push({text:msg, type:'emitted'}); 
  }

  setCustomId(id) {
    this.socketId = id;
    console.log(this.socketId);
  }
}