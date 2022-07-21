import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  @Output() addClick = new EventEmitter<boolean>();

  @Input() addForm = false;


  addItem(){
	  this.addClick.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
