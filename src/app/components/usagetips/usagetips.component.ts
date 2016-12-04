import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { QueryParams } from '../../dataTypes/queryParams';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-usagetips',
  templateUrl: './usagetips.component.html'
})

export class UsagetipsComponent implements OnInit {
  usageTips: Object[] = [];
  usageTipCategories: Object[] = [];
  pageNumber = 0;
  numPages = 0;
  selectedCategories = [];

  constructor(private contentService:ContentService) {
    contentService.queryParamsObservable.subscribe(
      data => {
        this.onSearchEvent(data);
      }
    );
  }

  previousPage() {
    if(this.pageNumber != 0){
      this.pageNumber -= 1;
      this.contentService.refreshPreviousQuery();
    }
  }

  nextPage() {
    if(this.pageNumber != this.numPages-1){
      this.pageNumber += 1;
      this.contentService.refreshPreviousQuery();
    }
  }

  displayAll(){
    this.selectedCategories = [];
    this.contentService.refreshPreviousQuery();
  }

  showAll(){
    if(this.selectedCategories.length == 0){
      return true;
    } else {
      return false;
    }
  }

  categorySelected(name){
    let indexOfName = this.selectedCategories.indexOf(name);
    if(indexOfName == -1){
      this.selectedCategories.push(name);
    } else {
      this.selectedCategories.splice(indexOfName, 1);
    }
    this.pageNumber = 0;
    this.contentService.refreshPreviousQuery();
  }

  onSearchEvent(queryParams){
    this.usageTips = [];

    let searchParams = queryParams;
    let selectedCategories = [];

    if(this.selectedCategories == null){
      selectedCategories = queryParams["usagetipsCategories"];
    } else {
      selectedCategories = this.selectedCategories;
    }
    
    this.usageTipCategories = queryParams["usagetipsCategories"];
    
    this.contentService.getUsageTips(queryParams, selectedCategories, this.pageNumber)
      .subscribe(
        (result: any) => {
          this.pageNumber = result.currentPage;
          this.numPages = result.pages;
          console.log(result);
          
          result.data.forEach(element => {
            let tip = JSON.parse(element);
            this.usageTips.push(tip);
          });
        }
      );
  }

  ngOnInit() {
    this.contentService.refreshPreviousQuery();
  }
}
