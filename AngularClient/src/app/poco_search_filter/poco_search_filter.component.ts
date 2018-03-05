// tslint:disable:import-spacing
import { Component, OnInit,
         Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap }    from '@angular/router';
import { Location }                    from '@angular/common';
import { Router }                      from '@angular/router';
import { MatSnackBar }                  from '@angular/material';

import 'rxjs/add/operator/switchMap';

// tslint:disable:import-spacing
import { QuestionService }         from '../dynamic_form/question.service';
import { PocoCrudService }         from '../poco_shared/poco-crud.service';
import { PocoMetadataService }     from '../metadata/poco-metadata.service';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { IEndPointMetadata }       from '../metadata/endpointMetadata';
import { PocoMetadata }            from '../metadata/pocoMetadata';
import { PocoBaseMetadata }        from '../metadata/poco-base';

@Component({
    selector: 'poco-search-filter',
    templateUrl: './poco_search_filter.component.html',
    styleUrls: ['./poco_search_filter.component.css']
})

export class PocoSearchFilterComponent implements OnInit {
  @Input() endpoint: IEndPointMetadata;
  @Input() action = 'search';
  @Output() onSubmitEvent = new EventEmitter<any>();

  questions: any[];
  poco: object;
  pocoBaseMetadata: PocoBaseMetadata;
  pocoKey: string;
  endpointMetadataName: string;

  constructor(private readonly questionService: QuestionService,
              private readonly pocoCrudService: PocoCrudService,
              private readonly pocoMetaDataService: PocoMetadataService,
              private readonly endpointMetadataService: EndpointMetadataService,
              private readonly route: ActivatedRoute,
              private readonly location: Location,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.buildQuestions(params.get('endpoint')))
      .subscribe(questionsResponse => this.questions = questionsResponse);
  }

  buildQuestions(endPointName: string) {
    if (this.endpoint) {
      this.endpointMetadataName = this.endpoint.name;
      return this.pocoMetaDataService
                 .getPocoMetamodel(this.endpointMetadataName)
                 .then(metadata => {  this.pocoBaseMetadata = metadata;
                                      return this.questionService.getQuestionsForSearch(this.pocoBaseMetadata, this.poco);
                                    });
    } else {
      this.endpointMetadataName = endPointName;
      return this.endpointMetadataService
                 .getEndPointMetadata()
                 .then(x => this.pocoMetaDataService
                                .getPocoMetamodel(this.endpointMetadataName))
                 .then(metadata => {  this.pocoBaseMetadata = metadata;
                                      return this.questionService.getQuestionsForSearch(this.pocoBaseMetadata, this.poco);
                                    });
    }
  }

  getDescription() {
    return this.pocoBaseMetadata.description;
  }

  onSubmit(model: any) {
    this.onSubmitEvent.emit(model);
  }
}
