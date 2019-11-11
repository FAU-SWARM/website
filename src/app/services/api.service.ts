import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import * as Library from 'src/app/library';


const headers = new HttpHeaders({'Content-Type': 'application/json'});


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    if (!(environment.production)) { console.log(this.constructor.name, 'started', environment.api); }
  }

  post(resource: string, body: any | any[]): Observable<any> {
    let __function__ = `post(resource: ${resource}, body: ${body});`;
    let url = `${environment.api}/${resource}`;

    let response = this.http.post(url, body, {
      withCredentials: true,
    }).pipe(
      map(
        x => {
          if (!(environment.production)) { console.log(this.constructor.name, __function__, 'url', url, x); }
          return x;
        }
      )
    );
    return response;
  }

  get(resource: string, id: string = null, params: {} = {}): Observable<any> {
    let __function__ = `get(resource: ${resource}, id: ${id}, params: ${params});`;
    let url = `${environment.api}/${resource}`;
    if (id != null) {
      url = `${url}/${id}`;
    }

    url = Library.Strings.url_attach_params(url, params);

    let response = this.http.get(url, {
      headers: headers,
      reportProgress: true,
      observe: "body",
      withCredentials: true,
    }).pipe(
      map(
        x => {
          if (!(environment.production)) { console.log(this.constructor.name, __function__, 'url', url, x); }
          return x;
        }
      )
    );
    return response;
  }


  put(resource: string, id: string, body: any | any[]): Observable<any> {
    let __function__ = `put(resource: ${resource}, id: ${id}, body: ${body});`;
    let url = `${environment.api}/${resource}/${id}`;

    let response = this.http.put(url, body, {
      headers: headers,
      reportProgress: true,
      observe: "body",
      withCredentials: true,
    }).pipe(
      map(
        x => {
          if (!(environment.production)) { console.log(this.constructor.name, __function__, 'url', url, x); }
          return x;
        }
      )
    );
    return response;
  }


  delete(resource: string, id: string=null, params: {}={}): Observable<any> {
    let __function__ = `delete(resource: ${resource}, id: ${id}, params: ${params});`;
    let url = '';
    if (id !== null) {
      url = `${environment.api}/${resource}/${id}`;
    } else {
      url = `${environment.api}/${resource}`;
    }

    url = Library.Strings.url_attach_params(url, params);

    let response = this.http.delete(url, {
      headers: headers,
      reportProgress: true,
      observe: "body",
      withCredentials: true,
    }).pipe(
      map(
        x => {
          if (!(environment.production)) { console.log(this.constructor.name, __function__, 'url', url, x); }
          return x;
        }
      )
    );
    return response;
  }

}
