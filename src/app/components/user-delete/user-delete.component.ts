import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DeleteUserService} from 'src/app/shared/services/delete-user.service';
import {TokenService} from 'src/app/shared/services/token.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  isLogged = false;
  appUserId = 0;

  constructor(
	  private userServ : UserService,
	  private tokenServ : TokenService,
	  private router : Router,
	  private deleteUserServ : DeleteUserService
  ) { }

  ngOnInit(): void {
	  this.userServ
	  .logged.subscribe(
		  logged =>{
			  this.isLogged = logged;
		  } 
	  )
	  this.userServ.checkToken();
  }

	  deleteUser(){
		  this.appUserId = parseInt(this.tokenServ.getUserId());
		  this.deleteUserServ
		  .deleteUserById(this.appUserId)
		  .subscribe(()=>{
			  console.log("user deleted")
		  });
	  }

	  cancelDelete(){
		  console.log("cancel delete")
		  this.router.navigate(["/perfil/" + this.userServ.userId])
	  }

}
