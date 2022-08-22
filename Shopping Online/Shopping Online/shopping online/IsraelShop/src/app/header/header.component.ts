import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { User } from '../../model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:string = "";
  displayHelloGuest:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userData.subscribe( user => {
      this.displayHelloGuest = true;
      this.username = user.name + " " + user.lastname;
    });
  }

}
