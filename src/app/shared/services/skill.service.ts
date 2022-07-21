import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { HttpParams } from '@angular/common/http';
import {Skill} from '../models/skill';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
	url = 'http://localhost:8080/skill'

	constructor (private http : HttpClient){}
	
	// POST
	addSkill(skill: Skill, personId: number): Observable<Skill>{
		const options = {params: new HttpParams().set('id', personId)}
		return this.http.post<Skill>(
			this.url + '/person', skill, options)
// error: .pipe(catchError(this.handleError('addSkill', skill)))
	}

	// GET by id
	getSkill(id: number): Observable<Skill>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Skill>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllSkill(): Observable<Skill[]>{
		return this.http.get<Skill[]>(this.url + '/get/all')
	}

	// GET by PersonID
	getSkillByPersonId(id: number): Observable<Skill[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<Skill[]>(this.url + '/person', options);
	}

	// DELETE by ID
	deleteSkillById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifySkillById(skill : Skill, id: number){
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<Skill>(this.url + "/edit", skill, options)
		// TODO : handle errors
	}
}
