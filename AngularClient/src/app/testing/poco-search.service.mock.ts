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
import { SecurityData } from './security.data';
import { PocoDataMock } from './poco.data';

export class PocoSearchServiceMock {
    httpHeaders = new Headers({'Content-Type': 'application/json'});
    timeout = 6000;
    isloading = false;
    http: Http;
    endpointService: EndpointMetadataService;
    securityService: SecurityService;
    tokenSecurityService: SecurityTokenService;
    snackBar: MatSnackBar;

    getPoco (pocoValue: string, endpointRefName: string) : Promise<object>{
        const pocosMocks = new PocoDataMock();
        let poco: object;
        if(endpointRefName === 'businessType') {
          poco = pocosMocks.businessTypes4Count[0];
        }else if(endpointRefName === 'regulatoryReport'){
          poco = pocosMocks.regulatoryReport;
        }else if(endpointRefName === 'rgltMktTimezone'){
          poco = pocosMocks.regulatoryMktTimezone5Count;
        }else if(endpointRefName === 'timezone'){
          poco = pocosMocks.timeZone;
        }else if(endpointRefName === 'dimMarket'){
          poco = pocosMocks.market;
        }
        
        return Promise.resolve(poco);
    }

    addHeaders(headers: Headers) {
      if (headers instanceof Headers) {
        headers.forEach((values: string[], name: string) => {
          values.forEach(value => this.httpHeaders.append(name, value));
        });
        return;
      }
    }
    
    getOptions() {
      const options = new RequestOptions({ headers: this.httpHeaders });
      return options;
    }
    
    getPocosLikeThis(endpointName: string, value: string, key: string): Promise<object[]> {
      return new Promise(resolve => {});
    }
  
    getPocosLikeAllOfThis(endpointName: string, filter: SearchFilterAndOrder, pageStart: number, pageSize: number): Promise<object[]> {
      return new Promise(resolve => {});
    }
  
    getPocosCount(endpointName: string, filter: SearchFilterAndOrder): Promise<number> {
      return new Promise(resolve => 44);
    }
  
    callEndpoint<T>(url: string, body?: SearchFilterAndOrder): Promise<T> {
      return new Promise(resolve => {});
    }
  
    callEndpointForSearch(url: string, body?: SearchFilterAndOrder): Promise<object[]> {
      return new Promise(resolve => {});
    }
  
    callGetPoco(url: string): Promise<object> {
      return new Promise(resolve => {});
    }
  
    handleResponse(response: any) {
      this.isloading = false;
      const thing = response.json(); // as {key: string, value: string}[];
      return thing;
    }
  
    handleResponseForSearch(response: any) {
      this.isloading = false;
      const thing = response.json(); // as {key: string, value: string}[];
      return thing;
    }
  
    handleError(error: any): Promise<any> {
      return new Promise(resolve => {});
    }
  
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }
}