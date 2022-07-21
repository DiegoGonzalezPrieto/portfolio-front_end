import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { HttpParams } from '@angular/common/http';
import {WorkExperience} from '../models/work-experience';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
	url = 'http://localhost:8080/wexp'

	constructor (private http : HttpClient){}
	
	// POST
	addWorkExperience(we: WorkExperience, personId: number): Observable<WorkExperience>{
		const options = {params: new HttpParams().set('id', personId)}
		return this.http.post<WorkExperience>(
			this.url + '/person', we, options)
// error: .pipe(catchError(this.handleError('addWorkExperience', edu)))
	}

	// GET id
	getWorkExperience(id: number): Observable<WorkExperience>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<WorkExperience>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllWorkExperience(): Observable<WorkExperience[]>{
		return this.http.get<WorkExperience[]>(this.url + '/get/all')
	}

	// GET by PersonID
	getWorkExperienceByPersonId(id: number): Observable<WorkExperience[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<WorkExperience[]>(this.url + '/person', options);
	}

	// DELETE by ID
	deleteWorkExperienceById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifyWorkExperienceById(edu : WorkExperience, id: number){
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<WorkExperience>(this.url + "/edit", edu, options)
		// TODO : handle errors
	}
}
