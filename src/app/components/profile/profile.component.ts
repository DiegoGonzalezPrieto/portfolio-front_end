import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profileId = 1;
	complete = true;

	constructor(
		private route : ActivatedRoute,
		private userServ : UserService
	) { }

  ngOnInit(): void {
	  this.route.params
	  .subscribe( params =>{
		  if (! isNaN(parseInt(params['id']))) {
			  this.profileId = params['id'];
			  this.userServ.profileId.next(this.profileId);
			  this.userServ.setProfId(this.profileId);
		  } else {
			  this.profileId = 1;
		  }
	  })
  }

}
