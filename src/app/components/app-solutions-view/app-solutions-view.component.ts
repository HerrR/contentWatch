import { Component, OnInit, Input } from '@angular/core';
import { solutionData, solutionDataWithProblemID } from '../../dataTypes/solutionData';

@Component({
  selector: 'app-solutions-view',
  templateUrl: './app-solutions-view.component.html',
  styleUrls: ['./app-solutions-view.component.css']
})

export class AppSolutionsViewComponent implements OnInit {
  @Input() solutions: solutionDataWithProblemID;
  
  constructor() { }

  ngOnInit() {
    
  }

}
