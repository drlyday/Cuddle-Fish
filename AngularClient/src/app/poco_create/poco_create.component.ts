// tslint:disable:import-spacing
import { Component, OnInit,
         Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, 
         ParamMap }                    from '@angular/router';
import { Location }                    from '@angular/common';
import { MatSnackBar, MatDialog }      from '@angular/material';

import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';

// tslint:disable:import-spacing
import { QuestionService }         from '../dynamic_form/question.service';
import { PocoCrudService }         from '../poco_shared/poco-crud.service';
import { PocoFormattingService }   from '../poco_shared/poco-formatting.service';
import { PocoMetadataService }     from '../metadata/poco-metadata.service';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { IEndPointMetadata }       from '../metadata/endpointMetadata';
import { PocoMetadata }            from '../metadata/pocoMetadata';
import { PocoBaseMetadata }        from '../metadata/poco-base';

import { SecurityRoles }           from '../security/securityRoles';
import { SecurityRolesKnown }      from '../security/securityRolesKnown';
import { DynamicFormComponent } from '../dynamic_form/dynamic-form.component';
import { DialogYesNoComponent }    from '../dialog/yesNo/dialog-yesNo.component';
import { QuestionBase } from '../dynamic_form/question-base';

@Component({
    selector: 'poco-create',
    templateUrl: './poco_create.component.html',
    styleUrls: ['./poco_create.component.css']
})

/** poco_create component*/
export class PocoCreateComponent implements OnInit {
  @Input() endpoint: IEndPointMetadata;
  @Input() action = 'Create';
  @Output() onSubmitEvent = new EventEmitter<any>();

  questions: any[];
  poco: object;
  pocoBaseMetadata: PocoBaseMetadata;
  pocoKey: string;
  endpointName: string;
  securityRoles: SecurityRoles;

  @ViewChild(DynamicFormComponent)
  private dynamicComponent: DynamicFormComponent;
  
  constructor(private readonly questionService: QuestionService,
              private readonly pocoCrudService: PocoCrudService,
              private readonly pocoFormattingService: PocoFormattingService,
              private readonly pocoMetaDataService: PocoMetadataService,
              private readonly endpointMetadataService: EndpointMetadataService,
              private readonly route: ActivatedRoute,
              private readonly location: Location,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly dialog: MatDialog) {  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.init(params.get('id'), params.get('endpoint')))
      .subscribe(questionsResponse => this.questions = questionsResponse);
  }

  init(id: string, endpointName: string): Promise<QuestionBase<any>[]> {
    this.endpointName = endpointName;
    return this.endpointMetadataService
                .getEndPointMetadata()
                .then(x => this.pocoMetaDataService.getSecurityRoles(this.endpointName))
                .then(roles => this.securityRoles = roles)
                .then(x => this.pocoCrudService.getNewPoco(this.endpointName))
                .then(poco => { return id ?
                              this.pocoCrudService.copyPoco(id, poco, this.endpointName) :
                              new Promise(resolve => resolve(poco));
                            })

                .then(poco => this.poco = poco)
                .then(x => this.pocoMetaDataService.getPocoMetamodel(this.endpointName))
                .then(metadata => { this.pocoBaseMetadata = metadata;
                                    return this.questionService.getQuestionsForCreate(this.pocoBaseMetadata, this.poco);
                                  });
  }

  getHeader() {
    if (this.canCreate()){
      return 'Create ' + this.pocoBaseMetadata.label ;
    } else {
      return 'Creation of ' + this.pocoBaseMetadata.label + ' is Unauthorized ';
    }
  }

  getDescription() {
    return this.pocoBaseMetadata.description;
  }

  get isEnabled(){
    return this.questions && this.pocoBaseMetadata && this.canCreate();
  }
  
  canCreate(): boolean {
    if (this.securityRoles && this.securityRoles.roles.find(role => role === 'Create')) {
      return true;
    } else {
      return false;
    }
  }

  showActionOptions(): boolean {
    return true;
  }

  onSubmit(model: any) {
    const formattedModel = this.pocoFormattingService.formatModel(this.pocoBaseMetadata, model);

    this.pocoCrudService.createPoco(formattedModel, this.endpointName)
        .then(response => this.handleResponse(response, 'Created!'))
        .catch(error => this.handleError(error, 'Failed...'));
  }

  onSearch() {
    this.router.navigate(['/search', this.endpointName]);
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
          this.router.navigate(['/search', this.endpointName]);
        }        
    });
  }

  private handleResponse(response: any, action: string = '') {
    this.router.navigate(['/search', this.endpointName]);
  }

  private handleError(error: any, action: string = ''): Promise<any> {
    console.error(action, error);
    const message = error ? error._body : null;
    return Promise.reject(message || error);
  }
}
