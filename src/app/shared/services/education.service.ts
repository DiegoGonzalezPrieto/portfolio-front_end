import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { HttpParams } from '@angular/common/http';
import {Education} from '../models/education';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
	url = 'https://enigmatic-savannah-95548.herokuapp.com/edu'

	constructor (private http : HttpClient){}
	
	// POST
	addEducation(edu: Education, personId: number): Observable<Education>{
		const options = {params: new HttpParams().set('id', personId)}
		return this.http.post<Education>(
			this.url + '/person', edu, options)
// error: .pipe(catchError(this.handleError('addEducation', edu)))
	}

	// GET by id
	getEducation(id: number): Observable<Education>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Education>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllEducation(): Observable<Education[]>{
		return this.http.get<Education[]>(this.url + '/get/all')
	}

	// GET by PersonID
	getEducationByPersonId(id: number): Observable<Education[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Education[]>(this.url + '/person', options);
	}

	// DELETE by ID
	deleteEducationById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifyEducationById(edu : Education, id: number){
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<Education>(this.url + "/edit", edu, options)
		// TODO : handle errors
	}
}
