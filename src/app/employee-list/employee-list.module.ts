import { MaterialModule } from './../material/material.module';
import { EmployeeListComponent } from './employee-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LevelPipe } from '../level.pipe';


@NgModule({
  declarations: [ EmployeeListComponent, LevelPipe ],
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [EmployeeListComponent]
})
export class EmployeeListModule { }
