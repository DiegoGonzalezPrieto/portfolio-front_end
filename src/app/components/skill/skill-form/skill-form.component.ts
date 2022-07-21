import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Skill} from 'src/app/shared/models/skill';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {


  skillForm : FormGroup = new FormGroup({});
  @Output() newSkill = new EventEmitter<Skill>();
  formString = JSON.stringify(this.skillForm.value);

  @Input() isEdit = false;
  @Input() editedSkill? : Skill;
  @Output() editClick = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Skill>();


  @Output() onDelete = new EventEmitter<number>();

  runningYear = new Date().getFullYear();	
	
  // form logic and building
  
  // new Skill
  onSubmit(){
	  if (this.isEdit){
		  this.onEdit.emit(this.skillForm.value);
		  this.skillForm.disable();
	  } else {
		  this.newSkill.emit(this.skillForm.value);
		  this.skillForm.disable();
	  }
  }

  deleteSkill(){
  	this.onDelete.emit(this.editedSkill?.id);
	this.skillForm.disable();
  }

  stopEdit(){
	  this.editClick.emit(this.editedSkill?.id);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
	  this.skillForm = this.fb.group({
		  name: ['', Validators.required],
		  type : ['', Validators.required],
		  description : ['', Validators.required],
		  percent : [50, [Validators.required, Validators.min(1)]],
	  })

	  this.skillForm.valueChanges
	  .subscribe(values =>{
		  this.formString = JSON.stringify(values);
	  })

	  if (this.isEdit && this.editedSkill){
		this.skillForm.patchValue(this.editedSkill);
	  }
  }

  get name() {return this.skillForm.get('name')}
  get type() {return this.skillForm.get('type');}
  get description() {return this.skillForm.get('description');}
  get percent() {return this.skillForm.get('percent');}

}

