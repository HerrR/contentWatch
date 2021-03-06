import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { navEntries } from '../dataTypes/navData';
import { solutionData } from '../dataTypes/solutionData';
import { QueryParams } from '../dataTypes/queryParams';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ContentService {
  constructor(
    private http: Http
  ) { }

  private queryParamsSubject = new Subject<QueryParams>();
  public queryParamsObservable = this.queryParamsSubject.asObservable();
  private storedQueryParams:QueryParams;
  
  setQueryParams(qp: QueryParams){
    this.storedQueryParams = qp;
    this.queryParamsSubject.next(qp);
  }

  refreshPreviousQuery(){
    if(this.storedQueryParams != undefined){
      this.queryParamsSubject.next(this.storedQueryParams);
    }
  }

  //Gets the "navigation" for troublshooting from content engine mi. in AWS through http request
  getNavigation(params): Observable<navEntries[]> {
    //Request headers
    const headers = new Headers();
    headers.append('x-guid', params.env['x-guid']);
    headers.append('x-channel-name', 'contentWatch');
    //Build query from params in Firebase db
    let queryString:string = `navigation?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"],"os":["${params.os}"]},"params":{"page":0}}`;
    //Return as observable and map response on "navEntries" datatype, defined at components/datatypes/.
    return this.http
      .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
      .map((r: Response) => r.json().data as navEntries[]);
  }

  getUsageTips(params, selectedCategories, page): Observable<Object> {
      const headers = new Headers();
      headers.append('x-guid', params.env['x-guid']);
      headers.append('x-channel-name', 'contentWatch');

      let categoryString = "";
      let numCategories = 0; 
      let categories = [];

      //If a category has been selected, use that, else use all categories in databse (from firebase)
      if(selectedCategories.length > 0){
        numCategories = selectedCategories.length; 
        categories = selectedCategories;
      } else {
        numCategories = params.usagetipsCategories.length; 
        categories = params.usagetipsCategories;
      }

      //debugging
      console.log("Params in getUsageTips contentService", params);
      console.log("numCategories", numCategories);
      console.log("selected categories", selectedCategories);

      //Build the search string for the categories
      for(let i = 0; i < numCategories; i++){
        categoryString += '"'+categories[i]+'"';
        if(i < numCategories-1){
          categoryString += ", ";
        }
      }

      //reminder: category is called 'collection' in usagetips
      let queryString:string = `tips?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"], "os": [${params.os}],"collection": [${categoryString}]},"params":{"page":${page}}}`;
      return this.http
                  .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
                  .map((r: Response) => {
                    let data = r.json().data;
                    let numPages = r.json().totalPage;
                    let currentPage = r.json().currentPage;
                    return {
                      "data": data, 
                      "pages": numPages, 
                      "currentPage": currentPage,
                      "categories": categories};
                  });
  }

  //gets the solution lists with html links for troubleshootung, see getNavigation() comments for usage.
  getSolutions(problemID: string, previousQueryParams: QueryParams): Observable<solutionData>{
    let queryType:string = "solutions/";
    const headers = new Headers();
    headers.append('x-guid', 'halebop#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', 'contentWatch');
    
    return this.http
                .get(previousQueryParams.env['ce']+'v2/contentengine/'+queryType+problemID, {headers: headers})
                .map((r: Response) => r.json().data as solutionData);
  }
  //fetches the individual html solutions from S3
  getSolutionHTML(uri: string): Observable<string>{
    return this.http
                .get(uri)
                .map((r: Response) => r.text() as string);
  }
}