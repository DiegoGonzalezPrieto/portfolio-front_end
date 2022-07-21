import { Component, Input, OnInit } from '@angular/core';
import {Skill} from 'src/app/shared/models/skill';
import {SkillService} from 'src/app/shared/services/skill.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  profileId = 1;
  userId = this.userServ.userId;
  loggedIn = this.userServ.loggedIn;
  canEdit = false;

  skillList : Skill[] = [];
  editingList : number[] = [];
  addForm = false;

  constructor(private skillServ: SkillService,
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
	  this.getAllSkill();
  }
  // --- CRUD ---

	// GET all - called OnInit
  public getAllSkill(): void{
	  this.skillServ
	  .getSkillByPersonId(this.profileId)
	  .subscribe((skillList : Skill[]) =>{
		  this.skillList = skillList;
	  })
  }
	// POST - called from form
  public newSkill(skill: Skill, personId: number): void {
	  this.skillServ
	  .addSkill(skill, personId)
	  .subscribe(s => {
		  this.skillList.push(s);
		  this.toggleAddForm();
  	  })
  }

  // PUT - called from 
  editSkill(skill: Skill, id: number){
	  const index = this.skillList.findIndex(skill => {return skill.id == id})
	  this.skillServ.modifySkillById(skill, id)
	  .subscribe(s =>{
		  this.skillList.splice(index, 1, s)
		  this.toggleEditForm(id);
	  })
  }

  // DELETE - called from skill-item > delete-button
  public deleteSkill(id: number){
	const index = this.skillList.findIndex(e => {return e.id == id})
	this.skillServ
	.deleteSkillById(id)
	.subscribe( () =>{
		this.skillList.splice(index, 1);
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
