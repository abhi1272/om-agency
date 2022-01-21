import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReportComponent } from './report.component'
import { RouterModule } from '@angular/router'
import { ReportRoutes } from './report.routing'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { SharedModule } from 'app/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    BsDatepickerModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule { }
