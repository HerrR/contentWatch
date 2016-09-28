import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QueryParams } from '../../dataTypes/queryParams';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})

export class AppHeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();

  constructor() { }

  onSearchEvent(queryParams){
    this.searchEvent.emit(queryParams);
  }

  ngOnInit() {
  }
}
