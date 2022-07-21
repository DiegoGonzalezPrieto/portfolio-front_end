import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(
		private tokenService: TokenService,
	) { }

  private _userId = 1; 
  private _loggedIn = true;
  private _profileId = 1;

  logged = new Subject<boolean>();
  user = new Subject<number>();
  profileId = new Subject<number>();
  canEdit = new Subject<boolean>();

  get userId(){
	  return this._userId;
  }
  get loggedIn(){
	  return this._loggedIn;
  }
  get profId(){
	  return this._profileId;
  }
  setProfId(id: number){
	  this._profileId = id;
  }

  // user and logged Subjects
  checkToken(){
	  if (this.tokenService.getToken()){
		  this.logged.next(true)
		  this.user.next(parseInt(this.tokenService.getPersonId()));
		  this._userId = parseInt(this.tokenService.getPersonId());
	  } else {
		  this.logged.next(false);
	  }
	  this.sendRouteId();
	  this.checkCanEdit();

  }

  // profileId Subject (updated from ProfileComponent)
  sendRouteId(){
	this.profileId.next(this.profId);
  }

  // canEdit Subject checked on checkToken
  checkCanEdit(){
	// compare profileId with userId
	  if (this.profId == this.userId){
		this.canEdit.next(true);
	  } else {
		  this.canEdit.next(false);
	  }
  }

}
