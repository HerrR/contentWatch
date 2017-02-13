//Angular core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http'; //Http, RequestOptions for jwt workaround
import { routing } from './routing/app.routing';

//Libraries
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { AngularFireModule } from 'angularfire2';

//Components
import { AppComponent } from './app.component';
import { MainCategoryComponent } from './components/category/main-category.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SolutionComponent } from './components/solution/solution.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSolutionsViewComponent } from './components/app-solutions-view/app-solutions-view.component';
import { InputComponent } from './components/input/input.component';
import { TroubleshootingComponent } from './components/troubleshooting/troubleshooting.component';
import { UsagetipsComponent } from './components/usagetips/usagetips.component';
import { UsagetipComponent } from './components/usagetip/usagetip.component';
import { HomeComponent } from './components/home/home.component';

//Pipes
import { StringFilterPipe } from './pipes/string-filter.pipe';
import { ObjectToListPipe } from './pipes/object-to-list.pipe';

//Services
import { ContentService } from './services/content-service.service';
import { AuthGuard } from './auth-guard';
import { UsagetipsCategoryComponent } from './components/usagetips-category/usagetips-category.component';
// import { Auth } from './services/auth.service';

//Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDd8z7IHad9caGeUJI9rnVeY1xRvrqTY2I",
  authDomain: "contentwatch-8421b.firebaseapp.com",
  databaseURL: "https://contentwatch-8421b.firebaseio.com/",
  storageBucket: "contentwatch-8421b.appspot.com",
};

//angular 2 jwt workaround
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

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
    UsagetipsComponent, UsagetipComponent, ObjectToListPipe, HomeComponent, UsagetipsCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  //providers: [ContentService, AUTH_PROVIDERS],
  providers: [
    ContentService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
