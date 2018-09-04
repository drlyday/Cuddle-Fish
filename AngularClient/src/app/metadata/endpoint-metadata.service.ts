// tslint:disable:import-spacing
import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material';

import { IEndPointMetadata }  from '../metadata/endpointMetadata';
import { ConfigurationService }  from '../configuration/configuration.service';
import { SecurityService } from '../security/security.service';
import { SecurityTokenService } from '../security/security.token.service';

@Injectable()
export class EndpointMetadataService {
  endpointsMetadata: IEndPointMetadata[];
  metadatasCategories: string[];
  isloading = false;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(readonly http: HttpClient,
              readonly configuationService: ConfigurationService,
              readonly snackBar: MatSnackBar,
              readonly securityService: SecurityService,
              readonly tokenSecurityService: SecurityTokenService,
              securityTokenService: SecurityTokenService) {
    const securityHeader = this.tokenSecurityService.httpAuthorizationHeader;
    this.addHeaders(securityHeader);
  }

  addHeaders(headers: HttpHeaders) {
    //if (headers instanceof HttpHeaders) {
      // BAD!  Quick fix for compilation
      //headers.keys.forEach((values: string[], name: string) => {
        //values.forEach(value => this.httpHeaders.append(name, value));
      //});
      return;
    //}
  }

  getOptions() {
    const options = { headers: this.httpHeaders };
    return options;
  }

  getEndPointMetadata(): Promise<IEndPointMetadata[]> {
    if (!this.endpointsMetadata) {
      const headers = this.tokenSecurityService.httpAuthorizationHeader;
      const options = this.getOptions();
      const endpointMetadataPromise = this.configuationService
                                          .loadConfiguration()
                                          .then(config => this.http.get(config.endpointSvcUrl, options)
                                                                   .toPromise()
                                                                   .then(response => this.handleResponse(response))
                                                                   .catch(this.handleError));
      return new Promise<IEndPointMetadata[]>(resolve => resolve(endpointMetadataPromise));
    }
    return new Promise<IEndPointMetadata[]>(resolve => resolve(this.endpointsMetadata));
  }

  getEndPointActionMetadata(): Promise<IEndPointMetadata[]> {
    if (!this.endpointsMetadata) {
      const headers = this.tokenSecurityService.httpAuthorizationHeader;
      const options = { headers: headers };
      const endpointMetadataPromise = this.configuationService
                                          .loadConfiguration()
                                          .then(config => this.http.get(config.endpointSvcUrl, options)
                                                                   .toPromise()
                                                                   .then(response => this.handleResponse(response))
                                                                   .catch(this.handleError));
      return new Promise<IEndPointMetadata[]>(resolve => resolve(endpointMetadataPromise));
    }
    return new Promise(resolve => resolve(this.endpointsMetadata));
  }

  getEndpointByName(endpointName: string): IEndPointMetadata {
    return this.endpointsMetadata.find(x => x.name.toLowerCase() === endpointName.toLowerCase());
  }

  getPocosMetaDataGroups(endpoints: IEndPointMetadata[]): string[] {
    const reduction = this.endpointsMetadata.map(function(endpoint){ return endpoint.group; });

    const distinctGroups = reduction.filter(this.onlyUnique);

    return distinctGroups;
  }

  canDoAction(endpoint: IEndPointMetadata, actionName: string): boolean {
    // const found = endpoint.actions.filter(x => x.type === actionName);
    console.error('All Actions are allowed. This should not be allowed');
    return true; // found.length > 0;
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  handleResponse(response: any): Promise<IEndPointMetadata[]> {
    this.endpointsMetadata = response as IEndPointMetadata[];
    return new Promise<IEndPointMetadata[]>(resolve => resolve(this.endpointsMetadata));
  }

  handleError(error: any): Promise<IEndPointMetadata[]> {
    // this.isloading = false;
    const action = 'Loading Endpoints';
    console.error('Error loading endpoint metadata.  Confirm all services are running', error); // for demo purposes only
    if (this) {
      this.snackBar.open(action + ' error : ' + error.message, 'OK');
    }

    this.endpointsMetadata = [];
    return new Promise<IEndPointMetadata[]>(resolve => resolve(this.endpointsMetadata));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
