// tslint:disable:import-spacing
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl }                         from '@angular/forms';
import { MatTabChangeEvent, MatTab,
         MatSnackBar, MatDialog,
         MatAutocompleteSelectedEvent }         from '@angular/material';
import { Router, ParamMap, ActivatedRoute }    from '@angular/router';

import { BehaviorSubject }     from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs/Rx';

import { PocoMetadata }            from '../metadata/pocoMetadata';
import { PocoBaseMetadata }        from '../metadata/poco-base';
import { IEndPointMetadata }       from '../metadata/endpointMetadata';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { PocoMetadataService }     from '../metadata/poco-metadata.service';
import { MetaTableComponent }      from '../metatable/meta-table.component';
import { PocoRenderingService }    from '../poco_shared/poco-rendering.service';
import { PocoSearchService }       from '../poco_search/poco-search.service';
import { QuestionService }         from '../dynamic_form/question.service';
import { PocoCrudService }         from '../poco_shared/poco-crud.service';
import { ActionsService }          from '../poco_shared/poco-actions.service';
import { SearchConstraint }        from '../poco_shared/search-constraint';
import { SearchOrder }             from '../poco_shared/search-order';
import { SearchFilterAndOrder}     from '../poco_shared/search-filter';
import { SecurityRoles }           from '../security/securityRoles';
import { SecurityRolesKnown }      from '../security/securityRolesKnown';
import { IEndpointAction }         from '../metadata/endpoint-action';
import { DialogYesNoComponent }    from '../dialog/yesNo/dialog-yesNo.component';

@Component({
    selector: 'poco_search',
    templateUrl: './poco_search.component.html',
    styleUrls: ['./poco_search.component.css']
})

export class PocoSearchComponent implements OnInit {
  renderedPocos: object[];
  securityRoles: SecurityRoles;
  activeTab: MatTab;
  isLoading = true;
  pocoBaseMetadata: PocoBaseMetadata;
  endpointMetadata: IEndPointMetadata[];
  filteredEndpointMetadata: Observable<IEndPointMetadata[]>;

  endpointCategories: string[];
  selectedCategory = '';
  selectedEndpoint: IEndPointMetadata;
  selectedPocos: any[];

  endpointFormControl: FormControl;
  pocoMetadataCategoryFiltered: Observable<PocoMetadata[]>;

  displayedColumns: string[] = undefined;
  pocoKey: string;
  filteredOptions: Subject<IEndPointMetadata[]> = new Subject();

  questions: any[];
  searchFilterAndOrder: SearchFilterAndOrder;
  filterModel: any;
  sortOptions: { property: string, direction: string };

