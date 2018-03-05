import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import {FileUploadModule} from 'primeng/primeng';

// tslint:disable:import-spacing
import { QuestionService }         from '../dynamic_form/question.service';
import { PocoCrudService }         from '../poco_shared/poco-crud.service';
import { ActionsService }         from '../poco_shared/poco-actions.service';
import { PocoFormattingService }   from '../poco_shared/poco-formatting.service';
import { PocoMetadataService }     from '../metadata/poco-metadata.service';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { PocoMetadata }            from '../metadata/pocoMetadata';
import { PocoBaseMetadata }        from '../metadata/poco-base';
import { IEndPointMetadata }       from '../metadata/endpointMetadata';
import { IEndpointAction }         from '../metadata/endpoint-action';
import { QuestionBase }            from '../dynamic_form/question-base';
import { DialogDeleteComponent }   from '../dialog/delete/dialog-delete.component';
import { DialogFileUploadComponent } from '../dialog/fileUpload/dialog-fileupload.component';

import { SecurityRoles }           from '../security/securityRoles';
import { SecurityRolesKnown }      from '../security/securityRolesKnown';
import { DynamicFormComponent } from '../dynamic_form/dynamic-form.component';
import { DialogYesNoComponent } from '../dialog/yesNo/dialog-yesNo.component';

@Component({
    selector: 'poco-edit',
    templateUrl: './poco_edit.component.html',
    styleUrls: ['./poco_edit.component.css']
})

export class PocoEditComponent implements OnInit {
  endpointMetadata: IEndPointMetadata;
  questions: QuestionBase<any>[];
  action = 'Edit';
  poco: object;
  pocoKey: string;
  endpoint: string;
  securityRoles: SecurityRoles;

  private _pocoBaseMetadata: PocoBaseMetadata;

  @ViewChild(DynamicFormComponent)
  private dynamicComponent: DynamicFormComponent;

  constructor(private readonly questionService: QuestionService,
              private readonly pocoCrudService: PocoCrudService,
              private readonly pocoActionService:  ActionsService,
              private readonly pocoFormattingDataService: PocoFormattingService,
              private readonly pocoMetaDataService: PocoMetadataService,
              private readonly endpointMetadataService: EndpointMetadataService,
              private readonly route: ActivatedRoute,
              private readonly location: Location,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
      this.route.paramMap
          .switchMap((params: ParamMap) => this.init(params.get('id'), params.get('endpoint')))
          .subscribe(questionsResponse => this.questions = questionsResponse);
  }

  init(id: string, endpointName: string): Promise<QuestionBase<any>[]> {
    this.endpoint = endpointName;
    this.pocoKey = id;
    const x = this.endpointMetadataService.getEndPointMetadata()
                .then(x => this.endpointMetadataService.getEndpointByName(endpointName))
                .then(endpointMetadata => this.endpointMetadata = endpointMetadata)
                .then(x => this.pocoMetaDataService.getSecurityRoles(endpointName))
                .then(roles => this.securityRoles = roles)
                .then(x => this.pocoCrudService.getPoco(id, endpointName))
                .then(poco => this.poco = poco)
                .then(x => this.pocoMetaDataService.getPocoMetamodel(endpointName))
                .then(response => this.pocoBaseMetadata = response)
                .then(x => this.questionService.getQuestions(this.pocoBaseMetadata, this.poco));
    return x;
  }

  getHeader() {
    if (this.canUpdate()){
      return 'Edit ' + this.pocoBaseMetadata.label + ' : ' + this.getPocoName();
    } else {
      return 'Editing of ' + this.pocoBaseMetadata.label + ' is Unauthorized ';
    }
  }

  getDescription() {
    return this.pocoBaseMetadata.description;
  }

  getPocoName(): string {
    let name =  this.poco[this._pocoBaseMetadata.selectorValue];
    if (!name) {
      name = '';
    }
    return name;
  }

  get pocoBaseMetadata() {
    return this._pocoBaseMetadata;
  }

  get availableActions(): IEndpointAction[] {
    let actions: IEndpointAction[] = [];
    if (this.pocoBaseMetadata.actions) {
      actions = this.pocoBaseMetadata.actions.filter(action => action.applyTo === 'Instance');
    }

    return actions as IEndpointAction[];
  }

