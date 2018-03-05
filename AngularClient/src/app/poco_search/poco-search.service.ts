import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/toPromise';

import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityService } from '../security/security.service';
import { SecurityTokenService } from '../security/security.token.service';
import { SearchConstraint } from '../poco_shared/search-constraint';
import { SearchOrder} from '../poco_shared/search-order';
import { SearchFilterAndOrder} from '../poco_shared/search-filter';
import { PocoRestService } from '../poco_shared/poco-rest.service';

@Injectable()
export class PocoSearchService extends PocoRestService {
  isloading = false;

  constructor(readonly http: Http,
              readonly endpointService: EndpointMetadataService,
              readonly securityService: SecurityService,
              readonly tokenSecurityService: SecurityTokenService,
              securityTokenService: SecurityTokenService,
              readonly snackBar: MatSnackBar) {
    super (http, snackBar, endpointService, securityTokenService);
  }

  getPocosLikeThis(endpointName: string, value: string, key: string, type: string): Promise<object[]> {
    this.isloading = true;
    const endpoint = this.endpointService.getEndpointByName(endpointName);
    const endpointService = endpoint.serviceEndPoint;
    const url = endpoint.serviceEndPoint + '/page?page=' + 0 + '&pageSize=' + 10;
    value = SearchConstraint.likeString(value);
    const constraint = new SearchConstraint('OR', key, 'like', type, value);
    const orderBy = new SearchOrder(key);
    const filter = new SearchFilterAndOrder([constraint], [orderBy]);

    return this.callEndpoint<object[]>(url, filter);
  }

  getPocosLikeAllOfThis(endpointName: string, filter: SearchFilterAndOrder, pageStart: number, pageSize: number): Promise<object[]> {
    this.isloading = true;
    const endpoint = this.endpointService.getEndpointByName(endpointName);
    const url = endpoint.serviceEndPoint + '/page?page=' + pageStart + '&pageSize=' + pageSize;

    if (filter) {
      return this.callEndpoint<object[]>(url, filter);
    } else {
      return this.callEndpoint<object[]>(url);
    }
  }

  getPocosCount(endpointName: string, filter: SearchFilterAndOrder): Promise<number> {
    this.isloading = true;
    const endpoint = this.endpointService.getEndpointByName(endpointName);
    const url = endpoint.serviceEndPoint + '/count';

    if (filter) {
      return this.callEndpoint<number>(url, filter);
    } else {
      return this.callEndpoint<number>(url);
    }
  }

  getPoco(id: string, endpointName: string): Promise<object> {
    this.isloading = true;
    const endpoint = this.endpointService.getEndpointByName(endpointName).serviceEndPoint;
    const url = endpoint + '/' + id;

    return this.callGetPoco(url);
  }

  callEndpoint<T>(url: string, body?: SearchFilterAndOrder): Promise<T> {
    const headers = this.tokenSecurityService.httpAuthorizationHeader;
    const options = this.getOptions();
    const jsonBody = JSON.stringify(body);
    const pocos = Promise.resolve(this.http
                                  .post(url, jsonBody, options)
                                  .timeout(600000)
                                  .toPromise()
                                  .then(response => this.handleResponseFeedback(response))
                                  .catch(error => super.handleErrorFeedback(error, 'Search')));

    return new Promise(resolve => resolve(pocos));
  }

  callEndpointForSearch(url: string, body?: SearchFilterAndOrder): Promise<object[]> {
    const headers = this.tokenSecurityService.httpAuthorizationHeader;
    const options = this.getOptions();
    const jsonBody = JSON.stringify(body);
    const pocos = Promise.resolve(this.http
                                  .post(url, jsonBody, options)
                                  .timeout(600000)
                                  .toPromise()
                                  .then(response => this.handleResponseFeedback(response))
                                  .catch(error => super.handleErrorFeedback));

    return new Promise(resolve => resolve(pocos));
  }

  callGetPoco(url: string): Promise<object> {
    const headers = this.tokenSecurityService.httpAuthorizationHeader;
    const options = new RequestOptions({ headers: headers });

    const poco = Promise.resolve(this.http.get(url, options).timeout(600000)
                        .toPromise()
                        .then(response => this.handleResponseFeedback(response))
                        .catch(error => this.handleErrorFeedback(error, 'Search')));

    return new Promise(resolve => resolve(poco));
  }
}
