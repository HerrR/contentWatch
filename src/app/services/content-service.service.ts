import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { navEntries } from '../dataTypes/navData';
import { solutionData } from '../dataTypes/solutionData';

@Injectable()
export class ContentService {

  constructor(
    private http: Http
    ) {}
  
  private contentEngineUrl = 'http://1-0-contentengine-mi-test-ebuilder.eu-west-1.elasticbeanstalk.com/v2/contentengine/'; //URL's to Content Engine

  getNavigation(term: string): Observable<navEntries[]> {
    const headers = new Headers();
    headers.append('x-guid', 'telia-test#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', 'telia-Android');
                    /*,
                    'X-Requested-With': 'com.teliasonera.deviceselfservice.telia',
                    'x-api-key': 'Nqd1RbJkW1hoAlPu9xTcP2Vd5Ceg5AIy',*/
  
    var queryType:string = "navigation?query=";
    
    // const options = new RequestOptions({ headers: headers }); // Create a request option
   //  console.log(this.contentEngineUrl+queryType+term);
    
    return this.http
                .get(this.contentEngineUrl+queryType+term, {headers: headers})
                .map((r: Response) => r.json().data as navEntries[]);
  }

  getSolutions(problemID: string): Observable<solutionData[]>{
    var queryType:string = "solutions/";
    const headers = new Headers();
    headers.append('x-guid', 'halebop-test#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', 'halebop-Android');

    // console.log(this.contentEngineUrl+queryType+problemID);

    return this.http
                .get(this.contentEngineUrl+queryType+problemID, {headers: headers})
                .map((r: Response) => r.json().data as solutionData[]);
  }

  getSolutionHTML(uri: string): Observable<string>{
    var baseURL: string = "https://s3-eu-west-1.amazonaws.com/content-int-test.ebuilder.io";
    return this.http
                .get(baseURL+uri)
               .map((r: Response) => r.text() as string);
  }
}