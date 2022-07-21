import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {JwtDto} from '../models/jwt-dto';
import {LoginUser} from '../models/login-user';
import {NewUser} from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	url = 'https://enigmatic-savannah-95548.herokuapp.com/auth/'

	constructor(private http: HttpClient) { }

	public newUser(newUser: NewUser): Observable<any>{
		return this.http.post<any>(this.url + 'new', newUser)
	}

	public login(loginUser: LoginUser): Observable<JwtDto>{
		return this.http.post<JwtDto>(this.url + 'login', loginUser)
	}

}
