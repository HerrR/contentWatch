import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { navEntries } from '../../dataTypes/navData';
import { solutionData, solutionDataWithProblemID, Solution } from '../../dataTypes/solutionData';
import { QueryParams } from '../../dataTypes/queryParams';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-troubleshooting',
  templateUrl: './troubleshooting.component.html',
})
export class TroubleshootingComponent implements OnInit {
  categories: navEntries;
  selectedProblemID: string[] = [];
  mostRecentQuery: QueryParams;
  solutions: Solution[] = [];
  subscription: Subscription;
  constructor(private contentService: ContentService) {
    contentService.queryParams$.subscribe(
      data => {
        this.mostRecentQuery = data;
        this.onSearchEvent(data);
        // console.log(data);
      }
    );
  }

  onSearchEvent(queryParams){
    // console.log("Query params recieved by main Component");
    console.log(queryParams);
    this.categories = undefined;
    this.solutions = [];
    this.selectedProblemID = [];
    this.mostRecentQuery = queryParams;
    this.contentService.getNavigation(queryParams)
      .subscribe(
        (data: any) => this.onCategoryData(data)
      );
  }

  onCategoryData(data :navEntries) {
    this.categories = data;
  }

  isShowingAll() {

    return this.selectedProblemID.indexOf("button-all") > -1;
  }

  displayAll(){
    let idArray: string[] = [];
    for(let c in this.categories){
      for(let p in this.categories[c].entry.problems){
        idArray.push(this.categories[c].entry.problems[p].uuid);
      }
    }

    this.categorySelected(idArray);
    this.selectedProblemID = ["button-all"];
  }

  categorySelected(id: string[]){
    
    this.selectedProblemID = id;
    if(this.solutions != undefined){
      this.solutions.length = 0;
    }

    for(let i in id){
      this.contentService.getSolutions(id[i], this.mostRecentQuery).subscribe(
      (data:solutionData) => { 
        // let tempArray = this.solutions;
        // let tempArray = this.solutions;
        for(let s in data){
          this.solutions.push(data[s]);
          // tempArray.push(data[s]);
          // this.solutions.push(data[s]);
        }
        // this.solutions = new Array<Solution>();
        // this.solutions = tempArray;
      })
    }
  }

  ngOnInit() {
  }

}
