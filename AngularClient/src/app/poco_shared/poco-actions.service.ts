import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { MatSnackBar } from '@angular/material';
import { IEndPointMetadata } from '../metadata/endpointMetadata';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { SecurityTokenService } from '../security/security.token.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IEndpointAction } from '../metadata/endpoint-action';
import { PocoRestService } from './poco-rest.service';

@Injectable()
export class ActionsService extends PocoRestService {

  constructor(public http: HttpClient,
              public snackBar: MatSnackBar,
              public endpointService: EndpointMetadataService,
              public securityTokenService: SecurityTokenService) {
    super (http, snackBar, endpointService, securityTokenService);
  }

  uploadData (fileList: FileList, key: string, url: string, actionTitle: string) {
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        const headers = new Headers();
        headers.append('ContentType', 'multipart');
        headers.append('runId', key);
        this.addHeadersToTarget(headers, this.securityTokenService.httpAuthorizationHeader);

        const uploadPromise = this.http.post(url, formData, this.getOptions())
                                  .catch(error => Observable.throw(error))
                                  .subscribe(
                                    event => {
                                      this.handleUploadResponseFeedback(event, actionTitle, true);
                                    },
                                    error => this.handleErrorFeedback(error, 'Error')
                                  );
        this.openSnackBar(actionTitle + ' Started!', 'OK');
    }
  }

  startPocoAction (selectedPocos: any[], key: string, url: string, action: IEndpointAction, pocoKey: string) {
    if (!selectedPocos || selectedPocos.length === 0) {
      return;
    }

    const requestedItemCount = selectedPocos.length;

    const actionTitle = action.name;
    let payload: any[] = selectedPocos;
    if (action.payloadType.toLowerCase() !== 'object') {
      payload = [];
      selectedPocos.forEach(poco => payload.push(poco[pocoKey]))
    }

    if (requestedItemCount > 0) {
        const headers = this.securityTokenService.httpAuthorizationHeader;
        this.http.post(url, payload, this.getOptions())
                  .catch(error => Observable.throw(error))
                  .subscribe(
                    event => {
                      super.handleActionFeedback(event, actionTitle, requestedItemCount, true);
                    },
                    error => this.handleErrorFeedback(error, 'Error')
                  );
        this.openSnackBar(actionTitle + ' Started!', 'OK');
    }
  }
}
