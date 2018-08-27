import { PocoBaseMetadata } from '../metadata/poco-base';
import { PocoMetadataMock } from '../testing/poco-metamodel.data'
import { PocoMetadataService } from '../metadata/poco-metadata.service';

import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/toPromise';

import { PocoMetadata } from '../metadata/pocoMetadata';
import { SecurityRoles } from '../security/securityRoles';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityService } from '../security/security.service';
import { SecurityTokenService } from '../security/security.token.service';

export class PocoMetadataServiceMock {

    metamodel: PocoBaseMetadata;

    readonly http: HttpClient;
    readonly endpointService: EndpointMetadataService;
    readonly securityService: SecurityService;
    readonly tokenSecurityService: SecurityTokenService;
    readonly snackBar: MatSnackBar;

    getPocoMetamodel(endpointName: string): Promise<PocoBaseMetadata> {
        const pocoMetadataMock: PocoMetadataMock = new PocoMetadataMock();
        return Promise.resolve(pocoMetadataMock[endpointName]);
        //return Promise.resolve(pocoMetadataMock.businessTypeMetadataMock);
    }

    getSecurityRoles(endpointName: string): Promise<SecurityRoles> {
    // if (this.metamodel === undefined) {
        const endpoint = this.endpointService.getEndpointByName(endpointName);
        if (!endpoint) {
            return undefined;
        }
        const endpointurl = endpoint.uiEndpoint;

        const url = endpointurl + '/roles';

        const headers = this.tokenSecurityService.httpAuthorizationHeader;
        const options = new RequestOptions({ headers: headers });
        const roles = Promise.resolve(this.http.get(url, options).timeout(6000)
        .toPromise()
        .then(response => this.handleSecurityRoleResponse(response))
        .catch(this.handleSecurityRolesError));
    // }
        const fixedRoles = {'roles' : ['Admin', 'Create', 'Delete', 'Update', 'Execute', 'Read'] }
        return new Promise(resolve => fixedRoles);
        //return new Promise(resolve => resolve(roles));
    }

    getPocoMetaKey(pocoMetadata: PocoBaseMetadata) {
      return pocoMetadata.primaryKey;
    }

    handleSecurityRoleResponse(response: any) {
    const securityRoles = response.json() as SecurityRoles;
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
