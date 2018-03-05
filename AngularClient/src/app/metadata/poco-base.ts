import { PocoMetadata } from './pocoMetadata';
import { IEndpointAction } from './endpoint-action';

export interface PocoBaseMetadata {
  description: string;
  label: string;
  metadata: PocoMetadata[];
  name: string;
  primaryKey: string;
  selectorValue: string;
  type: string;  
  actions: IEndpointAction[];
}
