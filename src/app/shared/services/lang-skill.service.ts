import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LanguageSkill} from '../models/language-skill';

@Injectable({
  providedIn: 'root'
})
export class LangSkillService {

	url = 'http://localhost:8080/lSkill'

	constructor (private http : HttpClient){}
	
	// POST
	addLanguageSkill(langSkill: LanguageSkill, personId: number): Observable<LanguageSkill>{
		const options = {params: new HttpParams().set('id', personId)}
		return this.http.post<LanguageSkill>(
			this.url + '/person', langSkill, options)
// error: .pipe(catchError(this.handleError('addLanguageSkill', langSkill)))
	}

	// GET by id
	getLanguageSkill(id: number): Observable<LanguageSkill>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<LanguageSkill>(this.url + '/get', options);
		
		// TODO : handle errors >> https://angular.io/guide/http#handling-request-errors
	}

	// GET ALL
	getAllLanguageSkill(): Observable<LanguageSkill[]>{
		return this.http.get<LanguageSkill[]>(this.url + '/get/all')
	}

	// GET by PersonID
	getLanguageSkillByPersonId(id: number): Observable<LanguageSkill[]>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.get<LanguageSkill[]>(this.url + '/person', options);
	}

	// DELETE by ID
	deleteLanguageSkillById(id: number): Observable<unknown>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.delete(this.url + '/delete', options);
		// TODO : handle errors
	}

	// PUT by ID
	modifyLanguageSkillById(langSkill : LanguageSkill, id: number): Observable<LanguageSkill>{
		const options = {params: new HttpParams().set('id', id)};
		return this.http.put<LanguageSkill>(this.url + "/edit", langSkill, options)
		// TODO : handle errors
	}
}
