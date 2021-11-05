import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { LevelPipe } from './level.pipe';
import { EmployeeListModule } from './employee-list/employee-list.module';
import { SelectivePreloadingStrategyService } from './services/preloading-strategy.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    EmployeeListModule
  ],
  providers: [ SelectivePreloadingStrategyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
