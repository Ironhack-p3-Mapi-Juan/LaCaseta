import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-public-budy',
  templateUrl: './public-budy.component.html',
  styleUrls: ['./public-budy.component.scss']
})
export class PublicBudyComponent implements OnInit {
idBuddy: string
buddy: any
  constructor(
    public router: Router,
    public userService: UserService,
    public sessionService: SessionService,
    public route: ActivatedRoute
  ) { }
  ngOnInit() {

    this.route.params
      .subscribe((params) => {
        this.idBuddy = String(params['id'])
        this.publicProfile(this.idBuddy)
  })
}

publicProfile(idBuddy){
  this.idBuddy = this.idBuddy
  this.userService.publicBuddy(idBuddy).subscribe(buddy => {
    this.buddy = buddy;
    this.router.navigate(["/publicBuddy", idBuddy]);
  });
}

}

