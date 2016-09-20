import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { Solution } from '../../dataTypes/solutionData';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
  providers: [ContentService]
})
export class SolutionComponent implements OnInit {
  @Input() solution: Solution;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(
    private contentEngineService: ContentService
  ) { }

  ngOnInit() {
    this.dataContainer.nativeElement.innerHTML = "Loading...";
    this.contentEngineService.getSolutionHTML(this.solution.uri).subscribe(
      (data:string) => {
        this.dataContainer.nativeElement.innerHTML = data;
        // Remove tags and multiple spaces / tabs / indents
        this.solution.contentText = data.replace(/<\/?[^>]+(>|$)/g,"").replace(/\s\s+/g, ' ');
      }
    )
  }
}