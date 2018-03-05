// tslint:disable:import-spacing
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { IEndPointMetadata } from '../metadata/endpointMetadata';
import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { PocoMetadataService } from '../metadata/poco-metadata.service';
import { PocoSearchService } from '../poco_search/poco-search.service';
import { PocoMetadata } from '../metadata/pocoMetadata';
import { PocoBaseMetadata } from '../metadata/poco-base';

import { SecurityTokenService } from '../security/security.token.service';

@Injectable()
export class PocoRenderingService {
  private initializer: Promise<PocoBaseMetadata>;
  private pocoMetadata: PocoMetadata;
  private pocoMetadataRef: PocoBaseMetadata;
  private endpointRef: IEndPointMetadata;

  constructor(private readonly pocoSearchService: PocoSearchService,
              private readonly pocoMetaDataService: PocoMetadataService,
              private readonly endpointMetadataService: EndpointMetadataService) {  }

  renderPocosViewModel(pocos: object[], metamodel: PocoMetadata[]): Observable<object[]> {
    if (!pocos || pocos.length === 0) {
      return Observable.of(new Array<object>());
    }

    const dataRenderers = new Array<Promise<object>>();
    for (const poco of pocos) {
        dataRenderers.push(this.renderPoco(poco, metamodel));
    }
    const newPocos = Observable.forkJoin(dataRenderers);
    return newPocos;
  }

  renderPoco(poco: object, pocoMetamodel: PocoMetadata[]): Promise<object> {
    const pocoProperties = new Array<Promise<{key: string, value: string}>>();

    for (const pocoMetadata of pocoMetamodel) {
      // const pocoKey: string = pocoMetadata['value'];
      pocoProperties.push(this.renderPocoProperty(poco, pocoMetadata));
    }
    const result = Promise.all(pocoProperties).then(values => this.substitutePocoValue(poco, values));
    // with Observables: 
    // const x = Observable.forkJoin(pocoProperties, function(a) { this.substitutePocoValue(poco, a); });
    return result;
  }

  // with Observables: 
  // renderPocoProperty(poco: object, pocoMetadata: PocoMetadata): Observable<{key: string, value: string}> {
  renderPocoProperty(poco: object, pocoMetadata: PocoMetadata): Promise<{key: string, value: string}> {
    let pocoRefValue: Promise<{key: string, value: string}>;

    const pocoKey: string = pocoMetadata['value'];
    const pocoValue: string = poco[pocoKey];
    // const referencePropertyName = pocoMetadata['selectorValue'.replace('$.', '')];
    // const reference = poco[meta['reference']];
    const referenceName = pocoMetadata['reference'];
    let endpointRef: IEndPointMetadata;
    let pocoMetadataRef: PocoBaseMetadata;

    if (referenceName) {
      pocoRefValue = this.endpointMetadataService.getEndPointMetadata()
      .then(x => this.endpointMetadataService.getEndpointByName(referenceName))
      .then(x => endpointRef = x)
      .then(x => this.pocoMetaDataService.getPocoMetamodel(endpointRef.name))
      .then(meta => pocoMetadataRef = meta)
      .then(x => this.pocoSearchService.getPoco(pocoValue, endpointRef.name))
      .then(pocoRef => this.getPocoProperty(pocoKey, pocoRef, pocoMetadataRef))
      .catch(error => pocoRefValue = new Promise(resolve => resolve({key: pocoKey, value: '**ERROR**'})));

      // Chaining with observables
      // Rx.Observable.fromPromise(...)
      // .flatMap(function(result) {
      //  // do something
      // })
      // .flatMap(function(result) {
      //  // do something
      // })
      // .subscribe(function onNext(result) {
      //   // end of chain
      // }, function onError(error) {
      //   // process the error
      // });
    } else {
      // WITH OBSERVABLES
      // pocoRefValue = Observable.of({key: pocoKey, value: pocoKeyValue});
      pocoRefValue = new Promise(resolve => resolve({key: pocoKey, value: pocoValue}));
    }

    return pocoRefValue;
  }

  getPocoProperty(pocoKey, pocoRef, pocoMetadataRef) {
    try {
      if (Array.isArray(pocoRef)){
        pocoRef = pocoRef[0];
      }
      let selectorKey = pocoMetadataRef['selectorValue'].replace('$.', '');
      selectorKey = this.lowerFirstLetter(selectorKey);
      const value = pocoRef[selectorKey];
      return ({ key: pocoKey, value: '**' + value });
    } catch (x) {
      console.error('Failed model reference lookup: ' + x.message);
    }
    return {key: pocoKey, value: '**ERROR: Failed rendering**'};
  }

