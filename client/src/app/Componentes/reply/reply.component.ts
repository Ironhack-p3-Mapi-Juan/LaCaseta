import { environment } from "../../../environments/environment";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { SessionService } from "../../services/session.service";
import { Reply } from "../../Interfaces/reply-interface";
import { ReplysService } from "../../services/replys.service";

@Component({
  selector: "app-reply",
  templateUrl: "./reply.component.html",
  styleUrls: ["./reply.component.scss"]
})
export class ReplyComponent implements OnInit {
  reply: Reply;
  @Input() buddy;
  replyArray = [];
  formReply = {
    content: ""
  };
  constructor(
    public router: Router,
    public userService: UserService,
    public replyService: ReplysService,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.getReply(this.buddy);
  }
  newReply(userTo, comment) {
    this.replyService
      .newReply(userTo, this.formReply)
      .subscribe(replies => {
        this.formReply.content = "";
        this.replyArray = replies;
      });
  }
  getReply(userTo) {
    this.replyService.getReply(userTo._id).subscribe(replys => {
      this.replyArray = replys;
    });
  }
}
