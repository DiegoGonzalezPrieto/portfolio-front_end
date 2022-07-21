import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {WorkExperience} from 'src/app/shared/models/work-experience';
import {Image} from 'src/app/shared/models/image';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-work-exp-item',
  templateUrl: './work-exp-item.component.html',
  styleUrls: ['./work-exp-item.component.css']
})
export class WorkExpItemComponent implements OnInit {

  img: Image = <Image>{id: -1, url: '', altText: '', name: ''}
  editing = false;
  @Input() canEdit: boolean = false;

  loggedIn = this.userServ.loggedIn;

  @Output() onEdit = new EventEmitter<number>();

  @Input() workExp: WorkExperience = <WorkExperience>{
	  										companyLogo: this.img,
											current: false,
											startYear: 1000,
											endYear: 1000,
											company: '',
											level: '',
											jobTitle: '',
											description: '',
											type: '',
											id: -1};

  constructor(private userServ : UserService) { }

  ngOnInit(): void {
	  this.img = this.workExp.companyLogo;
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.checkToken();
  }

  typeFormat(type : string): string{
	  switch (type){
		  // TODO
		  case "FULL_TIME":
			  return "Full-time"
		  case "PART_TIME":
			  return "Part-time"
		  case "FREELANCE":
			  return "Freelance"
		  default:
			  return "";
		  	
	  }
  }

  toggleEdit(){
	  this.editing = !this.editing;
	  this.onEdit.emit(this.workExp.id)
  }



  /* GET by Id (requiere el service)

  public getWorkExperience(id: number): void{
	  this.eduServ
	  .getWorkExperience(id)
	  .subscribe((edu : WorkExperience) =>{
		  this.workExp = edu;
		  this.img = edu.image;
	  })
  } */


}
