import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	loggedIn = false;

  constructor(private userServ: UserService) { }

  ngOnInit(): void {

	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.checkToken();
  }

}
