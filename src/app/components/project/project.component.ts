import { Component, OnInit, Input } from '@angular/core';
import {Project} from 'src/app/shared/models/project';
import {ProjectService} from 'src/app/shared/services/project.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  profileId = 1;
  userId = this.userServ.userId;
  loggedIn = this.userServ.loggedIn;
  canEdit = false;

  projectList : Project[] = [];
  editingList : number[] = [];
  addForm = false;

  constructor(private projServ: ProjectService,
			 private userServ: UserService){}

  ngOnInit(): void {
	  this.userServ.user
	  .subscribe(user =>{
		  this.userId = user;
	  })
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
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
	  this.getAllProject();
  }
  // --- CRUD ---

	// GET all - called OnInit
  public getAllProject(): void{
	  this.projServ
	  .getProjectByPersonId(this.profileId)
	  .subscribe((projList : Project[]) =>{
		  this.projectList = projList;
	  })
  }
	// POST - called from form
  public newProject(proj: Project, personId: number): void {
	  this.projServ
	  .addProject(proj, personId)
	  .subscribe(p => {
		  this.projectList.push(p);
		  this.toggleAddForm();
	  },(error) =>{
		  alert("Hubo un error en la solicitud.");
		  this.toggleAddForm();
	  })
  }

  // PUT - called from 
  editProject(p: Project, id: number){
	  const index = this.projectList.findIndex(p => {return p.id == id})
	  this.projServ.modifyProjectById(p, id)
	  .subscribe(proj =>{
		  this.projectList.splice(index, 1, proj)
		  this.toggleEditForm(id);
	  },(error) =>{
		  alert("Hubo un error en la solicitud.");
		  this.toggleEditForm(id);
	  })
  }

  // DELETE - called from proj-item > delete-button
  public deleteProject(id: number){
	const index = this.projectList.findIndex(e => {return e.id == id})
	this.projServ
	.deleteProjectById(id)
	.subscribe( () =>{
		this.projectList.splice(index, 1);
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
