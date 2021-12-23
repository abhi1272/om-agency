import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { SalesOverviewGrapComponent } from './dashboard-components/sales-overview-grap/sales-overview-grap.component';
import { StickerComponent } from './dashboard-components/sticker/sticker.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import {SearchPipe} from '../core/shared/search.pipe'
import { AngularMaterialModule } from 'app/shared/angular-material.module';
import { AreaOverviewGraphComponent } from './dashboard-components/area-overview-graph/area-overview-graph.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // DemoMaterialModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    NgxChartsModule,
    SharedModule,
    RouterModule.forChild(DashboardRoutes),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    BsDatepickerConfig
  ],
  declarations: [DashboardComponent, SearchPipe,
     SalesOverviewGrapComponent,
     StickerComponent, ContactsComponent, ActivityComponent, AreaOverviewGraphComponent
    ]
})
export class DashboardModule { }
