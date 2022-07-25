import { Injectable } from '@angular/core';
import {UserService} from './user.service';

	const TOKEN_KEY = 'AuthToken';
	const USERNAME_KEY = 'AuthUserName';
	const AUTHORITIES_KEY = 'AuthAuthorities';
	const PERSONID_KEY = 'AuthPersonId';
	const USERID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

	roles : Array<string> = [];


	constructor() { }

  public setToken(token: string): void{
	  window.sessionStorage.removeItem(TOKEN_KEY);
	  window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null{
	  return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void{
	  window.sessionStorage.removeItem(USERNAME_KEY);
	  window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
	  const data = sessionStorage.getItem(USERNAME_KEY);
	  if (data) {
		  return data;
	  } else {return ""}
  }

  public setAuthorities(authorities: string[]): void{
	  window.sessionStorage.removeItem(AUTHORITIES_KEY);
	  window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
	  const data = sessionStorage.getItem(AUTHORITIES_KEY);
	  this.roles = [];
	  if (data){
		  JSON.parse(data).forEach((authority: any) =>{
			  this.roles.push(authority.authority)
		  })
	  }
	  return this.roles;
  }

  public setPersonId(personId: string): void{
	  window.sessionStorage.removeItem(PERSONID_KEY);
	  window.sessionStorage.setItem(PERSONID_KEY, personId);
  }

  public getPersonId(): string {
	  const data = sessionStorage.getItem(PERSONID_KEY);
	  if (data) {
		  return data;
	  } else {return ""}
  }

  public setUserId(userId: string): void{
	  window.sessionStorage.removeItem(USERID_KEY);
	  window.sessionStorage.setItem(USERID_KEY, userId);
  }

  public getUserId(): string{
	  const data = sessionStorage.getItem(USERID_KEY);
	  if (data){
		  return data;
	  } else {
		  return "";
	  }
  }

  public logOut(): void{
	window.sessionStorage.clear();
  }
}
