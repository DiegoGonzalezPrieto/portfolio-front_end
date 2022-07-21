import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

	@Input() loggedIn = false;
	@Output() onLogOut = new EventEmitter<boolean>();

  constructor(
	  private router : Router
			 ) { }

  ngOnInit(): void {
  }

  login(){
	  if (!this.loggedIn){
		this.router.navigate(['/login'])
	  } else if (this.loggedIn){
		this.onLogOut.emit();
	  }
  }

}
