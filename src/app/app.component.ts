import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content-service.service';
import { navEntries } from './dataTypes/navData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContentService]
})

export class AppComponent {
  categories: navEntries;
  solutions: string[];

  constructor(
    private contentEngineService: ContentService
  ){}

  responseData: navEntries;

  onCategoryData(data :navEntries) { 
    // console.log(data);
    this.categories = data;
  }

  categorySelected(solutions){
    this.solutions = solutions;
    console.log("Top level component with solutions", solutions);
  }

  ngOnInit() {
    this.contentEngineService.getNavigation('{"tags":{"lang":["en"],"category":["iphone"],"model":["iphone6s"],"os":["9"]}}')
      .subscribe(
        (data: any) => this.onCategoryData(data)
      );
  }


}
