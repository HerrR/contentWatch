import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase'; //temp fix for typings bug in somewhere, prob angluar-cli beta14

import { AppComponent } from './app.component';
import { MainCategoryComponent } from './components/category/main-category.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SolutionComponent } from './components/solution/solution.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSolutionsViewComponent } from './components/app-solutions-view/app-solutions-view.component';

//Firebase Configuration contant
export const firebaseConfig = {
  apiKey: "AIzaSyDd8z7IHad9caGeUJI9rnVeY1xRvrqTY2I",
  authDomain: "contentwatch-8421b.firebaseapp.com",
  databaseURL: "https://contentwatch-8421b.firebaseio.com/",
  storageBucket: "contentwatch-8421b.appspot.com",
};


@NgModule({
  declarations: [
    AppComponent,
    MainCategoryComponent,
    ProblemComponent,
    SolutionComponent,
    AppHeaderComponent,
    AppSolutionsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
