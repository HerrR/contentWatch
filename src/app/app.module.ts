import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainCategoryComponent } from './components/category/main-category.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SolutionComponent } from './components/solution/solution.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSolutionsViewComponent } from './components/app-solutions-view/app-solutions-view.component';
import { StringFilterPipe } from './pipes/string-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainCategoryComponent,
    ProblemComponent,
    SolutionComponent,
    AppHeaderComponent,
    AppSolutionsViewComponent,
    StringFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
