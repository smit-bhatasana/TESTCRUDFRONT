import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api';
import { Employee } from '../../Model/employee';
import { Department } from '../../Model/department';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html'
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  departments: Department[] = [];

  employee: Employee = this.emptyEmployee();

  isEdit = false;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  emptyEmployee(): Employee {
    return {
      employeeId: 0,
      employeeName: '',
      email: '',
      salary: 0,
      departmentId: 0
    };
  }

  loadEmployees(): void {
    this.api.getEmployees().subscribe({
      next: data => this.employees = data,
      error: () => {
        this.errorMessage = 'Unable to load employees.';
      }
    });
  }

  loadDepartments(): void {
    this.api.getDepartments().subscribe({
      next: data => this.departments = data,
      error: () => {
        this.errorMessage = 'Unable to load departments.';
      }
    });
  }

  saveEmployee(): void {
    if (
      !this.employee.employeeName.trim() ||
      !this.employee.email.trim() ||
      this.employee.departmentId <= 0 ||
      this.employee.salary < 0
    ) {
      this.errorMessage = 'Please enter valid employee details.';
      return;
    }

    const request = this.isEdit
      ? this.api.updateEmployee(
          this.employee.employeeId,
          this.employee
        )
      : this.api.addEmployee(this.employee);

    request.subscribe({
      next: () => {
        this.loadEmployees();
        this.resetForm();
      },
      error: error => {
        this.errorMessage =
          error.error?.message || 'Unable to save employee.';
      }
    });
  }

  editEmployee(item: Employee): void {
    this.employee = { ...item };
    this.isEdit = true;
    this.errorMessage = '';
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.api.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: error => {
        this.errorMessage =
          error.error?.message || 'Unable to delete employee.';
      }
    });
  }

  getDepartmentName(id: number): string {
    return this.departments.find(
      d => d.departmentId === id
    )?.departmentName ?? 'Unknown';
  }

  resetForm(): void {
    this.employee = this.emptyEmployee();
    this.isEdit = false;
    this.errorMessage = '';
  }
}