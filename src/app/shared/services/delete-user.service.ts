import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

	url = 'https://enigmatic-savannah-95548.herokuapp.com/user'

	constructor(
		private http : HttpClient
	) { }

	deleteUserById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);


	}
}
