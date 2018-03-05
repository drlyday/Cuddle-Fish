import { IEndpointAction } from './endpoint-action';

export interface IEndPointMetadata {
  description: string;
  group: string;
  label: string;
  icon: string;
  name: string;
  type: string;
  serviceEndPoint: string;
  uiEndPoint: string;
  actions: IEndpointAction[];
}
