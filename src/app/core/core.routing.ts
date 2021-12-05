import { Routes } from '@angular/router'

import { CustomerComponent } from './components/customer/customer.component'
import { BillComponent } from './components/bill/bill.component'
import { PaymentComponent } from './components/payment/payment.component'
import { ExpenseComponent } from './components/expense/expense.component'
import { CompanyComponent } from './components/company/company.component'
import { CompanyPaymentComponent } from './components/company-payment/company-payment.component'
import { CreateTableComponent } from './components/create-table/create-table.component'
import { ViewSummaryComponent } from './components/view-summary/view-summary.component'

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
  }
]
