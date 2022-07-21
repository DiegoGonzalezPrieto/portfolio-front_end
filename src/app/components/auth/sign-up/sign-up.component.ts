import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginUser} from 'src/app/shared/models/login-user';
import {NewUser} from 'src/app/shared/models/new-user';
import {AuthService} from 'src/app/shared/services/auth.service';
import {TokenService} from 'src/app/shared/services/token.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	isLogged : boolean = this.userServ.loggedIn;
	isSignUpFail = false;
	newUser: NewUser = <NewUser>{
		name: '',
		userName: '',
		password: '',
		email: '',
		authorities: []
	}

	errMsg?: string;
	message = '';

	signupForm : FormGroup = new FormGroup({});


  constructor(
	  private authService: AuthService,
	  private fb : FormBuilder,
	  private router: Router,
	  private userServ : UserService
  ) { }

  ngOnInit(): void {
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.isLogged = logged;
	  })
	  this.userServ.checkToken();
  

  this.signupForm = this.fb.group({
	  name: ['', Validators.required],
	  userName: ['', Validators.required],
	  password: ['', Validators.required],
	  email: ['', [Validators.required, Validators.email]]
  })
}

  onSignUp(): void {
	this.isSignUpFail = false;
	this.signupForm.disable();
	this.newUser = this.signupForm.value;
	this.authService.newUser(this.newUser)
	.subscribe(data =>{
		this.isSignUpFail = false;
		this.router.navigate(['/login']);
		this.message = data;
	},
	err =>{
		this.isSignUpFail = true;
		this.errMsg = err;
		this.signupForm.reset();
		this.signupForm.enable();

	  })
	  this.userServ.checkToken();

  }

  get name() { return this.signupForm.get('name') }
  get userName() { return this.signupForm.get('userName') }
  get password() { return this.signupForm.get('password') }
  get email() { return this.signupForm.get('email') }

}
