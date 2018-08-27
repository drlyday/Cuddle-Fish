import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { MatSnackBar } from '@angular/material';
import { IEndPointMetadata } from '../metadata/endpointMetadata';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityTokenService } from '../security/security.token.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IEndpointAction } from '../metadata/endpoint-action';
import { PocoRestService } from './poco-rest.service';

@Injectable()
export class PocoCrudService extends PocoRestService {
    
  constructor( http: HttpClient,
              public snackBar: MatSnackBar,
              public endpointService: EndpointMetadataService,
              public securityTokenService: SecurityTokenService) {
    super (http, snackBar, endpointService, securityTokenService);
  }

  getPoco(id: string, endpointName: string): Promise<object> {
    let poco = {};
    if (id || id.trim() !== '') {
      const endPoint = this.endpointService.getEndpointByName(endpointName).serviceEndPoint;
      const finalEndpoint = endPoint + '/' + id;

      const headers = this.securityTokenService.httpAuthorizationHeader;
      const options = this.getOptions();

      poco= Promise.resolve(this.http.get(finalEndpoint, options).timeout(this.timeout)
      .toPromise()
      .then(response => this.handleResponseFeedback(response))
      .catch(error => this.handleErrorFeedback(error, 'Load')));
    }

    return new Promise(resolve => resolve(poco));
  }

  getNewPoco(endpointName: string): Promise<object> {
    const endPoint = this.endpointService.getEndpointByName(endpointName).serviceEndPoint;
    const finalEndpoint = endPoint + '/create';

    const headers = this.securityTokenService.httpAuthorizationHeader;
    const options = this.getOptions();

    const poco = Promise.resolve(this.http.get(finalEndpoint, options).timeout(this.timeout)
                        .toPromise()
                        .then(response => this.handleResponseFeedback(response))
                        .catch(error => this.handleErrorFeedback(error, 'Load')));

    return new Promise(resolve => resolve(poco));
  }

  copyPoco(id: any, newPoco: any, endpointName: string): any {
    const poco = this.getPoco(id, endpointName)
                     .then(existingPoco => this.copyObject(existingPoco, newPoco))
                     .catch(error => this.handleErrorFeedback(error, 'Copy'));

    return new Promise(resolve => resolve(poco));
  }

  copyObject(existingPoco: any, newPoco: any) {
    const copy = Object.keys(existingPoco).reduce(function(previous, current) {
                  previous[current] = newPoco[current] ? newPoco[current] : existingPoco[current];
                  return previous;
                }, {});
    return copy;
  }

  updatePoco(poco: any, endpointName: string, id: string): Promise<object> {
    let endPoint = this.endpointService.getEndpointByName(endpointName).serviceEndPoint;
    endPoint = endPoint + '/' + id;
    const options = this.getOptions();
    const promise = this.http.put(endPoint, JSON.stringify(poco), options).timeout(this.timeout)
                        .toPromise()
                        .then(response => this.handleResponseFeedback(response, 'Updated', true))
                        .catch(error => this.handleErrorFeedback(error, 'Update'));
    return promise;
  }

  createPoco(poco: any, endpointName: string): Promise<object> {
    const endpoint = this.endpointService.getEndpointByName(endpointName).serviceEndPoint + '/insert';
    const options = this.getOptions();

    const promise = this.http.post(endpoint, JSON.stringify(poco), options).timeout(this.timeout)
                        .toPromise()
                        .then(response => this.handleResponseFeedback(response, 'Created', true))
                        .catch(error => this.handleErrorFeedback(error, 'Create'));
    return promise;
  }

  deletePoco (pocoId: string, endpointName: string): Promise<object> {
    const endpoint = this.endpointService.getEndpointByName(endpointName).serviceEndPoint;
    const url = endpoint + '/' + pocoId;
    const options = this.getOptions();

    const promise = this.http.delete(url, options).timeout(this.timeout)
                        .toPromise()
                        .then(response => this.handleResponseFeedback(response, 'Deleted', true))
                        .catch(error => this.handleErrorFeedback(error, 'Delete'));
    return promise;
  }
}
