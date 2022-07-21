import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Language} from 'src/app/shared/models/language';
import {LanguageSkill} from 'src/app/shared/models/language-skill';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lang-skill-item',
  templateUrl: './lang-skill-item.component.html',
  styleUrls: ['./lang-skill-item.component.css']
})
export class LangSkillItemComponent implements OnInit {

  editing = false;
  @Input() canEdit: boolean = false;

  loggedIn = this.userServ.loggedIn;

  language = <Language>{
	  id : -1,
	  name : ''
  }

  @Output() onEdit = new EventEmitter<number>();

  @Input() langSkill: LanguageSkill = <LanguageSkill>{
	  id : 0,
	  language : this.language,
	  oralLevel : '',
	  literacyLevel : ''
  }

	  constructor(private userServ : UserService) { }

  ngOnInit(): void {
	  this.language = this.langSkill.language;
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.checkToken();
  }

  levelFormat(level : string): string{
	  switch (level){
		  case "BEGINNER":
			  return "Inicial"
		  case "INTERMEDIATE":
			  return "Intermedio"
		  case "ADVANCED":
			  return "Avanzado"
		  case "BILINGUAL":
			  return "Bilingüe"
		  default:
			  return "";
	  }
  }

  toggleEdit(){
	  this.editing = !this.editing;
	  this.onEdit.emit(this.langSkill.id)
  }



  /* GET by Id (requiere el service)

  public getLanguageSkill(id: number): void{
	  this.langSkillServ
	  .getLanguageSkill(id)
	  .subscribe((langSkill : LanguageSkill) =>{
		  this.langSkillc= langSkill;
		  this.img = langSkill.image;
	  })
  } */


}
