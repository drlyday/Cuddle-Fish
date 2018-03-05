// tslint:disable:import-spacing
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router }                               from '@angular/router';
import { SecurityService }      from './security/security.service';
import { SecurityTokenService } from './security/security.token.service';
import { QuestionService }      from './dynamic_form/question.service';
import { ConfigurationService }  from './configuration/configuration.service';

@Component({
 // tslint:disable-next-line:component-selector
   selector: 'my-app',
   styleUrls: ['./app.component.css'],
   templateUrl : './app.component.html',
   providers:  [QuestionService]
})
export class AppComponent implements OnInit {
  links: any[];
  secured = false;
  failedLogIn = false;
  loginTitle = 'not logged in';

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly securityService: SecurityService,
    private readonly tokenSecurityService: SecurityTokenService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.initSecurity();
    // this.secured = true;
    // this.loginTitle = 'Security Disabled';
    this.links = [];
  }
   
  initSecurity() {
    // if (this.tokenSecurityService.isSecured) {
    //   this.secured = true;
    //   this.loginTitle = this.tokenSecurityService.tokenSubjectNoDomain;
    // }else {
      this.securityService
          .loginNTLM()
          .subscribe(response => {
              this.tokenSecurityService.token = response.access_token;
              this.secured = true;
              this.loginTitle = this.tokenSecurityService.tokenSubjectNoDomain;
            }, error => {
                this.failedLogIn = true;
                console.error(error);
                this.secured = false;
                this.loginTitle = 'unauthorized';
              });
     //}
  }
  
  onSearch() {
    this.router.navigate(['/search']);
  }
}
