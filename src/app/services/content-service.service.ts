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

  getNavigation(params): Observable<navEntries[]> {
      const headers = new Headers();
      headers.append('x-guid', params.env['x-guid']);
      headers.append('x-channel-name', 'contentWatch');

      let queryString:string = `navigation?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"],"os":["${params.os}"]},"params":{"page":0}}`;
      
      return this.http
                  .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
                  .map((r: Response) => r.json().data as navEntries[]);
  }

  getUsageTips(params, selectedCategories, page): Observable<Object> {
      const headers = new Headers();
      headers.append('x-guid', params.env['x-guid']);
      headers.append('x-channel-name', 'contentWatch');

      let categoryString = "";

      let numCategories = params.usagetipsCategories.length; 
      console.log("Params in getUsageTips contentService", params);
      console.log("numCategories", numCategories);
      
      for(let i = 0; i < numCategories; i++){
        categoryString += '"'+params.usagetipsCategories[i]+'"';
        if(i < numCategories-1){
          categoryString += ", ";
        }
      }

      // console.log(categoryString);

      //category is collection in usagetips
      let queryString:string = `tips?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"]},"collection": [${categoryString}],"params":{"page":${page}}}`;
      
      // console.log(params.env['x-guid']);
      // console.log(params.env['ce']+'v2/contentengine/'+queryString);
      
      return this.http
                  .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
                  .map((r: Response) => {

                    let data = r.json().data;
                    let numPages = r.json().totalPage;
                    let currentPage = r.json().currentPage;
                    // let categories = params.usagetipsCategories;

                    return {
                      "data": data, 
                      "pages": numPages, 
                      "currentPage": currentPage,
                      "categories": params.usagetipsCategories};
                  });
  }

  getSolutions(problemID: string, previousQueryParams: QueryParams): Observable<solutionData>{
    let queryType:string = "solutions/";
    const headers = new Headers();
    headers.append('x-guid', 'halebop#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', 'contentWatch');
    
  
    return this.http
                .get(previousQueryParams.env['ce']+'v2/contentengine/'+queryType+problemID, {headers: headers})
                .map((r: Response) => r.json().data as solutionData);
  }

  getSolutionHTML(uri: string): Observable<string>{
    return this.http
                .get(uri)
                .map((r: Response) => r.text() as string);
  }
}