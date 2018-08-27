import { Injectable } from '@angular/core';
import { Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class SecurityService {
  public static tokenName = 'AdminUiSecurityToken';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(public http: HttpClient,
              private readonly configuationService: ConfigurationService) { }

  // login(username, password): Observable<any> {
  //   const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   const options = new RequestOptions({ headers: headers });
  //   const body: URLSearchParams = new URLSearchParams();
  //   body.set('grant_type', 'password');
  //   body.set('username', username);
  //   body.set('password', password);
  //   body.set('client_id', this.clientId);
  //   return this.http.post(this.tokenUrl, body, options).map(this.handleData)
  //     .catch(this.handleError);
  // }

  loginNTLM(): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const body: URLSearchParams = new URLSearchParams();
    // const authUrl = this.tokenUrl + '?client_id=' + this.clientId;
    const configuratinPromise = this.configuationService.loadConfiguration();

    const security = Observable.fromPromise(configuratinPromise)
                                .flatMap(config => this.http.get(config.authSvcUrl + '?client_id=' + config.clientId, options)
                                                            .map(this.handleData)
                                                            .catch(this.handleError));

    return security;
  }

  private handleData(response: Response) {
    const data = response.json();
    localStorage.setItem(SecurityService.tokenName, data.access_token);
    return data;
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(error);
    return Observable.throw(errMsg);
  }

  // getRoles() {
  //   const url = 'http://localhost:3000/api/roles';
  //   const token = localStorage.getItem(SecurityService.tokenName);
  //   const headers = new Headers({ 'Authorization': `Bearer ${SecurityService.tokenName}` });
  //   const options = new RequestOptions({ headers: headers });

  //   return this.http.get(url, options).map(res => res.json());
  // }

  public logout() {
    localStorage.removeItem(SecurityService.tokenName);
  }
}
