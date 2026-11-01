import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api';
import { Department } from '../../Model/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.html'
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];

  department: Department = this.emptyDepartment();

  isEdit = false;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  emptyDepartment(): Department {
    return {
      departmentId: 0,
      departmentName: '',
      description: ''
    };
  }

  loadDepartments(): void {
    this.api.getDepartments().subscribe({
      next: data => {
        this.departments = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Unable to load departments.';
      }
    });
  }

  saveDepartment(): void {
    if (!this.department.departmentName.trim()) {
      this.errorMessage = 'Department name is required.';
      return;
    }

    const request = this.isEdit
      ? this.api.updateDepartment(
          this.department.departmentId,
          this.department
        )
      : this.api.addDepartment(this.department);

    request.subscribe({
      next: () => {
        this.loadDepartments();
        this.resetForm();
      },
      error: error => {
        this.errorMessage =
          error.error?.message || 'Unable to save department.';
      }
    });
  }

  editDepartment(item: Department): void {
    this.department = { ...item };
    this.isEdit = true;
    this.errorMessage = '';
  }

  deleteDepartment(id: number): void {
    if (!confirm('Are you sure you want to delete this department?')) {
      return;
    }

    this.api.deleteDepartment(id).subscribe({
      next: () => this.loadDepartments(),
      error: error => {
        this.errorMessage =
          error.error?.message || 'Unable to delete department.';
      }
    });
  }

  resetForm(): void {
    this.department = this.emptyDepartment();
    this.isEdit = false;
    this.errorMessage = '';
  }
}