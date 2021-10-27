import { Routes } from '@angular/router'
import { AuthGuard } from './guard/auth.guard'

import { FullComponent } from './layouts/full/full.component'
import { LoginComponent } from './core/components/users/login/login.component'
import { RegisterComponent } from './core/components/users/register/register.component'

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
          () => import('./core/core.module').then(m => m.CoreModule),
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
]
