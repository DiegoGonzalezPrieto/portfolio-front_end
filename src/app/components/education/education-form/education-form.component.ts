import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Education} from 'src/app/shared/models/education';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent implements OnInit {


  educationForm : FormGroup = new FormGroup({});
  @Output() newEducation = new EventEmitter<Education>();
  formString = JSON.stringify(this.educationForm.value);

  @Input() isEdit = false;
  @Input() editedEducation? : Education;
  @Output() editClick = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Education>();


  @Output() onDelete = new EventEmitter<number>();

  runningYear = new Date().getFullYear();	
	
  // form logic and building
  
  // new Education
  onSubmit(){
	  if (this.isEdit){
		  this.onEdit.emit(this.educationForm.value);
		  this.educationForm.disable();
	  } else {
		  this.newEducation.emit(this.educationForm.value);
		  this.educationForm.disable();
	  }
  }

  deleteEducation(){
  	this.onDelete.emit(this.editedEducation?.id);
	this.educationForm.disable();
  }

  stopEdit(){
	  this.editClick.emit(this.editedEducation?.id);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
	  this.educationForm = this.fb.group({
		  title: ['', Validators.required],
		  institution : ['', Validators.required],
		  startYear : [null, [
			  Validators.pattern('[0-9]{4}'),
			  Validators.required,
			  Validators.min(this.runningYear - 70)
		  ]],
		  endYear : [this.runningYear, [
			  Validators.pattern('[0-9]{4}'),
			  Validators.min(this.runningYear - 70),
			  Validators.max(this.runningYear + 10)
		  ]],
		  current : [false],
		  level : ['', Validators.required],
		  image : this.fb.group({
			  name : [''],
			  altText : [''],
			  url : ['']
		  })
	  }, {validators: checkYears})

	  this.educationForm.valueChanges
	  .subscribe(values =>{
		  this.formString = JSON.stringify(values);
	  })

	  if (this.isEdit && this.editedEducation){
		this.educationForm.patchValue(this.editedEducation);
		this.onCheck();
	  }
  }

  get title() {return this.educationForm.get('title')}
  get institution() {return this.educationForm.get('institution');}
  get startYear() {return this.educationForm.get('startYear');}
  get endYear() {return this.educationForm.get('endYear');}
  get current() {return this.educationForm.get('current');}
  get level() {return this.educationForm.get('level');}


  onCheck(){
	  if (this.current?.value === true){
		  this.endYear?.setValidators([Validators.nullValidator]);
		  this.endYear?.setValue(null);
		  this.endYear?.disable();
		  this.educationForm.setValidators([Validators.nullValidator])
	  } else if (this.current?.value === false) {
		  this.endYear?.setValidators([
			  Validators.pattern('[0-9]{4}'),
			  Validators.min(this.runningYear - 70),
			  Validators.max(this.runningYear + 10)
		  ]);
		  this.endYear?.enable();
		  this.endYear?.setValue(this.runningYear);
		  this.educationForm.setValidators([checkYears])
	  }
	  this.endYear?.updateValueAndValidity();
  }


}

// start and end year check
export const checkYears: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startYear = control.get('startYear');
  const endYear = control.get('endYear');

  return startYear && endYear && startYear.value > endYear.value ? { badYears: true } : null;
}
