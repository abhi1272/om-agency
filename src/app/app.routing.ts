import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './material-component/components/users/login/login.component';
import { RegisterComponent } from './material-component/components/users/register/register.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivateChild: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
