import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { navEntries } from '../dataTypes/navData';
import { solutionData } from '../dataTypes/solutionData';
import { QueryParams } from '../dataTypes/queryParams';


@Injectable()
export class ContentService {

  constructor(
    private http: Http
  ) {}
  
  private contentEngineUrl:string[] = ["http://1-0-contentengine-mi-","-ebuilder.eu-west-1.elasticbeanstalk.com/v2/contentengine/"];

  buildEngineURL(env:string){
    return this.contentEngineUrl[0]+env+this.contentEngineUrl[1];
  }

  getNavigation(params): Observable<navEntries[]> {
      const headers = new Headers();
      headers.append('x-guid', params.tenant+'-'+params.env+'#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
      headers.append('x-channel-name', params.tenant+'-Android');
                      /*,
                      'X-Requested-With': 'com.teliasonera.deviceselfservice.telia',
                      'x-api-key': 'Nqd1RbJkW1hoAlPu9xTcP2Vd5Ceg5AIy',*/
     
      var queryString:string = 'navigation?query={"tags":{"lang":["'+params.lang+'"],"category":["'+params.category+'"],"model":["'+params.model+'"],"os":["'+params.os+'"]}}';
      console.log("Query: "+this.buildEngineURL(params.env)+queryString);
      console.log("Headers: ", headers);

      return this.http
                  .get(this.buildEngineURL(params.env)+queryString, {headers: headers})
                  .map((r: Response) => r.json().data as navEntries[]);
  }

  getSolutions(problemID: string, previousQueryParams: QueryParams): Observable<solutionData[]>{
    var queryType:string = "solutions/";
    const headers = new Headers();
    headers.append('x-guid', previousQueryParams.tenant+'-'+previousQueryParams.env+'#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', previousQueryParams.tenant+'-Android');
    

    return this.http
                .get(this.buildEngineURL(previousQueryParams.env)+queryType+problemID, {headers: headers})
                .map((r: Response) => r.json().data as solutionData[]);
  }

  getSolutionHTML(uri: string): Observable<string>{
    var baseURL: string = "https://s3-eu-west-1.amazonaws.com/content-int-test.ebuilder.io";
    return this.http
                .get(baseURL+uri)
                .map((r: Response) => r.text() as string);
  }
}