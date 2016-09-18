import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { solutionData, solutionDataWithProblemID } from '../../dataTypes/solutionData';

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

  @Output() onCategorySelect = new EventEmitter<solutionDataWithProblemID>();
  @Output() activeCategory = new EventEmitter<string>();

  solutions: solutionData[];

  constructor(private contentEngineService: ContentService) {
  }

  isActive() {
    if(this.activeCategoryUUID == this.uuid) {
      return true;
    } else {
      return false;
    }
  }
  
  onClick(){
    var solution = new solutionDataWithProblemID(this.solutions, this.uuid);
    console.log("Emitting click event from problem component!", solution);
    this.onCategorySelect.emit(solution);


    // this.onCategorySelect.emit(this.solutions);
    //this.activeCategory.emit(this.uuid);
  }

  ngOnInit() {

    this.contentEngineService.getSolutions(this.uuid).subscribe(
      (data:solutionData[]) => {this.solutions = data}
    );
  }

}
