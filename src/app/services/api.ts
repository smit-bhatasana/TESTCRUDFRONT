import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Model/department';
import { Employee } from '../Model/employee';
import { EmployeeDetail } from '../Model/employee-detail';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7082/api';

  constructor(private http: HttpClient) {}

  // Department APIs
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/Department`);
  }

  addDepartment(data: Department): Observable<any> {
    return this.http.post(`${this.baseUrl}/Department`, data);
  }

  updateDepartment(id: number, data: Department): Observable<any> {
    return this.http.put(`${this.baseUrl}/Department/${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Department/${id}`);
  }

  // Employee APIs
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/Employee`);
  }

  addEmployee(data: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/Employee`, data);
  }

  updateEmployee(id: number, data: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/Employee/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Employee/${id}`);
  }

  // Employee Details APIs
  getEmployeeDetails(): Observable<EmployeeDetail[]> {
    return this.http.get<EmployeeDetail[]>(`${this.baseUrl}/EmployeeDetails`);
  }

  addEmployeeDetail(data: EmployeeDetail): Observable<any> {
    return this.http.post(`${this.baseUrl}/EmployeeDetails`, data);
  }

  updateEmployeeDetail(id: number, data: EmployeeDetail): Observable<any> {
    return this.http.put(`${this.baseUrl}/EmployeeDetails/${id}`, data);
  }

  deleteEmployeeDetail(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/EmployeeDetails/${id}`);
  }
}