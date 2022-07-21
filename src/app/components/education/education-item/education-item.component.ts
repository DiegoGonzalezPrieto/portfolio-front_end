import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Education} from 'src/app/shared/models/education';
import {Image} from 'src/app/shared/models/image';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})

export class EducationItemComponent implements OnInit {

  img: Image = <Image>{id: -1, url: '', altText: '', name: ''};
  editing = false;
  @Input() canEdit: boolean = false;
  @Input() userId: number = 0;

  loggedIn = this.userServ.loggedIn;

  @Output() onEdit = new EventEmitter<number>();

  @Input() education: Education = <Education>{
	  										image: this.img,
											current: false,
											endYear: 1000,
											startYear: 1000,
											institution: '',
											level: '',
											title: '',
											id: -1};

  constructor(private userServ : UserService) { }

  ngOnInit(): void {
	  this.img = this.education.image;
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.checkToken();
  }

  levelFormat(level : string): string{
	  switch (level){
		  case "HIGH_SCHOOL":
			  return "Educación Secundaria"
		  case "COURSE":
			  return "Curso"
		  case "UNIVERSITY":
			  return "Carrera de Grado"
		  case "MASTER":
			  return "Carrera de Posgrado"
		  default:
			  return "";
		  	
	  }
  }

  toggleEdit(){
	  this.editing = !this.editing;
	  this.onEdit.emit(this.education.id)
  }



  /* GET by Id (requiere el service)

  public getEducation(id: number): void{
	  this.eduServ
	  .getEducation(id)
	  .subscribe((edu : Education) =>{
		  this.education = edu;
		  this.img = edu.image;
	  })
  } */


}
