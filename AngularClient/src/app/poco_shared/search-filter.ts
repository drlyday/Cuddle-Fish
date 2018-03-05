import { SearchConstraint } from './search-constraint';
import { SearchOrder} from './search-order';

export class SearchFilterAndOrder {
  WhereItems: SearchConstraint[];
  OrderByItems: SearchOrder[];

  constructor (constraints: SearchConstraint[], orders: SearchOrder[]) {
    this.WhereItems = constraints;
    this.OrderByItems = orders;
  }
}
