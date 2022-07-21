import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LanguageSkill} from 'src/app/shared/models/language-skill';

@Component({
  selector: 'app-lang-skill-form',
  templateUrl: './lang-skill-form.component.html',
  styleUrls: ['./lang-skill-form.component.css']
})
export class LangSkillFormComponent implements OnInit {


  langSkillForm : FormGroup = new FormGroup({});
  @Output() newLanguageSkill = new EventEmitter<LanguageSkill>();
  formString = JSON.stringify(this.langSkillForm.value);

  @Input() isEdit = false;
  @Input() editedLanguageSkill? : LanguageSkill;
  @Output() editClick = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<LanguageSkill>();


  @Output() onDelete = new EventEmitter<number>();
	
  // form logic and building
  
  // new LanguageSkill
  onSubmit(){
		  const ls = this.langSkillObjectMapping(this.langSkillForm)
	  if (this.isEdit){
		  this.onEdit.emit(ls);
		  this.langSkillForm.disable();
	  } else {
		  this.newLanguageSkill.emit(ls);
		  this.langSkillForm.disable();
	  }
  }


  deleteLanguageSkill(){
  	this.onDelete.emit(this.editedLanguageSkill?.id);
	this.langSkillForm.disable();
  }

  stopEdit(){
	  this.editClick.emit(this.editedLanguageSkill?.id);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
	  this.langSkillForm = this.fb.group({
		  name : ['', Validators.required],
		  oralLevel : ['', Validators.required],
		  literacyLevel : ['', Validators.required],
	  })

	  this.langSkillForm.valueChanges
	  .subscribe(values =>{
		  this.formString = JSON.stringify(values);
	  })

	  if (this.isEdit && this.editedLanguageSkill){
		this.langSkillForm.patchValue(this.editedLanguageSkill);
		this.langSkillForm.get('name')?.setValue(this.editedLanguageSkill.language.name)
	  }

  }

  get oralLevel() {return this.langSkillForm.get('oralLevel');}
  get literacyLevel() {return this.langSkillForm.get('literacyLevel');}
  get name() {return this.langSkillForm.get('name');}


  langSkillObjectMapping(form : FormGroup) : LanguageSkill{
	  const values = form.value;
	  const ls = <LanguageSkill>{
		  oralLevel : values.oralLevel,
		  literacyLevel : values.literacyLevel,
		  language : {
			  name : values.name
		  }
	  };
	  return ls;
  }

}