  length = 999;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];

  @ViewChild(MetaTableComponent)
  private metaTableComponent: MetaTableComponent;

  constructor(
      private readonly pocoMetaDataService: PocoMetadataService,
      private readonly pocoSearchService: PocoSearchService,
      private readonly endpointMetadataService: EndpointMetadataService,
      private readonly questionService: QuestionService,
      private readonly pocoRenderingService: PocoRenderingService,
      private readonly pocoCrudService: PocoCrudService,
      private readonly pocoActionsService: ActionsService,
      private readonly router: Router,
      private readonly route: ActivatedRoute,
      private readonly snackBar: MatSnackBar,
      private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.endpointMetadataService
        .getEndPointMetadata()
        .then(response => this.initEndPoints(response))
        .then(x => this.initControls())
        .then(x => {
                      this.route.paramMap.switchMap((params: ParamMap) => this.loadEndpointSelected(params.get('endpoint')))
                                         .subscribe(x => x);
                    });
    this.endpointFormControl = new FormControl();
    this.searchFilterAndOrder = this.buildSearchOrderConstraints();
  }

  initControls() {
    this.selectedCategory = this.endpointMetadata[0].group;
  }

  isTabActive(tab: MatTab) {
    if (tab === this.activeTab || !this.activeTab) {
      this.activeTab = tab;
      return true;
    }
    return false;
  }

  get isLoadingPoco() {
    return this.pocoSearchService.isloading;
  }

  get isFilterApplied() {
    if (this.searchFilterAndOrder && this.searchFilterAndOrder.WhereItems) {
      return this.searchFilterAndOrder.WhereItems.length > 0;
    }

    return false;
  }

  get isOrderApplied() {
    if (this.searchFilterAndOrder && this.searchFilterAndOrder.OrderByItems) {
      return this.searchFilterAndOrder.OrderByItems.length > 0;
    }

    return false;
  }

  initEndPoints(data: IEndPointMetadata[]) {
    if (data === undefined) {
      const action = 'Initializing Editing Options';
      const message = 'No options available';
      this.snackBar.open(action + ' error : ' + message, 'OK');
      return;
    }

    this.endpointMetadata = data;
    this.endpointCategories = this.endpointMetadataService.getPocosMetaDataGroups(this.endpointMetadata);
  }

  onCategoryChange(val: string) {
    this.filteredOptions.next(this.filterEndpointsByName(val));
  }

  filterEndpointsByName(name: string): IEndPointMetadata[] {
      if (!name) {
        return this.endpointMetadata.filter(endpoint => endpoint.group === this.selectedCategory)
      }
      return this.endpointMetadata.filter(endpoint =>
                  endpoint.name.toLowerCase().indexOf(name.toLowerCase()) === 0 &&
                  endpoint.group === this.selectedCategory);
  }

  getDisplayColumns(base: PocoBaseMetadata): string[] {
    const displayColumns: string[] = [];

    displayColumns.push('edit');
    displayColumns.push('select');
    const sorted = base.metadata.sort((a, b): number => a.order < b.order ? -1 : 1 );
    for (const pocoMetadata of base.metadata) {
        if (pocoMetadata['gridshow']) {
            displayColumns.push(pocoMetadata['value']);
        }
    }

    return displayColumns;
  }

  displayFn(poco: IEndPointMetadata): string {
    return poco ? poco.name : 'Something is wrong with the metadata';
  }

  onTabSelection(event: MatTabChangeEvent) {
      this.activeTab = event.tab;
      this.selectedCategory = event.tab.textLabel;
      this.endpointFormControl.setValue('');
      this.filteredOptions.next(this.filterEndpointsByName(''));
      this.selectedEndpoint = undefined;
  }

  test(event: MatAutocompleteSelectedEvent) {
    const opt = event.option.value;
    const selected = this.endpointMetadataService.getEndpointByName(opt);
    this.onEndpointSelected(selected);
  }

  reloadEndpointSelected() {
    this.loadEndpointSelected(this.selectedEndpoint.name);
    this.router.navigate(['/search', this.selectedEndpoint.name]);
  }

  loadEndpointSelected(endpointName: string): Promise<any> {
    const endpoint = this.endpointMetadata.find((item) => item.name === endpointName);
    if (endpoint) {
      this.onEndpointSelected(endpoint);
    }
    return new Promise<any>(resolve => resolve());
  }

  onEndpointSelected(endpoint: IEndPointMetadata) {
    this.resetPageVariables();
    this.selectedEndpoint = endpoint;
    this.router.navigate(['/search', this.selectedEndpoint.name]);
      this.pocoMetaDataService
          .getSecurityRoles(this.selectedEndpoint.name)
          .then(securityRoles => this.securityRoles = securityRoles )
          .then(x => this.pocoMetaDataService.getPocoMetamodel(this.selectedEndpoint.name))
          .then(metadata => {
              this.pocoBaseMetadata = metadata;
              this.pocoKey = this.pocoBaseMetadata.primaryKey;
              this.displayedColumns = this.getDisplayColumns(this.pocoBaseMetadata);
              this.questionService.getQuestions(this.pocoBaseMetadata)
                                  .then(questionsResponse => this.questions = questionsResponse);})
          .then(x => this.getPocos(0, this.pageSize));
  }

  private resetPageVariables() {
    this.selectedEndpoint = undefined;
    this.displayedColumns = undefined;
    this.pocoBaseMetadata = undefined;
    this.filterModel = null;
    this.sortOptions = null;
    this.searchFilterAndOrder = null;
  }

  isLoadingTable() {
    return (this.isLoading);
  }

  isBuildingTable() {
    return (!this.pocoBaseMetadata && !this.displayedColumns);
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

  getPocos(start: number, pageSize: number, filter?: SearchFilterAndOrder) {
    this.isLoading = true;
    this.pocoSearchService.getPocosLikeAllOfThis(this.selectedEndpoint.name, filter, start, pageSize)
        .then(pocos => this.pocoRenderingService.renderPocosViewModel(pocos, this.pocoBaseMetadata.metadata))
        .then(pocos => pocos.subscribe(renderedPocos => this.metaTableComponent.addPocos(renderedPocos)))
        .then(x => this.pocoSearchService.getPocosCount(this.selectedEndpoint.name, filter))
        .then(count => this.metaTableComponent.length = count)
        .then(x => this.finalizeSearch(this.renderedPocos))
        .catch(x => this.failedSearch());
  }

  finalizeSearch(pocos: object[]) {
    //this.metaTableComponent.addPocos(renderedPocos)
    this.isLoading = false;
  }

  failedSearch() {
    //this.metaTableComponent.addPocos([]);
    this.isLoading = false;
  }

  onCreate(): void {
    this.router.navigate(['/create', this.selectedEndpoint.name]);
  }

  onEdit(poco: object): void {
    this.router.navigate(['/edit', this.selectedEndpoint.name, poco[this.pocoKey]]);
  }

  onSearch(filterModel?: any) {
    this.filterModel = filterModel;
    this.searchFilterAndOrder = this.buildSearchOrderConstraints(this.pocoBaseMetadata.metadata,
                                                                  filterModel,
                                                                  this.sortOptions);

    this.getPocos(this.pageIndex, this.pageSize, this.searchFilterAndOrder);
  }

  onPage(options: {pageIndex: number, pageSize: number}) {
    this.pageIndex = options.pageIndex;
    this.pageSize = options.pageSize;
    this.getPocos(this.pageIndex, this.pageSize, this.searchFilterAndOrder);
  }

  onSort(options: {column: string, direction: string}) {
    this.sortOptions = { property: options.column, direction: options.direction };

    this.searchFilterAndOrder = this.buildSearchOrderConstraints(this.pocoBaseMetadata.metadata,
                                                                  this.filterModel,
                                                                  this.sortOptions);
    this.getPocos(this.pageIndex, this.pageSize, this.searchFilterAndOrder);
  }

  showActionOptions(): boolean {
    return this.canExecute(); // || this.canDelete();
  }

  getActionIcon(action: IEndpointAction) {
    switch (action.type.toLowerCase()) {
      case 'fileupload':
        return 'cloud_upload';
      default :
        return 'play_arrow';
    }
  }

  onSelectedItemsChangedEvent(selectedPocos: any[]): void {
    this.selectedPocos = selectedPocos;
  }

  onAction(action: IEndpointAction): void {
    if (this.canExecute()) {
      this.onActionStart(action);
    } else {
      this.openSnackBar('Action ' + action.name.toLowerCase() + ' unavailable. Execute role is required', action.type)
    }
  }

  onActionStart (action: IEndpointAction) {    
    if (!this.selectedPocos || this.selectedPocos.length === 0 ){
      this.openSnackBar('Please select at least 1 ' + this.selectedEndpoint.name +' to perform this action: ' + action.name, 'OK');
      return;
    }
    const selectedCount = this.selectedPocos.length;
    let msg = '\'' + action.name + '\'' + ' on ' + selectedCount + ' ' + this.selectedEndpoint.name;
    msg += this.selectedPocos.length > 1 ? 's ?' : ' ?';
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      width: '300px',
      data: { name: action.name, question: msg }
    });

    dialogRef.afterClosed().subscribe(result => {
        const key = action.key;
        const actionEndpoint = action.url;

        if (result) {
          this.pocoActionsService.startPocoAction(this.selectedPocos, key, actionEndpoint, action, this.pocoKey);
          this.selectedPocos = [];
          this.metaTableComponent.uncheckAll();
        }
    });
  }

  private handleError(error: any, action: string = ''): Promise<any> {
    this.openSnackBar(action, error);
    return Promise.reject(error.message || error);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
    // this.snackBar.openFromComponent(TablePaginationExample)
  }

  get availableActions(): IEndpointAction[] {
    let actions: IEndpointAction[] = [];
    if (this.pocoBaseMetadata.actions) {
      actions = this.pocoBaseMetadata.actions.filter(action => action.applyTo != 'Instance');
    }
    return actions as IEndpointAction[];
  }

  private buildSearchOrderConstraints(metaModel?: PocoMetadata[],
                                      filterModel?: object,
                                      orderProperty?: {property: string, direction: string}): SearchFilterAndOrder {
    const searchConstraints = new Array<SearchConstraint>();
    const searchOrders = new Array<SearchOrder>();

    if (metaModel) {
      for (const metaModelProperty of metaModel) {
        const metaModelPropertyName = metaModelProperty['value'];
        const metamodelPropertyType = metaModelProperty.type.toLowerCase();
        const isPropertySearchableByRange = metamodelPropertyType === 'integer' ||
                                            metamodelPropertyType === 'real' ||
                                            metamodelPropertyType === 'datetime' ||
                                            metamodelPropertyType === 'date';
        const isPropertySearchByLike = metamodelPropertyType === 'text' ||
                                        metamodelPropertyType === 'enumeration' ||
                                        metamodelPropertyType === 'reference';

        // If isPropertySearchableByRange there will be 2 Start and End names
        const filterModelPropertyNames = (filterModel == null) ? [] 
                                       : Object.keys(filterModel)
                                               .filter(x => x.split('::')[0] == metaModelPropertyName);
        
        for (const filterModelPropertyName of filterModelPropertyNames) {
          const filterModelPropertyValue = filterModel[filterModelPropertyName];
          const isSearchableValue = filterModelPropertyValue !== '' && filterModelPropertyValue !== null;
          if (isSearchableValue) {
            if (metamodelPropertyType === 'boolean') {
              const YesNo = filterModelPropertyValue ? 'Y' : 'N';
              const constraint = 'Equals';
              searchConstraints.push(new SearchConstraint('AND', metaModelPropertyName, constraint, metamodelPropertyType, YesNo));
            } else if (isPropertySearchByLike) {
              // const searchValue = modelPropertyValue as string;
              const constraint = 'like';
              const value = SearchConstraint.likeString(filterModelPropertyValue);
              searchConstraints.push(new SearchConstraint('AND', metaModelPropertyName, constraint, metamodelPropertyType, value));
            } else if (isPropertySearchableByRange) {
              const propertyName = filterModelPropertyName.split('::')[0];
              const propertyRangeBoundry = filterModelPropertyName.split('::')[1];
              if (propertyRangeBoundry.toLowerCase() === 'start') {
                const constraint = '>=';
                searchConstraints.push(new SearchConstraint('AND', metaModelPropertyName, constraint, metamodelPropertyType, filterModelPropertyValue));
              } else if (propertyRangeBoundry.toLowerCase() === 'end') {
                const constraint = '<=';
                searchConstraints.push(new SearchConstraint('AND', metaModelPropertyName, constraint, metamodelPropertyType, filterModelPropertyValue));
              } else {
                console.error('property range not set for ' + propertyName);
              }

            }  else {
              const constraint = 'like';
              searchConstraints.push(new SearchConstraint('AND', metaModelPropertyName, constraint, metamodelPropertyType, filterModelPropertyValue.toLowerCase()));
            }
          }
        }
        if (orderProperty && metaModelPropertyName === orderProperty.property && orderProperty.direction) {
          searchOrders.push(new SearchOrder(metaModelPropertyName, orderProperty.direction));
        }
      }
    }

    const filter = new SearchFilterAndOrder(searchConstraints, searchOrders);
    return filter;
  }
}
