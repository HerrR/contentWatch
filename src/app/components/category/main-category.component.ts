import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navMainCategory, navEntries } from '../../dataTypes/navData';
import { QueryParams } from '../../dataTypes/queryParams';
import { solutionData, solutionDataWithProblemID } from '../../dataTypes/solutionData';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html'
})

export class MainCategoryComponent implements OnInit {
  @Input() category: navEntries;
  @Input() activeCategoryUUID: string;
  @Input() mostRecentQuery: QueryParams;

  @Output() onCategorySelect = new EventEmitter<string[]>();
  solutions: solutionData[];

  constructor() {}

  categorySelected(event){
    this.onCategorySelect.emit(event);
  }

  selectThisCategory() {
    let categoryIDs = [];
    for(let i in this.category.entry.problems){
      categoryIDs.push(this.category.entry.problems[i].uuid);
      // console.log(this.category.entry.problems[i]);
    }
    this.onCategorySelect.emit(categoryIDs);
    // console.log(this.category.entry);
  }

  ngOnInit() { }
}
