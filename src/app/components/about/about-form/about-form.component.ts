import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from 'src/app/shared/models/city';
import {Image} from 'src/app/shared/models/image';
import {Person} from 'src/app/shared/models/person';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css']
})
export class AboutFormComponent implements OnInit {

  personForm : FormGroup = new FormGroup({});
  formString = JSON.stringify(this.personForm.value);

  @Output() editClick = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Person>();

  @Input() editedPerson = <Person>{
	id: -1,
	firstName: '',
	lastName: '',
	jobTitle: '',
	briefCv: '',
	profPic: <Image>{id: -1, url: '', altText: '', name: ''},
	backPic: <Image>{id: -1, url: '', altText: '', name: ''},
	city: <City>{id: -1, cityName: '', countryName: ''},
	contactInfos: []
  }
  // form logic and building
  
  // only edit logic
  onSubmit(){
		  this.onEdit.emit(this.personForm.value);
		  this.personForm.disable();
  }

  stopEdit(){
	  this.editClick.emit();
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
	  this.personForm = this.fb.group({
		  firstName: ['', Validators.required],
		  lastName : ['', Validators.required],
		  jobTitle : ['', Validators.required],
		  briefCv : ['', Validators.required],
		  city: this.fb.group({
			  cityName: ['', Validators.required],
			  countryName: ['', Validators.required]
		  }),
		  profPic : this.fb.group({
			  name : [''],
			  altText : [''],
			  url : ['']
		  }),
		  backPic : this.fb.group({
			  name : [''],
			  altText : [''],
			  url : ['']
		  })
	  })

	  this.personForm.valueChanges
	  .subscribe(values =>{
		  this.formString = JSON.stringify(values);
	  })

	  this.personForm.patchValue(this.editedPerson);
  }

  get firstName() {return this.personForm.get('firstName')}
  get lastName() {return this.personForm.get('lastName');}
  get jobTitle() {return this.personForm.get('jobTitle');}
  get briefCv() {return this.personForm.get('briefCv');}
  get city() {return this.personForm.get('city');}
  get cityName() {return this.city?.get('cityName');}
  get countryName() {return this.city?.get('countryName');}
  get profPic() {return this.personForm.get('profPic');}
  get backPic() {return this.personForm.get('backPic');}

}

