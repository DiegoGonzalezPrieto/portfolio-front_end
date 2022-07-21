import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

	url = 'http://localhost:8080/person'

	constructor (private http : HttpClient){}
	
	// POST
	addPerson(p: Person): Observable<Person>{
		return this.http.post<Person>(
			this.url + 'create', p)
// error: .pipe(catchError(this.handleError('addPerson', p)))
	}

	// GET by id
	getPerson(id: number): Observable<Person>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Person>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllPerson(): Observable<Person[]>{
		return this.http.get<Person[]>(this.url + '/get/all')
	}
/*
TODO : GET by UserID

	getPersonByPersonId(id: number): Observable<Person[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Person[]>(this.url + '/person', options);
	}
*/
	// DELETE by ID
	deletePersonById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifyPersonById(p : Person, id: number){
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<Person>(this.url + "/edit", p, options)
		// TODO : handle errors
	}
}
