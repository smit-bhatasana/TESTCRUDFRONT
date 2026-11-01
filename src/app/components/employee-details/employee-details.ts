import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api';
import { EmployeeDetail } from '../../Model/employee-detail';
import { Employee } from '../../Model/employee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-details.html'
})
export class EmployeeDetailsComponent implements OnInit {

  details: EmployeeDetail[] = [];
  employees: Employee[] = [];

  detail: EmployeeDetail = this.emptyDetail();

  isEdit = false;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDetails();
    this.loadEmployees();
  }

  emptyDetail(): EmployeeDetail {
    return {
      employeeDetailId: 0,
      employeeId: 0,
      phone: '',
      address: '',
      joiningDate: ''
    };
  }

  loadDetails(): void {
    this.api.getEmployeeDetails().subscribe({
      next: data => this.details = data,
      error: () => {
        this.errorMessage = 'Unable to load employee details.';
      }
    });
  }

  loadEmployees(): void {
    this.api.getEmployees().subscribe({
      next: data => this.employees = data,
      error: () => {
        this.errorMessage = 'Unable to load employees.';
      }
    });
  }

  saveDetail(): void {
    if (
      this.detail.employeeId <= 0 ||
      !this.detail.joiningDate
    ) {
      this.errorMessage = 'Please select an employee and joining date.';
      return;
    }

    const request = this.isEdit
      ? this.api.updateEmployeeDetail(
          this.detail.employeeDetailId,
          this.detail
        )
      : this.api.addEmployeeDetail(this.detail);

    request.subscribe({
      next: () => {
        this.loadDetails();
        this.resetForm();
      },
      error: error => {
        this.errorMessage =
          error.error?.message || 'Unable to save employee details.';
      }
    });
  }

  editDetail(item: EmployeeDetail): void {
    this.detail = {
      ...item,
      joiningDate: item.joiningDate.substring(0, 10)
    };

    this.isEdit = true;
    this.errorMessage = '';
  }

  deleteDetail(id: number): void {
    if (!confirm('Are you sure you want to delete these details?')) {
      return;
    }

    this.api.deleteEmployeeDetail(id).subscribe({
      next: () => this.loadDetails(),
      error: error => {
        this.errorMessage =
          error.error?.message || 'Unable to delete employee details.';
      }
    });
  }

  getEmployeeName(id: number): string {
    return this.employees.find(
      e => e.employeeId === id
    )?.employeeName ?? 'Unknown';
  }

  resetForm(): void {
    this.detail = this.emptyDetail();
    this.isEdit = false;
    this.errorMessage = '';
  }
}