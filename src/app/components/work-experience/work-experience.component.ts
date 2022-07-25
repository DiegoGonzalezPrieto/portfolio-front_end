import { Component, Input, OnInit } from '@angular/core';
import {WorkExperience} from 'src/app/shared/models/work-experience';
import {UserService} from 'src/app/shared/services/user.service';
import {WorkExperienceService} from 'src/app/shared/services/work-experience.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {

  profileId = 1;
  userId = this.userServ.userId;
  loggedIn = this.userServ.loggedIn;
  canEdit = false;

  workExpList : WorkExperience[] = [];
  editingList : number[] = [];

  addForm = false;
  editForm= false;

  constructor(private wexpServ: WorkExperienceService,
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
	  this.getAllWorkExperience();
  }
  // --- CRUD ---

	// GET all - called OnInit
  public getAllWorkExperience(): void{
	  this.
	  wexpServ.getWorkExperienceByPersonId(this.profileId)
	  .subscribe((workExpList : WorkExperience[]) =>{
		  this.workExpList = workExpList;
	  })
  }

	// POST - called from form
  public newWorkExperience(we: WorkExperience, personId: number): void {
	  this.wexpServ
	  .addWorkExperience(we, personId)
	  .subscribe(workE => {
		  this.workExpList.push(workE);
		  this.toggleAddForm();
	  },(error) =>{
		  alert("Hubo un error en la solicitud.");
		  this.toggleAddForm();
	  })
  }

  // PUT - called from 
  editWorkExperience(we: WorkExperience, id: number){
	  const index = this.workExpList.findIndex(we => {return we.id == id})
	  this.wexpServ.modifyWorkExperienceById(we, id)
	  .subscribe(workE =>{
		  this.workExpList.splice(index, 1, workE)
		  this.toggleEditForm(id);
	  },(error) =>{
		  alert("Hubo un error en la carga de información.");
		  this.toggleEditForm(id);
	  })
  }

  // DELETE - called from edu-item > delete-button
  public deleteWorkExperience(id: number){
	const index = this.workExpList.findIndex(we => {return we.id == id})
	this.wexpServ
	.deleteWorkExperienceById(id)
	.subscribe( () =>{
		this.workExpList.splice(index, 1);
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
