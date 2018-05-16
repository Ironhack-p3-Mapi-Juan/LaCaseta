import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({ 
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  textbox:string;

  constructor(public chatService:ChatService){ }

  ngOnInit() {
  }

  clickSend(){
    this.chatService.sendMessage(this.textbox);
    this.textbox = "";
  }

}