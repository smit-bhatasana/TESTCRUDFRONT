import { Routes } from '@angular/router';

import { DepartmentsComponent } from './components/departments/departments';
import { EmployeesComponent } from './components/employees/employees';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'departments',
    pathMatch: 'full'
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'employees',
    component: EmployeesComponent
  },
  {
    path: 'employee-details',
    component: EmployeeDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'departments'
  }
];