// tslint:disable:import-spacing
import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material';

import { IEndPointMetadata }  from '../metadata/endpointMetadata';
import { ConfigurationService }  from '../configuration/configuration.service';
import { SecurityService } from '../security/security.service';
import { SecurityTokenService } from '../security/security.token.service';
import { EndpointData } from './endpoint.data';

export class EndpointMetadataServiceMock {
    businessType: IEndPointMetadata = {
        'name': 'businessType',
        'group': 'Regulatory',
        'label': 'Business Type',
        'icon': null,
         type: '',
        'description': 'Business Type',
        'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/businessTypeUi',
        'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/businessType',
        'actions' : []
    };


    getEndPointMetadata(): Promise<IEndPointMetadata[]> {
        const endPointdata = new EndpointData();
        return Promise.resolve(endPointdata.endpoints);
    }

    getEndpointByName2(endpointName: string): IEndPointMetadata {
        const points = new EndpointData();
        return this.businessType;
    }

    getEndpointByName(endpointName: string): IEndPointMetadata {
        const endPointdata = new EndpointData();
        const endpoints = endPointdata.endpoints
        const endpoint =  endpoints.find(x => x.name.toLowerCase() === endpointName.toLowerCase());
        return endpoint;
    }

    endpointsMetadata: IEndPointMetadata[];
    metadatasCategories: string[];
    isloading = false;
    httpHeaders = new Headers({'Content-Type': 'application/json'});

    readonly http: Http;
    readonly configuationService: ConfigurationService;
    readonly snackBar: MatSnackBar;
    readonly securityService: SecurityService;
    readonly tokenSecurityService: SecurityTokenService;
    securityTokenService: SecurityTokenService;

addHeaders(headers: Headers) { }

getOptions() {
    const options = new RequestOptions({ headers: this.httpHeaders });
    return options;
}

getEndPointActionMetadata(): Promise<IEndPointMetadata[]> {
    return new Promise(resolve => resolve(this.endpointsMetadata));
}


getPocosMetaDataGroups(endpoints: IEndPointMetadata[]): string[] {

    return [""];
}

canDoAction(endpoint: IEndPointMetadata, actionName: string): boolean {
    return true; // found.length > 0;
}
onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  handleResponse(response: any) {
    // set Metadata
    this.endpointsMetadata = response.json() as IEndPointMetadata[];

    return new Promise(resolve => resolve(this.endpointsMetadata));
  }

  handleError(error: any) {
    // this.isloading = false;
    const action = 'Loading Endpoints';
    console.error('ENDPOINT METADATA SERVICE RESPONSE !!! ERROR !!!', error); // for demo purposes only
    this.snackBar.open(action + ' error : ' + error.message, 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
    // this.snackBar.openFromComponent(TablePaginationExample)
  }
}
