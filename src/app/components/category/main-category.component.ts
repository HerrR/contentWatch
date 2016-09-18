import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navMainCategory } from '../../dataTypes/navData';
import { QueryParams } from '../../dataTypes/queryParams';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})

export class MainCategoryComponent implements OnInit {
  @Input() category: navMainCategory;
  @Input() activeCategoryUUID: string;
  @Input() mostRecentQuery: QueryParams;

  @Output() onCategorySelect = new EventEmitter<string[]>();

  constructor() {  }

  categorySelected(event){
    this.onCategorySelect.emit(event);
  }

  ngOnInit() { }
}
