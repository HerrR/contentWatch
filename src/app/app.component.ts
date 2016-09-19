import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content-service.service';
import { navEntries } from './dataTypes/navData';
import { solutionData, solutionDataWithProblemID } from './dataTypes/solutionData';
import { QueryParams } from './dataTypes/queryParams';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
  items: FirebaseListObservable<any[]>;

  constructor(
    private contentEngineService: ContentService,
    af: AngularFire
  ){
    af.database.list('category').subscribe(items => console.log(items));
  }

  onSearchEvent(queryParams){
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

  categorySelected(solutions){
    this.solutions = solutions;
  }

  ngOnInit() {

  }
}