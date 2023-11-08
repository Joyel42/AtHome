import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string = "http://172.16.120.37:8050/"

  constructor(private http:HttpClient) { }

  httpRequest(method:'GET'|'POST'|'PUT'|'DELETE'|'PATCH',url:string,payload?:any,observe?:"response"):Observable<any>|any{
    const endpoint:string = this.baseUrl + url;
    if (method === "GET") {
      if (payload) {
        return this.http.get(endpoint, { params: payload, observe:'response'});
      } else {
        return this.http.get(endpoint,{observe:'response'});
      }
    } else if (method === 'POST') {
        return this.http.post(endpoint, payload,{observe:'response'});
    } else if (method === 'PUT') {
        return this.http.put(endpoint, payload, {observe:'response'});
    } else if (method === 'PATCH') {
        return this.http.patch(endpoint, payload, {observe:'response'});
    } else if (method === 'DELETE') {
        return this.http.delete(endpoint, {observe:'response'});
    }
    else {
      return;
    }
  }

  handleHttpErrorResponse(){
    
  }
}
