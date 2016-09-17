import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-solutions-view',
  templateUrl: './app-solutions-view.component.html',
  styleUrls: ['./app-solutions-view.component.css']
})
export class AppSolutionsViewComponent implements OnInit {
  @Input() solutions: string[];
  constructor() { }

  ngOnInit() {
    
  }

}
