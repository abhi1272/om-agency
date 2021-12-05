
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutes } from './app.routing'
import { AppComponent } from './app.component'

import { FlexLayoutModule } from '@angular/flex-layout'
import { FullComponent } from './layouts/full/full.component'
import { AppHeaderComponent } from './layouts/full/header/header.component'
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { DemoMaterialModule } from './demo-material-module'

import { CachingInterceptor } from './cache/caching-interceptor.service';

import { SharedModule } from './shared/shared.module'
import { SpinnerComponent } from './shared/spinner.component'
import { ToastrModule } from 'ngx-toastr'
import { LoginComponent } from './core/components/users/login/login.component'
import { RegisterComponent } from './core/components/users/register/register.component'
import { HttpLoaderComponent } from './core/components/http-loader/http-loader.component'

import { JwtInterceptor } from './interceptor/jwt.interceptor'
import { ErrorInterceptor } from './interceptor/error.interceptor'
import { LoaderInterceptor } from './interceptor/loader-interceptor'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { AngularMaterialModule } from './shared/angular-material.module';
import { LoaderService } from './core/services/loader.service'

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    RegisterComponent,
    HttpLoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    ToastrModule.forRoot(),
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
