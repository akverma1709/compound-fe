import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  compoundList(query: any) {
    return this._http.get(`${environment.baseUrl}compound/list`, {params: query});
  }

  updateCompound(body: any, query: any) {
    return this._http.put(`${environment.baseUrl}compound/update`, body, {params: query});
  }

  compoundDetail(query: any) {
    return this._http.get(`${environment.baseUrl}compound/detail`, {params: query});
  }
}
