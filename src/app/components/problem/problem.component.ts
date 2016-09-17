import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { solutionData } from '../../dataTypes/solutionData';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
  providers: [ContentService]
})
export class ProblemComponent implements OnInit {
  @Input() uuid: string;
  @Input() problemDesc: string;
  @Output() onCategorySelect = new EventEmitter<string[]>();
  
  solutions: string[];

  constructor(private contentEngineService: ContentService) {
  }
  
  onClick(){
    console.log("Emitting click event from problem component!", this.solutions);
    this.onCategorySelect.emit(this.solutions);
  }

  ngOnInit() {
    this.contentEngineService.getSolutions(this.uuid).subscribe(
      (data:string[]) => {this.solutions = data}
    );
  }

}
