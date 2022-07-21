import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-del-button',
  templateUrl: './del-button.component.html',
  styleUrls: ['./del-button.component.css']
})
export class DelButtonComponent implements OnInit {

  @Output() deleteItem = new EventEmitter<unknown>();
  enabled = true;

  onDelete(){
	  this.deleteItem.emit();
	  this.enabled = false;

  }

  constructor() { }

  ngOnInit(): void {
  }

}
