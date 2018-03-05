import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from './security.service';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(public router: Router,
              private readonly securityService: SecurityService,
              private readonly snackBar: MatSnackBar) { }

  canActivate() {
    if (localStorage.getItem(SecurityService.tokenName) === null) {
      this.alertUser();
      this.router.navigateByUrl('/search');
    }

    return (localStorage.getItem(SecurityService.tokenName) === null) ? false : true;
  }

  alertUser() {
    const thing = this.router.initialNavigation.name;
    const msg = 'You are not allowed to do that: ' + thing;
    console.warn(msg);
    this.openSnackBar(msg, 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
    //this.snackBar.openFromComponent(TablePaginationExample)
  }
}
