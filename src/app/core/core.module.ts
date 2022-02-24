import 'hammerjs'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'

// import { DemoMaterialModule } from '../demo-material-module'
import { CdkTableModule } from '@angular/cdk/table'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

import { CoreRoutes } from './core.routing'

import { CustomerComponent } from './components/customer/customer.component'
import { BillComponent } from './components/bill/bill.component'
import { PaymentComponent } from './components/payment/payment.component'
import { ExpenseComponent } from './components/expense/expense.component'
import { CompanyComponent } from './components/company/company.component'
import { CompanyPaymentComponent } from './components/company-payment/company-payment.component'
import { CreateComponent } from './shared/modals/create/create.component'
import { CreateTableComponent } from './components/create-table/create-table.component'
import { SharedModule } from 'app/shared/shared.module';
import { ViewSummaryComponent } from './components/view-summary/view-summary.component';
import { CompanyBillComponent } from './components/company-bill/company-bill.component';
import { CompanyCreateComponent } from './shared/modals/company-create/company-create.component'
import { ReportComponent } from 'app/report/report.component';
import { PlacesComponent } from './components/places/places.component';
import { UsersComponent } from './components/users/users.component';
import { ActionButtonsComponent } from './shared/mat-custom-table/action-buttons/action-buttons.component'
import { MatCustomTableComponent } from './shared/mat-custom-table/mat-custom-table.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CoreRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    CdkTableModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [
    CustomerComponent,
    BillComponent,
    CreateComponent,
    PaymentComponent,
    ExpenseComponent,
    CompanyComponent,
    CompanyPaymentComponent,
    CreateTableComponent,
    ViewSummaryComponent,
    CompanyBillComponent,
    CompanyCreateComponent,
    PlacesComponent,
    UsersComponent,
    MatCustomTableComponent,
    ActionButtonsComponent,
  ]
})
export class CoreModule { }
