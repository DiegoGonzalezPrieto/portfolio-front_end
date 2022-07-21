import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Image} from 'src/app/shared/models/image';
import {Project} from 'src/app/shared/models/project';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  img: Image = <Image>{id: -1, url: '', altText: '', name: ''}
  editing = false;
  @Input() canEdit: boolean = false;
  @Input() userId: number = 0;

  loggedIn = this.userServ.loggedIn;

  @Output() onEdit = new EventEmitter<number>();

  @Input() project: Project = <Project>{
	  image: this.img,
	  name: '',
	  technologies: [],
	  description: '',
	  repoUrl: '',
	  id: -1
  }

  constructor(private userServ : UserService) { }

  ngOnInit(): void {
	  this.img = this.project.image;
	  this.userServ.logged
	  .subscribe(logged =>{
		  this.loggedIn = logged;
	  })
	  this.userServ.checkToken();
  }

  toggleEdit(){
	  this.editing = !this.editing;
	  this.onEdit.emit(this.project.id)
  }



  /* GET by Id (requiere el service)

  public getProject(id: number): void{
	  this.eduServ
	  .getProject(id)
	  .subscribe((edu : Project) =>{
		  this.project = edu;
		  this.img = edu.image;
	  })
  } */
}
