import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content-service.service';
import { navEntries } from './dataTypes/navData';
import { solutionData, solutionDataWithProblemID } from './dataTypes/solutionData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContentService]
})

export class AppComponent {
  categories: navEntries;
  solutions: solutionDataWithProblemID;

  constructor(
    private contentEngineService: ContentService
  ){}

  responseData: navEntries;

  onCategoryData(data :navEntries) { 
    this.categories = data;
  }

  categorySelected(solutions){
    console.log("Top level component with solutions", solutions);
    this.solutions = solutions;
    console.log(this.solutions);
  }

  ngOnInit() {
    console.log(this.solutions);
    this.contentEngineService.getNavigation('{"tags":{"lang":["en"],"category":["iphone"],"model":["iphone6s"],"os":["9"]}}')
      .subscribe(
        (data: any) => this.onCategoryData(data)
      );
  }


}
