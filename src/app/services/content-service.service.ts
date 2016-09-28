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

  
  buildEngineURL(env:Object){
    //let optionalDash = (env == "dev") ? "-" : "";
    //return `http://1-0-content${ optionalDash }engine-mi-${ env }-ebuilder.eu-west-1.elasticbeanstalk.com/v2/contentengine/`;
  }

  getNavigation(params): Observable<navEntries[]> {
      const headers = new Headers();
      //headers.append('x-guid', 'telia'+'-'+'test'+'#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
      headers.append('x-guid', params.env['x-guid']);
      headers.append('x-channel-name', 'contentWatch');
                      /*,
                      'X-Requested-With': 'com.teliasonera.deviceselfservice.telia',
                      'x-api-key': 'Nqd1RbJkW1hoAlPu9xTcP2Vd5Ceg5AIy',*/

      let queryString:string = `navigation?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"],"os":["${params.os}"]},"params":{"page":0}}`;
      
      return this.http
                  .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
                  .map((r: Response) => r.json().data as navEntries[]);
  }

  getSolutions(problemID: string, previousQueryParams: QueryParams): Observable<solutionData>{
    let queryType:string = "solutions/";
    const headers = new Headers();
    headers.append('x-guid', 'halebop#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', 'halebop-Android');
  
    return this.http
                .get(previousQueryParams.env['ce']+'v2/contentengine/'+queryType+problemID, {headers: headers})
                //.get(this.buildEngineURL(previousQueryParams.env)+queryType+problemID, {headers: headers})
                .map((r: Response) => r.json().data as solutionData);
  }

  getSolutionHTML(uri: string): Observable<string>{
    //let baseURL: string = "https://s3-eu-west-1.amazonaws.com/content-int-test.ebuilder.io";

    return this.http
                .get(uri)
                .map((r: Response) => r.text() as string);
  }
}