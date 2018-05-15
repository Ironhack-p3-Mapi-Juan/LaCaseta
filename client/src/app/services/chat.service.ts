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
  messages:Array<ChatMessage> = new Array();
  constructor(){
    this.socket = io(environment.BASEURL);
    this.socket.on('chatmessage', this.receiveMessageFromServer.bind(this));
  }

  private receiveMessageFromServer(msg){
    console.log("MESSAGE RECEIVED");
    console.log(msg);
    this.messages.push({text:msg.message, type:'received'});
  }

  sendMessage(msg){
    console.log(`Sending message: ${msg}`)
    this.socket.emit('chatmessage',{message:msg});
    this.messages.push({text:msg, type:'emitted'});
  }
}