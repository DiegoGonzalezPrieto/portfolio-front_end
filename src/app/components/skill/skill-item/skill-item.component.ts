import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Skill} from 'src/app/shared/models/skill';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {
  
  editing = false;
  @Input() canEdit: boolean = false;

  loggedIn = this.userServ.loggedIn;

  @Output() onEdit = new EventEmitter<number>();

  @Input() skill: Skill = <Skill>{
	  id: -1,
	  name : '',
	  description: '',
	  percent : 100 
  };

  strokeArray = '';

  constructor(private userServ : UserService) { }

  ngOnInit(): void {
	  
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })

	  this.userServ.checkToken();
	  this.strokeArray = `${this.skill.percent * 2} ${200 - (this.skill.percent *2)}`
  }

  toggleEdit(){
	  this.editing = !this.editing;
	  this.onEdit.emit(this.skill.id)
  }



  /* GET by Id (requiere el service)

  public getSkill(id: number): void{
	  this.eduServ
	  .getSkill(id)
	  .subscribe((edu : Skill) =>{
		  this.skill = edu;
		  this.img = edu.image;
	  })
  } */


}
