// tslint:disable:import-spacing
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocoSearchComponent }     from './poco_search/poco_search.component';
import { PocoEditComponent }       from './poco_edit/poco_edit.component';
import { PocoCreateComponent }     from './poco_create/poco_create.component';
import { CanActivateViaAuthGuard } from './security/auth.guard';
import {APP_BASE_HREF} from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full'},
  { path: 'search', component: PocoSearchComponent},
  { path: 'search/:endpoint', component: PocoSearchComponent },
  { path: 'create/:endpoint', component: PocoCreateComponent },
  { path: 'edit/:endpoint/:id', component: PocoEditComponent},
  { path: 'copy/:endpoint/:id', component: PocoCreateComponent},
  // { path: 'create/:endpoint', component: PocoCreateComponent, canActivate: [CanActivateViaAuthGuard]  },
  // { path: 'edit/:endpoint/:id', component: PocoEditComponent, canActivate: [CanActivateViaAuthGuard]  },
  // { path: 'copy/:endpoint/:id', component: PocoCreateComponent, canActivate: [CanActivateViaAuthGuard]  },
  // { path: 'edit/:id', component: PocoEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
                                    {
                                        enableTracing: false, // <-- debugging purposes only
                                    }) ],
  exports: [ RouterModule ], 
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule {}

