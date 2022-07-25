import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {TokenService} from 'src/app/shared/services/token.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	adminId = 1; 
	profileId = 0;
	loggedIn = this.userServ.loggedIn;
	userId = this.userServ.userId;

	constructor(
		private tokenSerice: TokenService,
		private router: Router,
	private userServ: UserService) { }

	ngOnInit(): void {
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.user
	  .subscribe(user =>{
		  this.userId = user;
	  })
	  this.userServ.checkToken();
	}

	onLogOut(){
		this.tokenSerice.logOut();
		this.userServ.checkToken();
		this.router.navigate(['/login'])
	}

	goToAppInfo(){
		this.router.navigate(['info'])
	}

	// reloading same route by imperceptibly visiting /info route
	goToProfile(id :number | null){
		if (!id){
			this.router.navigateByUrl('/info', { skipLocationChange: true }).then(() => {
				if (this.loggedIn){
					this.router.navigate(['perfil/' + this.userId + '/ver']);
				} else {
					this.router.navigate(['/login']);
				}
			});
		} else {
			this.router.navigateByUrl('/info', { skipLocationChange: true }).then(() => {
				this.router.navigate(['perfil/' + id + "/ver"])})
		}
	}

	goToDeleteUser(){
		this.router.navigate(["borrar"])
	}
}
