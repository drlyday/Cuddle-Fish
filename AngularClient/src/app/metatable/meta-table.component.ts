import { Component, Input, Output, ViewChild,
         OnInit, EventEmitter, AfterViewChecked} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort, PageEvent, Sort,
         MatSnackBar, MatCheckboxChange } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { PocoMetadata } from '../metadata/PocoMetadata';
import { IEndPointMetadata } from '../metadata/endpointMetadata';
import { MetaTableDataSource } from './meta-table-datasource';

@Component({
  selector: 'meta-table',
  styleUrls: ['meta-table.component.css'],
  templateUrl: 'meta-table.component.html',
})

// tslint:disable-next-line:component-class-suffix
export class MetaTableComponent implements OnInit {

  @Input() pocoMetamodel: PocoMetadata[];
  @Input() pocoMetamodelDisplayColumns: string[] = [];
  @Input() endpoint: IEndPointMetadata;
  @Input() canUpdate: boolean;
  @Input() pocoKey: string;
  @Output() onPageEvent = new EventEmitter<{pageIndex: number, pageSize: number}>();
  @Output() onSortEvent = new EventEmitter<{column: string, direction: string}>();
  @Output() onEditEvent = new EventEmitter<any>();
  @Output() onSelectedItemsChangedEvent = new EventEmitter<any>();

  dataSource: MetaTableDataSource | null;
  selectedItems: any[] = [];

  length = 999;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];
  availableItems: any[] = [];

  headerSelected = false;

  /** Stream that emits whenever the data has been modified. */
  dataChange = new BehaviorSubject<object[]>([]);
  get data(): object[] { return this.dataChange.value; }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {  }

  ngOnInit() {
    this.dataSource = new MetaTableDataSource(this.dataChange, this.paginator, this.sort);
  }

  addPocos(newPocos: object[]) {
    this.resetSelections();
    newPocos.forEach(x => x['selected'] = false);
    newPocos.forEach(x => this.availableItems.push(x));
    this.dataChange.next(newPocos);
  }

  onPage(page: PageEvent) {
    this.onPageEvent.emit({ pageIndex: page.pageIndex, pageSize: page.pageSize });
  }

  onSort(sort:  Sort) {
    this.onSortEvent.emit({column: sort.active, direction: sort.direction});
  }

  onEdit(poco: any) {
    this.onEditEvent.emit(poco);
  }

  onSelected(poco: any, event: MatCheckboxChange){
    this.manageSelections(poco, event.checked);
  }

  resetSelections() {
    this.selectedItems = [];
    this.availableItems = [];
    this.headerSelected = false;
    this.onSelectedItemsChangedEvent.emit(this.selectedItems);
  }

  manageSelections(item: any, selected: boolean){
    const index = this.selectedItems.indexOf(item);

    if (selected && index === -1) {
      // The UI is bound to .selected and enables programmatic control of checkboxes
      item['selected'] = true;
      this.selectedItems.push(item);
    } else {
      if (!selected && index > -1) {
        item['selected'] = selected;
        this.headerSelected = selected;
        this.selectedItems.splice(index, 1);
      }
    }

    this.onSelectedItemsChangedEvent.emit(this.selectedItems);
  }

  onHeaderSelected(event: MatCheckboxChange) {
    this.headerSelected = event.checked;
    this.availableItems.forEach(x => this.manageSelections(x, this.headerSelected));
  }

  uncheckAll() {
    this.headerSelected = false;
    this.availableItems.forEach(x => this.manageSelections(x, this.headerSelected));
  }
}
