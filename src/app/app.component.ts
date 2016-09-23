import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content-service.service';
import { navEntries } from './dataTypes/navData';
import { solutionData, solutionDataWithProblemID } from './dataTypes/solutionData';
import { QueryParams } from './dataTypes/queryParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContentService]
})

export class AppComponent {
  categories: navEntries;
  solutions: solutionDataWithProblemID;
  responseData: navEntries;
  mostRecentQuery: QueryParams;
  numSolutionsDisplayed: number;
  //refs/remotes/origin/custom-search

  constructor(
    private contentEngineService: ContentService
  ){
  }

  onSearchEvent(queryParams){
    console.log("Serach EVEENT DETECTAED YO")
    this.solutions = undefined;
    this.categories = undefined;
    this.mostRecentQuery = queryParams;
    this.contentEngineService.getNavigation(queryParams)
      .subscribe(
        (data: any) => this.onCategoryData(data)
      );
  }

  onCategoryData(data :navEntries) { 
    this.categories = data;
  }

  displayAll(){

  }

  categorySelected(solutions){
    this.solutions = solutions;
  }

  ngOnInit() {

  }
}