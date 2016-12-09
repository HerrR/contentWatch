import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content-service.service';
import { Auth } from './services/auth.service';
import { navEntries } from './dataTypes/navData';
import { solutionData, solutionDataWithProblemID, Solution } from './dataTypes/solutionData';
import { QueryParams } from './dataTypes/queryParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Auth]
})

export class AppComponent {
  constructor(
    private contentService: ContentService,
    private auth: Auth
  ){}

  onSearchEvent(queryParams){
    this.contentService.setQueryParams(queryParams);
  }
}