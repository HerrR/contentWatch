import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-usagetips-category',
  templateUrl: './usagetips-category.component.html'
})
export class UsagetipsCategoryComponent implements OnInit {
  @Input() name: string;
  @Input() selectedCategories: string[];
  @Output() onCategorySelect = new EventEmitter<string>();

  constructor() { }

  isActive(){
    if(this.selectedCategories.indexOf(this.name) == -1){
      return false;
    } else {
      return true;
    }
  }

  onClick(){
    this.onCategorySelect.emit(this.name);
  }

  ngOnInit() {

  }

}
