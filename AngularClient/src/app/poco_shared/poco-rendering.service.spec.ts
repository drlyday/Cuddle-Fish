/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { async, fakeAsync,
            ComponentFixture,
            ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppModuleShared } from '../app.module.shared';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import {
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInput,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatProgressBar,
        MatDialogModule,
        MatCheckboxModule
        } from '@angular/material';
// tslint:disable:import-spacing
import { PocoRenderingService }  from './poco-rendering.service';
import { QuestionService }       from '../dynamic_form/question.service';
import { PocoFormattingService } from '../poco_shared/poco-formatting.service';
import { SecurityTokenService }  from '../security/security.token.service';
import { IEndPointMetadata }     from '../metadata/endpointMetadata';
import { PocoMetadata }          from '../metadata/pocoMetadata';
import { PocoBaseMetadata }      from '../metadata/poco-base';
import { SecurityRoles }         from '../security/securityRoles';
import { SecurityRolesKnown }    from '../security/securityRolesKnown';

import { EndpointMetadataService } from '../metadata/endpoint-metadata.service';
import { PocoMetadataService }     from '../metadata/poco-metadata.service';
import { PocoSearchService }       from '../poco_search/poco-search.service';

import { SecurityData }                from '../testing/security.data';
import { PocoSearchServiceMock }       from '../testing/poco-search.service.mock';
import { PocoMetadataServiceMock }     from '../testing/poco-metadata.service.mock';
import { EndpointMetadataServiceMock } from '../testing/endpoint-metadata.service.mock';
import { PocoMetadataMock } from '../testing/poco-metamodel.data';
import { PocoDataMock } from '../testing/poco.data';
import { tick } from '@angular/core/testing';

//let component: PocoRenderingService;
//let fixture: ComponentFixture<PocoRenderingService>;

describe('poco rendering service', () => {
    let renderedPocos : any[];
    let renderedPocosWithReferences : any[];

    const meta = new PocoMetadataMock();
    const pocos = new PocoDataMock();
    const pocos_original = new PocoDataMock();

    // async beforeEach
    beforeEach(async(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
        const endpointMetadataService = new EndpointMetadataServiceMock();
        const pocoSearchServiceMock = new PocoSearchServiceMock();
        const pocoMetadataServiceMock = new PocoMetadataServiceMock();
        const renderingService = new PocoRenderingService(pocoSearchServiceMock as PocoSearchService, 
                                                          pocoMetadataServiceMock as PocoMetadataService, 
                                                          endpointMetadataService as EndpointMetadataService);
               
        const renderer = renderingService.renderPocosViewModel(pocos_original.businessTypes4Count,
                                                               meta.businessType.metadata);
        renderer.subscribe(x => {
                                renderedPocos = x;
                            });

        const rendererWithReferences = renderingService.renderPocosViewModel(pocos.regulatoryMktTimezone5Count, 
                                                                             meta.rgltMktTimezone.metadata);

         rendererWithReferences.subscribe(x => {
                                            renderedPocosWithReferences = x;
                                        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
    });

    afterEach(() => {

    });

    it('should render 4 Pocos', () =>
    {       
        expect(renderedPocos.length).toEqual(4); 
    });

    it('should render pocos which match the original pocos', () =>
    {      
        let count = 0;
        renderedPocos.forEach(rendered => {
            const match = pocos_original.businessTypes4Count.filter(original => original['businessTypeCd'] === rendered['businessTypeCd']);
            expect(match.length).toBe(1); 
        });
        renderedPocos.forEach(rendered => {
            const match = pocos_original.businessTypes4Count.filter(original => original['businessTypeDesc'] === rendered['businessTypeDesc']);
            expect(match.length).toBe(1); 
        });
    });

    it('should render 5 pocos', () =>
    {
        expect(renderedPocosWithReferences.length).toEqual(5);
    });

    it('should render correct references for 5 pocos', () =>
    {
        let count = 0;
        renderedPocosWithReferences.forEach(rendered => {
            const match = pocos.regulatoryMktTimezone5Count.filter(original => original['rgltMktTimezoneKey'] === rendered['rgltMktTimezoneKey']);
            expect(match.length).toBe(1);
            expect(match[0]['regulatoryReportKey']).toBe("**EQR");
            expect(match[0]['marketKey']).toBe("**New England nMarket Power ");
            expect(match[0]['regulatoryTimezoneKey']).toBe("**EP");
        });
    });

    // it('should not render 4 Pocos', () =>
    // {       
    //     expect(renderedPocos.length).toEqual(4); 
    // });
});