  set pocoBaseMetadata(pocoBaseMetadata: PocoBaseMetadata){
    if (pocoBaseMetadata) {
      this._pocoBaseMetadata = pocoBaseMetadata;
      this.pocoKey = this.pocoMetaDataService.getPocoMetaKey(pocoBaseMetadata);
    }
  }

  get isWaiting() {
    return this.questions === undefined || this.poco === undefined || this.pocoBaseMetadata === undefined;
  }

  get isEnabled() {
    return this.questions && this.poco && this.pocoBaseMetadata && this.canUpdate();
  }

  canDelete(): boolean {
    if (this.securityRoles && this.securityRoles.roles.find(role => role === 'Delete')) {
      return true;
    } else {
      return false;
    }
  }
  
  canCreate(): boolean {
    if (this.securityRoles && this.securityRoles.roles.find(role => role === 'Create')) {
      return true;
    } else {
      return false;
    }
  }

  canUpdate(): boolean {
    if (this.securityRoles && this.securityRoles.roles.find(role => role === 'Update')) {
      return true;
    } else {
      return false;
    }
  }

  canExecute(): boolean {
    if (this.securityRoles && this.securityRoles.roles.find(role => role === 'Execute')) {
      return true;
    } else {
      return false;
    }
  }

  showActionOptions(): boolean {
    return this.canExecute() || this.canDelete();
  }

  getActionIcon(action: IEndpointAction) {
    switch (action.type.toLowerCase()) {
      case 'fileupload':
        return 'fileupload';
      default :
        return '';
    }
  }

  onAction(action: IEndpointAction): void {
    if (this.canExecute) {
      switch (action.type.toLowerCase()) {
        case 'fileupload' :
          this.onUpload(action);
          break;
        default :
          this.handleError('This action is unregistered', 'Failed');
      }
    } else {
      this.openSnackBar(' Action unavailable. Execute role is required', action.type);
    }
  }

  onCreate(): void {
    this.router.navigate(['/create', this.endpoint]);
  }

  onCopy(): void {
    this.router.navigate(['/copy', this.endpoint, this.poco[this.pocoKey]]);
  }

  onUpload (action: IEndpointAction){
    const dialogRef = this.dialog.open(DialogFileUploadComponent, {
      width: '300px',
      data: { name: action.name }
    });

    dialogRef.afterClosed().subscribe(result => {
        const key = action.key; // this.poco[this.pocoKey];
        const actionEndpoint = action.url;
        const fileList = result as FileList;
        this.pocoActionService.uploadData(fileList, key, actionEndpoint, action.name);
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { name: this.getHeader() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.Delete();
      }
    });
  }

  Delete() {
    if (this.canDelete) {
      const id = this.poco[this.pocoKey];
      this.pocoCrudService.deletePoco(id, this.endpoint)
          .then(response => this.handleResponse(response, 'Deleted'))
          .catch(error => this.handleError(error.message, 'Failed...'));
    }
  }

  goToSearch(poco: object): void {
      this.router.navigate(['/search', poco['pdmTestKey']]);
  }

  onSubmit(model: any) {
    const formattedModel = this.pocoFormattingDataService.formatModel(this.pocoBaseMetadata, model);

    this.pocoCrudService.updatePoco(model, this.endpoint, this.poco[this.pocoKey])
          .then(response => this.handleResponse(response, 'Updated!'))
          .catch(error => this.handleError(error.message, 'Failed...'));
  }

  onSearch() {
    this.router.navigate(['/search', this.endpoint]);
  }


  onReset(){
    this.dynamicComponent.onReset();
  }
  
  onCancel(){
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      width: '300px',
      data: { name: 'Cancel', question: 'Canceling will lose all current work. Ok?' }
    });

    dialogRef.afterClosed().subscribe(result => {
         if (result) {
          this.router.navigate(['/search', this.endpoint]);
        }        
    });
  }

  private handleResponse(response: any, action: string = '') {
    this.router.navigate(['/search', this.endpoint]);
  }

  private handleError(error: any, action: string = ''): Promise<any> {
      console.error(action, error);
      return Promise.reject(error.message || error);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
