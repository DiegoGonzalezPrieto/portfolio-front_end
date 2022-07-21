import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {WorkExperience} from 'src/app/shared/models/work-experience';

@Component({
  selector: 'app-work-exp-form',
  templateUrl: './work-exp-form.component.html',
  styleUrls: ['./work-exp-form.component.css']
})
export class WorkExpFormComponent implements OnInit {

  workExpForm : FormGroup = new FormGroup({});
  @Output() newWorkExperience = new EventEmitter<WorkExperience>();
  formString = JSON.stringify(this.workExpForm.value);

  @Input() isEdit = false;
  @Input() editedWorkExperience? : WorkExperience;
  @Output() editClick = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<WorkExperience>();


  @Output() onDelete = new EventEmitter<number>();

  runningYear = new Date().getFullYear();	
	
  // form logic and building
  
  // new WorkExperience
  onSubmit(){
	  if (this.isEdit){
		  this.onEdit.emit(this.workExpForm.value);
		  this.workExpForm.disable();
	  } else {
		  this.newWorkExperience.emit(this.workExpForm.value);
		  this.workExpForm.disable();
	  }
  }

  deleteWorkExperience(){
  	this.onDelete.emit(this.editedWorkExperience?.id);
	this.workExpForm.disable();
  }

  stopEdit(){
	  this.editClick.emit(this.editedWorkExperience?.id);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
	  this.workExpForm = this.fb.group({
		  jobTitle: ['', Validators.required],
		  company : ['', Validators.required],
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
		  description : ['', Validators.required],
		  type : ['', Validators.required],
		  companyLogo : this.fb.group({
			  name : [''],
			  altText : [''],
			  url : ['']
		  })
	  }, {validators: checkYears})

	  this.workExpForm.valueChanges
	  .subscribe(values =>{
		  this.formString = JSON.stringify(values);
	  })

	  if (this.isEdit && this.editedWorkExperience){
		this.workExpForm.patchValue(this.editedWorkExperience);
		this.onCheck();
	  }
  }

  get jobTitle() {return this.workExpForm.get('jobTitle')}
  get company() {return this.workExpForm.get('company');}
  get startYear() {return this.workExpForm.get('startYear');}
  get endYear() {return this.workExpForm.get('endYear');}
  get current() {return this.workExpForm.get('current');}
  get type() {return this.workExpForm.get('type');}
  get description() {return this.workExpForm.get('description');}


  onCheck(){
	  if (this.current?.value === true){
		  this.endYear?.setValidators([Validators.nullValidator]);
		  this.endYear?.setValue(null);
		  this.endYear?.disable();
		  this.workExpForm.setValidators([Validators.nullValidator])
	  } else if (this.current?.value === false) {
		  this.endYear?.setValidators([
			  Validators.pattern('[0-9]{4}'),
			  Validators.min(this.runningYear - 70),
			  Validators.max(this.runningYear + 10)
		  ]);
		  this.endYear?.enable();
		  this.endYear?.setValue(this.runningYear);
		  this.workExpForm.setValidators([checkYears])
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
