import { Routes } from '@angular/router'

import { CustomerComponent } from './components/customer/customer.component'
import { BillComponent } from './components/bill/bill.component'
import { PaymentComponent } from './components/payment/payment.component'
import { ExpenseComponent } from './components/expense/expense.component'
import { CompanyComponent } from './components/company/company.component'
import { CompanyPaymentComponent } from './components/company-payment/company-payment.component'
import { CreateTableComponent } from './components/create-table/create-table.component'
import { ViewSummaryComponent } from './components/view-summary/view-summary.component'
import { CompanyBillComponent } from './components/company-bill/company-bill.component'
import { PlacesComponent } from './components/places/places.component'
import { UsersComponent } from './components/users/users.component'

export const CoreRoutes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'summary',
    component: ViewSummaryComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'company-bill',
    component: CompanyBillComponent
  },
  {
    path: 'company-bill/:id',
    component: CompanyBillComponent
  },
  {
    path: 'bill',
    component: BillComponent
  },
  {
    path: 'bill/:id',
    component: BillComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'payment/:id',
    component: PaymentComponent
  },
  {
    path: 'company-payment',
    component: CompanyPaymentComponent
  },
  {
    path: 'company-payment/:id',
    component: CompanyPaymentComponent
  },
  {
    path: 'company-payment/:id',
    component: CompanyPaymentComponent
  },
  {
    path: 'expense',
    component: ExpenseComponent
  },
  {
    path: 'entity/:name',
    component: ExpenseComponent
  },
  {
    path: 'table',
    component: CreateTableComponent
  },
  {
    path: 'places',
    component: PlacesComponent
  },
  {
    path: 'category',
    component: PlacesComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
]
