import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { solutionData, solutionDataWithProblemID } from '../../dataTypes/solutionData';
import { QueryParams } from '../../dataTypes/queryParams';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
  providers: [ContentService]
})
export class ProblemComponent implements OnInit {
  @Input() uuid: string;
  @Input() problemDesc: string;
  @Input() activeCategoryUUID: string;
  @Input() mostRecentQuery: QueryParams;

  @Output() onCategorySelect = new EventEmitter<string[]>();
  // @Output() activeCategory = new EventEmitter<string>();

  solutions: solutionData[];

  constructor(private contentEngineService: ContentService) {}

  isActive() {
      return (this.activeCategoryUUID.indexOf(this.uuid) > -1);
  }
  
  onClick(){
    // var solutions = new solutionDataWithProblemID(this.solutions, this.uuid);
    this.onCategorySelect.emit([this.uuid]);
  }

  ngOnInit() {
    // this.contentEngineService.getSolutions(this.uuid, this.mostRecentQuery).subscribe(
    //   (data:solutionData[]) => {
    //     this.solutions = data;
    //   }
    // );
  }

}
