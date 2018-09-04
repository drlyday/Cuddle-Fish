import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { SecurityService } from './security.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SecurityTokenService {
  private JSON;
  private readonly tokenName = 'dataAdminSecurityToken';

  constructor(public router: Router, private readonly securityService: SecurityService) {
    this.JSON = JSON;
  }

  private data;
  jwtHelper: JwtHelper = new JwtHelper();

  get msg() {
    return JSON.stringify(this.data);
  }

  logout() {
    this.securityService.logout();
    this.router.navigateByUrl('/login');
  }

  get rawToken() {
    return localStorage.getItem(this.tokenName);
  }

  set token (token) {
    localStorage.setItem(this.tokenName, token);
  }

  get token() {
    const localToken = localStorage.getItem(this.tokenName);
    return localToken;
  }

  get decodedToken() {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken;
    }
    return null;
  }

  get httpRequestOptions() {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    const options = { headers: headers };
    return options;
  }

  get httpAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    return headers;
  }

  get isExpired(): boolean {
    if (!this.token) {
      return true;
    }

    return this.jwtHelper.isTokenExpired(this.token);
  }

  get isSecured(): boolean {
    return this.token && !this.isExpired;
  }

  get expirationDate(): Date {
    if (!this.token) {
      return undefined;
    }

    return this.jwtHelper.getTokenExpirationDate(this.token);
  }

  get printedToken() {
    if (!this.token) {
      return '';
    }

    return JSON.stringify(this.decodedToken);
  }

  get tokenSubject() {
    if (!this.token) {
      return '';
    }
    console.log(this.decodedToken)
    return this.decodedToken['sub'];
  }

  get tokenSubjectNoDomain() {
    if (!this.token) {
      return '';
    }
    console.log(this.decodedToken)
    let name = this.decodedToken['sub'].toString();
    name = name.replace('bp1\\', '  ');
    return name;
  }

  // get tokenAudience() {
  //   if (!this.token) {
  //     return '';
  //   }

  //   return this.decodedToken.aud();
  // }

  // get tokenIssuer() {
  //   if (!this.token) {
  //     return '';
  //   }

  //   return this.decodedToken.iss;
  // }
}
