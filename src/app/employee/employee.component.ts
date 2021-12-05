import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private EmployeeService: EmployeeService, private _snackbar : MatSnackBar) { }

  Employee_list: any = [];
  displayedColumns: any = []
  calculatedSalary = 0
  idToSearch: any = 0;
  nameToSearch: any = "";
  InsertStatus: any = "";
  UpdateStatus: any = "";
  deletedStatus: any = "";
  updateButton: any = false;

  ngOnInit(): void {
    this.GetAllEmployee();
  }

  //Get All Employee
  GetAllEmployee() {
    this.EmployeeService.getAllEmployee().subscribe((data) => {
      this.Employee_list = data;
      this.displayedColumns = Object.keys(data[0]);
      this.displayedColumns.push('Button');
      console.log(data)
    },
      (err) => {
        console.log(err);
      });
  }

  //Total Salary Form
  TotalSalaryForm = new FormGroup({
    basic: new FormControl(0),
    hra: new FormControl(0),
    da: new FormControl(0),
    it: new FormControl(0),
    pf: new FormControl(0)
  })

  //On Submit of Total Salary Form
  onSubmitTotalSalaryForm() {
    this.EmployeeService.calculateTotalSalary(this.TotalSalaryForm.value).subscribe((data) => {
      this.calculatedSalary = data.total_salary;
    },
      (err) => {
        console.log(err);
      })
  }

  //Search by its id
  SearchByID() {
    if (this.idToSearch == 0) {
      return;
    }
    this.EmployeeService.searchById(this.idToSearch).subscribe(
      (data) => {
        this.Employee_list = data;
        console.log(data)
      },
      (err) => {
        console.error(err);
      }
    )
  }

  //Search By name
  SearchByName() {
    if (this.nameToSearch == 0) {
      return;
    }
    this.EmployeeService.searchByName(this.nameToSearch).subscribe(
      (data) => {
        this.Employee_list = data;
        console.log(data)
      },
      (err) => {
        console.error(err);
      }
    )
  }

  //Employee Form
  EmployeeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    dept: new FormControl(''),
    designation: new FormControl('')
  })

  //Submit Form
  onEmployeeFormSubmit() {
    this.EmployeeService.insertEmployee(this.EmployeeForm.value).subscribe((data) => {
      this.InsertStatus = data;
      this.EmployeeForm.reset();
      this.GetAllEmployee()
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.error(err);
      })
  }

  //Update Employee create Instance
  getUpdateInstance(instance: any) {
    var obj = { ...instance };
    delete obj['createdAt'];
    delete obj['updatedAt'];
    this.EmployeeForm.setValue(obj);
    this.updateButton = true;
  }

  //Update EMployee Event
  updateEmployee() {
    this.EmployeeService.updateEmmployee(this.EmployeeForm.value.id, { name: this.EmployeeForm.value.name, dept: this.EmployeeForm.value.dept, designation: this.EmployeeForm.value.designation }).subscribe((data) => {
      this.UpdateStatus = data;
      this.GetAllEmployee();
      this.EmployeeForm.reset();
      this.updateButton = false;
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.log(err);
      })
  }

  //Delete Employee Instance
  deleteEmployee(id: any) {
    this.EmployeeService.deleteEmployee(id).subscribe((data) => {
      this.deletedStatus = data;
      this.GetAllEmployee();
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.log(err);
      })
  }

}
