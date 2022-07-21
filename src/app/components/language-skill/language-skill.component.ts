import { Component, Input, OnInit } from '@angular/core';
import {LanguageSkill} from 'src/app/shared/models/language-skill';
import {LangSkillService} from 'src/app/shared/services/lang-skill.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-language-skill',
  templateUrl: './language-skill.component.html',
  styleUrls: ['./language-skill.component.css']
})
export class LanguageSkillComponent implements OnInit {

  profileId = 1;
  userId = this.userServ.userId;
  loggedIn = this.userServ.loggedIn;
  canEdit = false;

  langSkillList : LanguageSkill[] = [];
  editingList : number[] = [];
  addForm = false;

  constructor(private langSkillServ: LangSkillService,
			 private userServ: UserService){}

  ngOnInit(): void {
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.user
	  .subscribe(user =>{
		  this.userId = user;
	  })
	  this.userServ.canEdit
	  .subscribe(edit =>{
		  this.canEdit = edit;
	  })
	  this.userServ.profileId
	  .subscribe(id =>{
		  this.profileId = id;
	  })
	  this.userServ.checkToken();
	  this.getAllLanguageSkill();
  }
  // --- CRUD ---

	// GET all - called OnInit
  public getAllLanguageSkill(): void{
	  this.langSkillServ
	  .getLanguageSkillByPersonId(this.profileId)
	  .subscribe((langSkillList : LanguageSkill[]) =>{
		  this.langSkillList = langSkillList;
	  })
  }
	// POST - called from form
  public newLanguageSkill(langSkill: LanguageSkill, personId: number): void {
	  this.langSkillServ
	  .addLanguageSkill(langSkill, personId)
	  .subscribe(langSkill => {
		  this.langSkillList.push(langSkill);
		  this.toggleAddForm();
  	  })
  }

  // PUT - called from 
  editLanguageSkill(langSkill: LanguageSkill, id: number){
	  const index = this.langSkillList.findIndex(langSkill => {return langSkill.id == id})
	  this.langSkillServ.modifyLanguageSkillById(langSkill, id)
	  .subscribe(lSkill =>{
		  this.langSkillList.splice(index, 1, lSkill)
		  this.toggleEditForm(id);
	  })
  }

  // DELETE - called from langSkill-item > delete-button
  public deleteLanguageSkill(id: number){
	const index = this.langSkillList.findIndex(e => {return e.id == id})
	this.langSkillServ
	.deleteLanguageSkillById(id)
	.subscribe( () =>{
		this.langSkillList.splice(index, 1);
	} );
  }

	// --- end CRUD ---

  toggleAddForm(){
	this.addForm = !this.addForm;
  }

  toggleEditForm(id: number){
	  const i = this.editingList.indexOf(id);
	  if (i != -1){
		  this.editingList.splice(i, 1);
	  } else {
		  this.editingList.push(id);
	  }
  }
}
