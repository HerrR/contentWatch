import { ViewChildren, Component, OnInit, Input } from '@angular/core';
import { solutionData, solutionDataWithProblemID } from '../../dataTypes/solutionData';
import { StringFilterPipe } from '../../pipes/string-filter.pipe';

@Component({
  selector: 'app-solutions-view',
  templateUrl: './app-solutions-view.component.html',
  styleUrls: ['./app-solutions-view.component.css']
})
export class AppSolutionsViewComponent implements OnInit {
  @Input() solutions: solutionDataWithProblemID;
  solutionCounter = {"displayedSolutions":0};
  
  solutionSearchQuery: string = "";
  
  constructor() { }

  solutionsFetched(){
    return (this.solutions == undefined) ? false : true;
  }

  ngOnInit() {
    
  }

}

