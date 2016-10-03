import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/core';
import { ContentService } from '../../services/content-service.service';
import { QueryParams } from '../../dataTypes/queryParams';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-usagetips',
  templateUrl: './usagetips.component.html'
})
export class UsagetipsComponent implements OnInit {
  mostRecentQuery: QueryParams;

  constructor(private contentService:ContentService) {
    contentService.queryParams$.subscribe(
      data => {
        this.mostRecentQuery = data;
        this.onSearchEvent(data);
      }
    );
  }
  onSearchEvent(queryParams){
    this.contentService.getUsageTips(queryParams)
      .subscribe(
        (data: any) => {
          console.log(data)
        }
      );
  }
  ngOnInit() {
  }

}
