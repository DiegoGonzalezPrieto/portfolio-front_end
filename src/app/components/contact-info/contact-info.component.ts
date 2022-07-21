import { Component, OnInit } from '@angular/core';
import {ContactInfo} from 'src/app/shared/models/contact-info';
import {ContactInfoService} from 'src/app/shared/services/contact-info.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  adminId = 1; // TODO : define admin id
  userId = this.userServ.userId;
  loggedIn = this.userServ.loggedIn;

  contactInfoList : ContactInfo[] = [];
  editingList : number[] = [];
  addForm = false;

  constructor(private ciServ: ContactInfoService,
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
	  this.userServ.checkToken();
	  this.getAllContactInfo();
  }
  // --- CRUD ---

	// GET all - called OnInit
  public getAllContactInfo(): void{
	  this.ciServ
	  .getContactInfoByPersonId(this.adminId)
	  .subscribe((ciList : ContactInfo[]) =>{
		  this.contactInfoList = ciList;
	  })
  }
	// POST - called from form
  public newContactInfo(ci: ContactInfo, personId: number): void {
	  this.ciServ
	  .addContactInfo(ci, personId)
	  .subscribe(ci => {
		  this.contactInfoList.push(ci);
		  this.toggleAddForm();
  	  })
  }

  // PUT - called from 
  public editContactInfo(ci: ContactInfo, id: number){
	  const index = this.contactInfoList.findIndex(ci => {return ci.id == id})
	  this.ciServ.modifyContactInfoById(ci, id)
	  .subscribe(conInfo =>{
		  this.contactInfoList.splice(index, 1, conInfo)
		  this.toggleEditForm(id);
	  })
  }

  // DELETE - called from ci-item > delete-button
  public deleteContactInfo(id: number){
	const index = this.contactInfoList.findIndex(ci => {return ci.id == id})
	this.ciServ
	.deleteContactInfoById(id)
	.subscribe( () =>{
		this.contactInfoList.splice(index, 1);
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

  getIcon(address : string){
	  switch (address){
		  case "EMAIL":
			  return 'assets/mail-icon.png';
		  case "LINKEDIN":
				return 'assets/linkedin-icon.png'
		  case "GITHUB":
				return 'assets/github-icon.png'
		  case "TWITTER":
				return 'assets/twitter-icon.png'
		  case "MASTODON":
				return 'assets/mastodon-icon.png'
		  case "TELEGRAM":
				return 'assets/telegram-icon.png'
		  default:
			  return '';
	  }
  }
}
