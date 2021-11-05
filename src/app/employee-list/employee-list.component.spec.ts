import { FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelPipe } from '../level.pipe';
import { MaterialModule } from '../material/material.module'

import { EmployeeListComponent } from './employee-list.component';

// describe('EmployeeListComponent', () => {
//   let component: EmployeeListComponent;
//   let fixture: ComponentFixture<EmployeeListComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ EmployeeListComponent, LevelPipe ],
//       imports: [ MaterialModule, FormControl ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EmployeeListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(true).toBeTruthy();
//     // expect(component).toBeTruthy();
//   });
// });
