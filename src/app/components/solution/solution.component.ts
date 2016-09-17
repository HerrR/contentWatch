import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
  providers: [ContentService]
})
export class SolutionComponent implements OnInit {
  @Input() uri: string;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(
    private contentEngineService: ContentService, 
    private _DomSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.dataContainer.nativeElement.innerHTML = "Loading...";
    this.contentEngineService.getSolutionHTML(this.uri).subscribe(
      (data:string) => {
        this.dataContainer.nativeElement.innerHTML = data;
      }
    )
  }

}