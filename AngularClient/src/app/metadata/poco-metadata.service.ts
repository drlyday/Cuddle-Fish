// tslint:disable:import-spacing
import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/toPromise';

import { PocoMetadata } from '../metadata/pocoMetadata';
import { SecurityRoles } from '../security/securityRoles';
import { PocoBaseMetadata } from '../metadata/poco-base';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityService } from '../security/security.service';
import { SecurityTokenService } from '../security/security.token.service';
import { SecurityData } from '../testing/security.data';
@Injectable()
export class PocoMetadataService {
  metamodel: PocoBaseMetadata;

  constructor(readonly http: Http,
              readonly endpointService: EndpointMetadataService,
              readonly securityService: SecurityService,
              readonly tokenSecurityService: SecurityTokenService,
              readonly snackBar: MatSnackBar) { }

  getPocoMetamodel(endpointName: string): Promise<PocoBaseMetadata> {
    // if (this.metamodel === undefined) {
      const endpoint = this.endpointService.getEndpointByName(endpointName);
      if (!endpoint) {
        return undefined;
      }
      const endpointurl = endpoint.uiEndpoint;

      const url = endpointurl; // + '/metadata';
      const headers = this.tokenSecurityService.httpAuthorizationHeader;
      const options = new RequestOptions({ headers: headers });
      const poco = Promise.resolve(this.http.get(url, options).timeout(6000)
      .toPromise()
      .then(response => this.handleResponse(response))
      .catch(this.handleError));

    return new Promise(resolve => resolve(poco));
  }

  getSecurityRoles(endpointName: string): Promise<SecurityRoles> {
      // const endpoint = this.endpointService.getEndpointByName(endpointName);
      // if (!endpoint) {
      //   return undefined;
      // }
      // const endpointurl = endpoint.uiEndpoint;

      // const url = endpointurl + '/roles';

      // const headers = this.tokenSecurityService.httpAuthorizationHeader;
      // const options = new RequestOptions({ headers: headers });
      // const poco = Promise.resolve(this.http.get(url, options).timeout(6000)
      // .toPromise()
      // .then(response => this.handleSecurityRoleResponse(response))
      // .catch(this.handleSecurityRolesError));

      const roles = new SecurityData();
    //return new Promise(resolve => resolve(poco));
      return new Promise(resolve => resolve(roles.securityRoles_All));
  }

  getPocoMetaKey(pocoMetadata: PocoBaseMetadata) {
    return pocoMetadata.primaryKey;
  }

  handleSecurityRoleResponse(response: any) {
    const securityRoles = response.json() as SecurityRoles;
    console.log('Security Roles for endpoint', securityRoles);
    return new Promise(resolve => resolve(securityRoles));
  }

  handleResponse(response: any) {
    const newMetadatas = response.json() as PocoBaseMetadata;
    this.metamodel = newMetadatas;
    return new Promise(resolve => resolve(this.metamodel));
  }

  handleSecurityRolesError(error: any): Promise<any> {
    console.error('Error retrieving Security Roles', error.message || error);
    return new Promise(resolve => resolve(''));
  }

  handleError(error: any): Promise<any> {
    console.error('Error with pulling model metadata', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  parseMetaDataCategories(stuff: string =  '***NO METADATA!~!~!~!~!~!~!') {

  }
}
