import { NgModule } from '@angular/core'

import { MenuItems } from './menu-items/menu-items'
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion'

import { SelectComponent } from './UI/select/select.component'
import { AngularMaterialModule } from './angular-material.module'
import { CommonModule } from '@angular/common';
import { JsonTableCreationComponent } from './json-table/json-table-creation/json-table-creation.component';
import { ColFilterComponent } from './json-table/col-filter/col-filter.component';
import { AddRemoveColComponent } from './json-table/add-remove-col/add-remove-col.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SelectComponent,
    JsonTableCreationComponent,
    ColFilterComponent,
    AddRemoveColComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SelectComponent,
    JsonTableCreationComponent,
    ColFilterComponent,
    AddRemoveColComponent,
  ],
  providers: [MenuItems]
})
export class SharedModule { }
