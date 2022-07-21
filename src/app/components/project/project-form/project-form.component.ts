import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm : FormGroup = new FormGroup({});
  @Output() newProject = new EventEmitter<Project>();
  formString = JSON.stringify(this.projectForm.value);

  @Input() isEdit = false;
  @Input() editedProject? : Project;
  @Output() editClick = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Project>();


  @Output() onDelete = new EventEmitter<number>();

  runningYear = new Date().getFullYear();	
	
  // form logic and building
  
  // new Project
  onSubmit(){
	  if (this.isEdit){
		  this.onEdit.emit(this.projectForm.value);
		  this.projectForm.disable();
	  } else {
		  this.newProject.emit(this.projectForm.value);
		  this.projectForm.disable();
	  }
  }

  deleteProject(){
  	this.onDelete.emit(this.editedProject?.id);
	this.projectForm.disable();
  }

  stopEdit(){
	  this.editClick.emit(this.editedProject?.id);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
	  this.projectForm = this.fb.group({
		  name: ['', Validators.required],
		  description : ['', Validators.required],
		  repoUrl : ['', Validators.required],
		  image : this.fb.group({
			  name : [''],
			  altText : [''],
			  url : ['']
		  }),
		  technologies :  this.fb.array([
				  this.fb.control('')
			  ])
	  })

	  this.projectForm.valueChanges
	  .subscribe(values =>{
		  this.formString = JSON.stringify(values);
	  })
	  

	  if (this.isEdit && this.editedProject){

		  this.removeTechnology(0);
		  for (let i = 0; i < this.editedProject.technologies.length; i++){
			  this.addTechnology();
		  }
		  this.projectForm.patchValue(this.editedProject);
	  }
  }

  get name() {return this.projectForm.get('name')}
  get description() {return this.projectForm.get('description');}
  get repoUrl() {return this.projectForm.get('repoUrl');}
  get image() {return this.projectForm.get('image');}
  get technologies() {return this.projectForm.get('technologies') as FormArray;}

  addTechnology(){
	  this.technologies.push(this.fb.control(''));
  }

  removeTechnology(i : number){
	  this.technologies.removeAt(i);
  }
}

