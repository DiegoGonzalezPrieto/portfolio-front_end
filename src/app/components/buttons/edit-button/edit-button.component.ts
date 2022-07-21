import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent implements OnInit {

  @Output() editClick = new EventEmitter<boolean>();

  @Input() editForm = false;
  @Input() isDisabled = false;

  editItem(){
	  this.editClick.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
