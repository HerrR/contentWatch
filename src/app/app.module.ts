import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase'; //temp fix for typings bug in somewhere, prob angluar-cli beta14
import { routing } from './routing/app.routing';

import { AppComponent } from './app.component';
import { MainCategoryComponent } from './components/category/main-category.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SolutionComponent } from './components/solution/solution.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSolutionsViewComponent } from './components/app-solutions-view/app-solutions-view.component';
import { StringFilterPipe } from './pipes/string-filter.pipe';
import { InputComponent } from './components/input/input.component';
import { TroubleshootingComponent } from './components/troubleshooting/troubleshooting.component';
import { UsagetipsComponent } from './components/usagetips/usagetips.component';
import { ContentService } from './services/content-service.service';
import { UsagetipComponent } from './components/usagetip/usagetip.component';

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
    AppSolutionsViewComponent,
    StringFilterPipe, 
    InputComponent, 
    TroubleshootingComponent, 
    UsagetipsComponent, UsagetipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
