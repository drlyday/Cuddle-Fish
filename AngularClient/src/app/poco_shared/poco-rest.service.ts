import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { IEndPointMetadata } from '../metadata/endpointMetadata';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityTokenService } from '../security/security.token.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IEndpointAction } from '../metadata/endpoint-action';

@Injectable()
export class PocoRestService {
  protected httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  protected timeout = 60000;

  constructor(public http: HttpClient,
              public snackBar: MatSnackBar,
              public endpointService: EndpointMetadataService,
              public securityTokenService: SecurityTokenService) {
    const securityHeader = this.securityTokenService.httpAuthorizationHeader;
    this.addHeaders(securityHeader);
  }

  addHeaders(headers: HttpHeaders) {
    //if (headers instanceof Headers) {
    //  headers.forEach((values: string[], name: string) => {
    //    values.forEach(value => this.httpHeaders.append(name, value));
    //  });
      return;
    //}
  }

  addHeadersToTarget(headersTarget: Headers, headers: HttpHeaders) {
    if (headers instanceof Headers) {
      //headers.forEach((values: string[], name: string) => {
      //  values.forEach(value => headersTarget.append(name, value));
      //});
      return;
    }
  }

  getOptions() {

    return { headers: this.httpHeaders };
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  protected handleResponseFeedback(response: any, action: string = '', showFeedback = false) {
    const thing = response;
    if (showFeedback) {
      this.openSnackBar(action, 'OK');
    }
    return thing;
  }

  protected handleErrorFeedback(error: any, action: string = ''): Promise<any> {
    const message = error ? error._body : null;
    console.error(action + ' error : ', message || error);
    this.openSnackBar(action + ' error : ' + message || error, 'OK');
    return Promise.reject(message || error);
  }

  protected handleUploadResponseFeedback(response: any, action: string = '', showFeedback = false) {
    if (showFeedback) {
      this.openSnackBar(action + ' Complete!', 'OK');
    }
  }

  protected handleActionFeedback(response: any, action: string = '', requestedItemCount: number, showFeedback = false) {
    const proccessedItemCount = response;
    if (showFeedback) {
      this.openSnackBar(action + ' Complete for ' + proccessedItemCount  + ' of ' + requestedItemCount + '!', 'OK');
    }
  }
}
