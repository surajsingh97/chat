import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from '../core/app.constants';
import { ApiEndpoint } from '../core/api.endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  public request(
    endPointName: string,
    payload?: any,
    { paramsData = [], clearCache = false } = {}
  ): Promise<any> {
    console.log('inside');
    const endPointData = ApiEndpoint.data()[endPointName];
    if (!endPointData) {
      alert('Api path is not found');
    }
    const restFull = endPointData.restFull;
    let paramsString = '';
    if (restFull && paramsData.length) {
      paramsString = '/' + paramsData.join('/');
    }
    return new Promise((resolve, reject) => {
      const params = new HttpParams().set('clearCache', clearCache.toString());
      this.http
        .request(
          endPointData.method,
          `${AppConstants.API_ENPOINT}/${endPointData.url}${paramsString}`,
          {
            body: payload,
            observe: 'body',
            params,
          }
        )
        .subscribe(
          (res) => {
            console.log(res);
            resolve(JSON.parse(JSON.stringify(res)));
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
