// tslint:disable:import-spacing
import { NgModule, APP_INITIALIZER }        from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }                 from '@angular/common/http';

import { MaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }     from './app.component';
import { DynamicFormComponent } from './dynamic_form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic_form/dynamic-form-question.component';
import { DialogDeleteComponent }   from './dialog/delete/dialog-delete.component';
import { DialogFileUploadComponent } from './dialog/fileUpload/dialog-fileupload.component';
import { DialogYesNoComponent } from './dialog/yesNo/dialog-yesNo.component';
import { MetaTableComponent } from './metatable/meta-table.component';
import { PocoSearchComponent } from './poco_search/poco_search.component';
import { PocoEditComponent } from './poco_edit/poco_edit.component';
import { PocoSearchFilterComponent } from './poco_search_filter/poco_search_filter.component';

import { QuestionService } from './dynamic_form/question.service';
import { PocoCrudService } from './poco_shared/poco-crud.service';
import { ActionsService } from './poco_shared/poco-actions.service';
import { PocoFormattingService } from './poco_shared/poco-formatting.service';
import { PocoSearchService } from './poco_search/poco-search.service';
import { PocoRenderingService } from './poco_shared/poco-rendering.service';
import { PocoMetadataService } from './metadata/poco-metadata.service';
import { EndpointMetadataService } from './metadata/endpoint-metadata.service';

import { CanActivateViaAuthGuard } from './security/auth.guard';
import { SecurityService }         from './security/security.service';
import { SecurityTokenService }    from './security/security.token.service';

import { ConfigurationService }    from './configuration/configuration.service';

// Imports for loading & configuring the in-memory web api
// tslint:disable-next-line:max-line-length
// How include webapimodule? https://stackoverflow.com/questions/37377529/angular2-tutorial-tour-of-heroes-cannot-find-module-angular2-in-memory-web-a
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
// import { InMemoryDataService }  from './in-memory-data.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
  ],
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    MetaTableComponent,
    PocoSearchComponent,
    PocoEditComponent,
    PocoSearchFilterComponent,
    DialogDeleteComponent,
    DialogFileUploadComponent,
    DialogYesNoComponent
  ],
  providers: [
    QuestionService,
    PocoCrudService,
    ActionsService,
    PocoSearchService,
    PocoMetadataService,
    PocoFormattingService,
    EndpointMetadataService,
    SecurityService,
    SecurityTokenService,
    CanActivateViaAuthGuard,
    PocoRenderingService,
    ConfigurationService
  ],
  entryComponents: [DialogDeleteComponent, DialogFileUploadComponent, DialogYesNoComponent]
})

export class AppModuleShared {
}
