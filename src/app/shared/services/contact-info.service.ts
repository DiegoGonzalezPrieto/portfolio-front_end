import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ContactInfo} from '../models/contact-info';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
	url = 'http://localhost:8080/cInfo'

	constructor (private http : HttpClient){}
	
	// POST
	addContactInfo(ci: ContactInfo, personId: number): Observable<ContactInfo>{
		const options = {params: new HttpParams().set('id', personId)}
		return this.http.post<ContactInfo>(
			this.url + '/person', ci, options)
// error: .pipe(catchError(this.handleError('addContactInfo', ci)))
	}

	// GET by id
	getContactInfo(id: number): Observable<ContactInfo>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<ContactInfo>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllContactInfo(): Observable<ContactInfo[]>{
		return this.http.get<ContactInfo[]>(this.url + '/get/all')
	}

	// GET by PersonID
	getContactInfoByPersonId(id: number): Observable<ContactInfo[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<ContactInfo[]>(this.url + '/person', options);
	}

	// DELETE by ID
	deleteContactInfoById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifyContactInfoById(ci : ContactInfo, id: number){
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<ContactInfo>(this.url + "/edit", ci, options)
		// TODO : handle errors
	}
}
