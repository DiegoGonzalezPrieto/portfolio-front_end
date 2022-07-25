import { Component, Input, OnInit } from '@angular/core';
import {UserService} from 'src/app/shared/services/user.service';
import {Education} from '../../shared/models/education';
import {EducationService} from '../../shared/services/education.service';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  profileId : number = 1;
  userId = this.userServ.userId;
  loggedIn = this.userServ.loggedIn;
  canEdit = false;

  educationList : Education[] = [];
  editingList : number[] = [];
  addForm = false;

  constructor(private eduServ: EducationService,
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
	  this.getAllEducation();
  }
  // --- CRUD ---

	// GET all - called OnInit
  public getAllEducation(): void{
	  this.eduServ
	  .getEducationByPersonId(this.profileId)
	  .subscribe((eduList : Education[]) =>{
		  this.educationList = eduList;
	  })
  }
	// POST - called from form
  public newEducation(edu: Education, personId: number): void {
	  this.eduServ
	  .addEducation(edu, personId)
	  .subscribe(edu => {
		  this.educationList.push(edu);
		  this.toggleAddForm();
	  },(error) =>{
		  alert("Hubo un error en la solicitud.");
		  this.toggleAddForm();
	  })
  }

  // PUT - called from 
  public editEducation(e: Education, id: number){
	  const index = this.educationList.findIndex(e => {return e.id == id})
	  this.eduServ.modifyEducationById(e, id)
	  .subscribe(edu =>{
		  this.educationList.splice(index, 1, edu)
		  this.toggleEditForm(id);
	  },(error) =>{
		  alert("Hubo un error en la solicitud.");
		  this.toggleEditForm(id);
	  })
  }

  // DELETE - called from edu-item > delete-button
  public deleteEducation(id: number){
	const index = this.educationList.findIndex(e => {return e.id == id})
	this.eduServ
	.deleteEducationById(id)
	.subscribe( () =>{
		this.educationList.splice(index, 1);
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
