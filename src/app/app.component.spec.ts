import { MaterialModule } from './material/material.module';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

// fdescribe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         MaterialModule
//       ],
//       declarations: [
//         AppComponent,
//         EmployeeListComponent
//       ],
//     }).compileComponents();
//   }));

//   fit('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'angular-performance'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('angular-performance');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('.content span').textContent).toContain('angular-performance app is running!');
//   });
// });
