import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginUser} from 'src/app/shared/models/login-user';
import {AuthService} from 'src/app/shared/services/auth.service';
import {TokenService} from 'src/app/shared/services/token.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isLogged = false;
	isLoginFail = false;
	loginUser?: LoginUser;
	roles? : string[];
	errMsg?: string;

	loginForm : FormGroup = new FormGroup({});


  constructor(
	  private authService: AuthService,
  	  private tokenService: TokenService,
	  private fb : FormBuilder,
	  private router: Router,
	  private userServ : UserService
  ) { }

  ngOnInit(): void {
	  if (this.tokenService.getToken()){
		  this.isLogged = true;
		  this.isLoginFail = false;
		  this.roles = this.tokenService.getAuthorities();
	  }

	  this.loginForm = this.fb.group({
		  userName: ['', Validators.required],
		  password: ['', Validators.required]
	  })
  }

  onLogin(): void {
	  this.isLoginFail = false;
	  this.loginForm.disable();
	  this.loginUser = new LoginUser(
		  this.userName?.value, 
		  this.password?.value
	  );
	  this.authService.login(this.loginUser)
	  .subscribe(data =>{
		  this.isLogged = true;
		  this.isLoginFail = false;

		  this.tokenService.setToken(data.token);
		  this.tokenService.setUserName(data.userName);
		  this.tokenService.setAuthorities(data.authorities);
		  this.tokenService.setPersonId(data.personId);
		  this.tokenService.setUserId(data.userId);
		  this.roles = data.authorities;
		  this.userServ.checkToken();
		  this.router.navigate(['perfil/' + this.userServ.userId + "/ver"]);
		  //window.location.reload();
	  },
	  err =>{
		  this.isLogged = false;
		  this.isLoginFail = true;
		  this.errMsg = err;
		  this.loginForm.reset();
		  this.loginForm.enable();
	  })
	  this.userServ.checkToken();

  }

  get userName() { return this.loginForm.get('userName') }
  get password() { return this.loginForm.get('password') }

}
