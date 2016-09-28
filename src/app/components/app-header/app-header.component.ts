import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QueryParams } from '../../dataTypes/queryParams';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})

export class AppHeaderComponent implements OnInit {
  constructor() { }
/*
  @Output() searchEvent = new EventEmitter<any>();

  queryTerms: QueryParams = new QueryParams("test", "halebop", "en", "iphone", "iphone6", "9");

  onSubmit(){
    this.searchEvent.emit(this.queryTerms);
  }
*/
  ngOnInit() {
  }

}
