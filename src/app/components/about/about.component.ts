import { Component, Input, OnInit } from '@angular/core';
import {City} from 'src/app/shared/models/city';
import {Image} from 'src/app/shared/models/image';
import {Person} from 'src/app/shared/models/person';
import {PersonService} from 'src/app/shared/services/person.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() profileId = 1;
  userId = this.userServ.userId;
  loggedIn = false;
  canEdit : boolean = false;

  personString = '';
  @Input() editing = false;

  person = <Person>{
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

  defaultImg = "https://media.istockphoto.com/vectors/error-document-icon-vector-id1060550172?k=6&m=1060550172&s=612x612&w=0&h=gdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs="

  constructor(private perServ: PersonService,
			 private userServ: UserService) { }

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
	  this.userServ.checkToken();



	  this.getPerson();
  }

  toggleEdit(){
	  this.editing = !this.editing;
  }

  // GET person By UserID
  public getPerson(): void{
	  this.perServ
	  .getPerson(this.profileId) 
	  .subscribe((p : Person) =>{
		  this.person = p;
		  this.personString = JSON.stringify(p);
	  })
  }

  //POST - called by UserComponent ?
  public newPerson(p: Person): void {
	  this.perServ
	  .addPerson(p)
	  .subscribe(pers =>{
		  this.person = pers;
	  } )
  }

  // PUT
  public editPerson(p : Person, id: number): void {
	this.perServ.modifyPersonById(p, id)
	.subscribe(pers =>{
		this.person = pers;
		this.toggleEdit();
	})
  }


  // DELETE (!) not necessary?
  // In case profile is deleted, from UserComponent?

}
