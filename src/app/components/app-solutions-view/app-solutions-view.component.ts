import { ViewChildren, Component, OnInit, Input } from '@angular/core';
import { solutionData, solutionDataWithProblemID, Solution } from '../../dataTypes/solutionData';
import { StringFilterPipe } from '../../pipes/string-filter.pipe';
//import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';
import { QueryParams } from '../../dataTypes/queryParams';

@Component({
  selector: 'app-solutions-view',
  templateUrl: './app-solutions-view.component.html',
  styleUrls: ['./app-solutions-view.component.css']
})
export class AppSolutionsViewComponent implements OnInit {
  @Input() solutions: Solution[];
  @Input() mostRecentQuery: QueryParams;
  @Input() activeCategoryUUID: string;
  // solutions: solutionDataWithProblemID[];

  solutionCounter = {"displayedSolutions":0};
  solutionSearchQuery: string = "";
  
  constructor() { }  

  solutionsFetched(){
    return (this.solutions == undefined) ? false : true;
  }

  ngOnInit() {
  }
}