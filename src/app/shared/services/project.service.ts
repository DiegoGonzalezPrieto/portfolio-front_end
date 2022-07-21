import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
	url = 'https://enigmatic-savannah-95548.herokuapp.com/project'

	constructor (private http : HttpClient){}
	
	// POST
	addProject(project: Project, personId: number): Observable<Project>{
		const options = {params: new HttpParams().set('id', personId)}
		return this.http.post<Project>(
			this.url + '/person', project, options)
// error: .pipe(catchError(this.handleError('addProject', project)))
	}

	// GET by id
	getProject(id: number): Observable<Project>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Project>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllProject(): Observable<Project[]>{
		return this.http.get<Project[]>(this.url + '/get/all')
	}

	// GET by PersonID
	getProjectByPersonId(id: number): Observable<Project[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Project[]>(this.url + '/person', options);
	}

	// DELETE by ID
	deleteProjectById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifyProjectById(project : Project, id: number){
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<Project>(this.url + "/edit", project, options)
		// TODO : handle errors
	}
}