  initForDropDown(metadata: PocoMetadata, endopointRef: string): Promise<PocoBaseMetadata> {
    this.pocoMetadata = metadata;
    if (!endopointRef) {
      return new Promise(r => r());
    }
    this.initializer = this.endpointMetadataService.getEndPointMetadata()
                        .then(x => this.endpointMetadataService.getEndpointByName(metadata.reference))
                        .then(endpoint => this.pocoMetaDataService.getPocoMetamodel(endpoint.name))
                        .then(meta => this.pocoMetadataRef = meta);

    return this.initializer;
  }

  initForDropDown2(metadata: PocoMetadata, endopointRef: string): Promise<PocoBaseMetadata> {
    this.pocoMetadata = metadata;
    if (!endopointRef) {
      return new Promise(r => r());
    }
    this.initializer = this.endpointMetadataService.getEndPointMetadata()
    .then(x => this.endpointMetadataService.getEndpointByName(metadata.reference))
    .then(endpoint => this.pocoMetaDataService.getPocoMetamodel(endpoint.name));

    return this.initializer;
  }

  getPocosForDropDown(pocoEndpointName: string, value: string,
                      pocoBaseMetadataRef: PocoBaseMetadata): Promise<{key: string, value: string}[]> {

    if (!this.initializer) {
      return new Promise(r => r());
    }

    const pocoAsDropDowns = Observable.forkJoin(this.initializer).toPromise()
                            .then(x => this.pocoSearchService.getPocosLikeThis(pocoEndpointName,
                                                                               value,
                                                                               pocoBaseMetadataRef.selectorValue,
                                                                               pocoBaseMetadataRef.type)
                            .then(pocos => this.getPocoKeyValues(pocos, pocoBaseMetadataRef)));
    // const pocoAsDropDowns = this.endpointMetadataService.getEndPointMetadata()
    // .then(x => this.endpointMetadataService.getEndpointByName(pocoEndpointName))
    // .then(x => endpointRef = x)
    // .then(x => this.pocoMetaDataService.getPocoMetamodel(endpointRef.name))
    // .then(meta => pocoMetadataRef = meta)
    // .then(x => this.pocoSearchService.getPocosWithFilter(endpointRef.name, value, pocoMetadataRef.selectorValue))
    // .then(pocos => this.getPocoKeyValues(pocos, pocoMetadataRef));
    // const pocoAsDropDowns = this.pocoSearchService
    //                             .getPocosWithFilter(this.endpointRef.name, value, this.pocoMetadataRef.selectorValue)
    //                             .then(pocos => this.getPocoKeyValues(pocos, this.pocoMetadataRef));

    return pocoAsDropDowns;
  }

  getPocosByKeyForDropDown(pocoEndpointName: string, key: string,
                           metaBase: PocoBaseMetadata,): Promise<{key: string, value: string}[]> {
    // const pocoAsDropDowns = this.endpointMetadataService.getEndPointMetadata()
    // .then(x => this.endpointMetadataService.getEndpointByName(pocoEndpointName))
    // .then(x => endpointRef = x)
    // .then(x => this.pocoMetaDataService.getPocoMetamodel(endpointRef.name))
    // .then(meta => pocoMetadataRef = meta)
    // .then(x => this.pocoSearchService.getPocosWithFilter(endpointRef.name, value, pocoMetadataRef.selectorValue))
    // .then(pocos => this.getPocoKeyValues(pocos, pocoMetadataRef));

    if (!this.initializer) {
      return new Promise(r => r());
    }

    const pocoAsDropDowns = Observable.forkJoin(this.initializer).toPromise()
                            .then(x => this.pocoSearchService.getPoco(key, pocoEndpointName)
                            .then(pocos => this.getPocoKeyValues([pocos], metaBase)));

    // const pocoAsDropDowns = this.pocoSearchService
    //                             .getPocosWithFilter(this.endpointRef.name, value, this.pocoMetadataRef.selectorValue)
    //                             .then(pocos => this.getPocoKeyValues(pocos, this.pocoMetadataRef));

    return pocoAsDropDowns;
  }

  getPocoKeyValues(pocos: object[], pocoMetadata: PocoBaseMetadata) {
    const keyValues = new Array<{key: string, value: string}>();
    let pocoKey = "errorKey";
    let pocoValue = "errorValue";
    for (const poco of pocos) {
      if (poco) {
        pocoKey = poco[pocoMetadata.primaryKey];
        pocoValue = poco[pocoMetadata.selectorValue];
      }
      const keyValue = { key: pocoKey, value: pocoValue };
      keyValues.push(keyValue);
    }
    return  keyValues;
  }

  private lowerFirstLetter(word: string) {
    return word.charAt(0).toLowerCase() + word.slice(1);
  }

  private substitutePocoValue(poco: object, properties: { key, value }[]): object {
    for (const property of properties){
      poco[property.key] = property.value;
    }
    return poco;
  }
}
