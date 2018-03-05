import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {

  private configuration: Configuration;
  private configurationSubcription: BehaviorSubject<Configuration> = new BehaviorSubject<Configuration>(null);

  // Local: http://localhost:9002/api/ui/endPoints

// DEV
// {
// 	"clientId": "pdm-svcs",
// 	"authSvcUrl": "https://pdm-elb-deva.cd2.bp.com/sso/authenticate",
// 	"endpointSvcUrl": "http://pdm-elb-deva.cd2.bp.com:9002/api/ui/endpoints",
// 	"version": "1.0 BETA"
// }


// INT
// {
// 	"clientId": "pdm-svcs",
// 	"authSvcUrl": "https://pdm-elb-inta.cd2.bp.com/sso/authenticate",
// 	"endpointSvcUrl": "http://pdm-elb-inta.cd2.bp.com:9002/api/ui/endpoints",
// 	"version": "1.0 BETA"
// }

  constructor(private readonly http: Http) {  }

  public loadConfiguration(): Promise<Configuration> {
    if (this.configuration) {
      console.log('Loaded cached configuration: ./assets/app.config.json');
      return new Promise(resolve => resolve(this.configuration));
    }

    const configurationPromise = Promise.resolve(this.http.get('./assets/app.config.json')
                                                          .retry(3)
                                                          .toPromise()
                                                          .then(response => this.storeConfiguration(response))
                                                          .catch(this.handleError));

    return new Promise<Configuration>(resolver => resolver(configurationPromise));
  }

  set Configuration(es: Configuration) {
    if (es) {
      this.configuration = es;
      console.log(this.configuration);

      if (this.configurationSubcription) {
          this.configurationSubcription.next(this.configuration);
      }
    }
  }

  public subscribeToConfigurationChanges(caller: any, callback: (caller: any, es: Configuration) => void) {
    this.configurationSubcription
        .subscribe((es) => {
          if (es) {
            callback(caller, es);
          }
        });
  }

  private handleError(error: any): Promise<any> {
    const action = 'Loading Endpoints';
    console.error('Error loading configuration', error);
    return Promise.reject(error.message || error);
  }

  private storeConfiguration(response: any): Promise<Configuration> {
    console.log('Configuration loaded:' +  response );
    this.configuration = response.json();
    return new Promise<Configuration>(resolve => resolve(this.configuration));
  }
}
