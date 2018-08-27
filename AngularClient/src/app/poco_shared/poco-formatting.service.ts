// tslint:disable:import-spacing
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable }                    from 'rxjs/Observable';
import { Subject }                       from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { IEndPointMetadata } from '../metadata/endpointMetadata';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityTokenService } from '../security/security.token.service';
import { PocoMetadataService } from '../metadata/poco-metadata.service';
import { PocoSearchService } from '../poco_search/poco-search.service';
import { PocoMetadata } from '../metadata/pocoMetadata';
import { PocoBaseMetadata } from '../metadata/poco-base';

@Injectable()
export class PocoFormattingService {
  constructor(private readonly snackBar: MatSnackBar) {

  }

  formatModel(baseMetadata: PocoBaseMetadata, model: object): any {
    const metadata = baseMetadata.metadata;

    if (metadata) {
      for (const pocoMetadata of metadata) {
        const pocoProperty = pocoMetadata['value'];
        const pocoPropertyValue = (model == null) ? '' : model[pocoProperty];
        if (pocoPropertyValue !== '' && pocoPropertyValue !== null) {
          const formattedValue = this.formatDate(pocoMetadata.type, pocoPropertyValue);
          model[pocoProperty] = formattedValue;
        }
      }
    }

    return model;
  }

  formatDate(type: string, value?: string): string {
    const date = (value) ? moment(value) : moment();
    if (type.toLowerCase() === 'datetime') {
      return date.format('YYYY-MM-DDTHH:mm:ss');
    } else if (type.toLowerCase() === 'date') {
      return date.format('YYYY-MM-DD');
    } else {
      return value;
    }
  }

  private handleErrorFeedback(error: any, action: string = ''): Promise<any> {
    console.error(action + ' error : ', error.message || error); // for demo purposes only
    this.snackBar.open(action + ' error : ' + error.message || error, 'OK');
    return Promise.reject(error.message || error);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 60000,
    });
  }
}
