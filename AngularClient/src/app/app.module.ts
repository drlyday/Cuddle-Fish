import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MaterialModule } from './app-material.module';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './app.component';

import { PocoCreateComponent } from './poco_create/poco_create.component';

// Imports for loading & configuring the in-memory web api
// tslint:disable-next-line:max-line-length
// How include webapimodule? https://stackoverflow.com/questions/37377529/angular2-tutorial-tour-of-heroes-cannot-find-module-angular2-in-memory-web-a
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
// import { InMemoryDataService }  from './in-memory-data.service';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppModuleShared,
    MaterialModule
  ],
  exports: [
    MaterialModule,    
    AppModuleShared
  ],
  declarations: [    
    PocoCreateComponent,
  ],
  providers: [  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
