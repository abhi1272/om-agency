import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BillComponent } from './components/bill/bill.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyPaymentComponent } from './components/company-payment/company-payment.component';

export const MaterialRoutes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent
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
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  }
];
