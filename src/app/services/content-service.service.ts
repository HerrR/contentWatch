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
  ) {}

  private queryParams = new Subject<QueryParams>();
  queryParams$ = this.queryParams.asObservable();
  
  setQueryParams(qp: QueryParams){
    this.queryParams.next(qp);
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

  getUsageTips(params): Observable<string[]> {
      const headers = new Headers();
      headers.append('x-guid', params.env['x-guid']);
      headers.append('x-channel-name', 'contentWatch');
      //category is collection in usagetips
      let queryString:string = `tips?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"]},"collection": ["battery", "camera", "hotapps", "lifehacks", "news", "startup"],"params":{"page":0}}`;
      console.log(params.env['ce']+'v2/contentengine/'+queryString);
      return this.http
                  .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
                  .map((r: Response) => r.json().data as string[]);
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