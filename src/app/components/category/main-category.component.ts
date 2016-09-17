import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navMainCategory } from '../../dataTypes/navData';


@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})

export class MainCategoryComponent implements OnInit {
  @Input() category: navMainCategory; 
  @Output() onCategorySelect = new EventEmitter<string[]>();

  constructor() {  }

  categorySelected(event){
    console.log("Recieved event in main-category component: ",event);
    this.onCategorySelect.emit(event);
  }

  ngOnInit() {
    // console.log(this.category);
  }

}
