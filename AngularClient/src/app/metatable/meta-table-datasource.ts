import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class MetaTableDataSource extends DataSource<any> {
  constructor(private dataChange: BehaviorSubject<object[]>,
              private readonly paginator: MatPaginator,
              private readonly sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<object[]> {

    const displayDataChanges = [
        this.dataChange
        // , this.sort
        // this.paginator.page
    ];

    return Observable.merge(...displayDataChanges)
                     .map(() => { const data = this.dataChange.value;
                                  return data; });
  }

  disconnect() {}
}

