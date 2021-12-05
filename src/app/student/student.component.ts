import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css','../employee/employee.component.css']
})
export class StudentComponent implements OnInit {


  constructor(private studentservice: StudentService, private _snackbar : MatSnackBar) { }

  student_list: any = [];
  displayedColumns: any = []
  idToSearch:any = 0;
  updateButton : any = false;

  ngOnInit(): void {
    this.GetAllStudent();
  }

  //Get All Student
  GetAllStudent() {
    this.studentservice.GetAllStudent().subscribe((data) => {
      this.student_list = data;
      this.displayedColumns = Object.keys(data[0]);
      this.displayedColumns.push('Button');
      console.log(data)
    },
      (err) => {
        console.log(err);
      });
  }

 
  //Search by its id
  SearchByID() {
    if (this.idToSearch == 0) {
      return;
    }
    this.studentservice.GetStudentById(this.idToSearch).subscribe(
      (data) => {
        this.student_list = [data];
        
      },
      (err) => {
        console.error(err);
      }
    )
  }

  
  //Student Form
  StudentForm = new FormGroup({
    ID:new FormControl(0),
  Name:new FormControl(''),
  Stream:new FormControl(''),
  Marks:new FormControl(0),
  Address:new FormControl(''),
  Location:new FormControl(''),
  Pincode:new FormControl(0),
  State:new FormControl(''),
  PhoneNumber:new FormControl('')  
  })

  //Submit Form
  onStudentFormSubmit() {
    this.studentservice.CreateStudentRecord(this.StudentForm.value).subscribe((data) => {
      this.StudentForm.reset();
      this.GetAllStudent()
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.error(err);
      })
  }

  //Update Student create Instance
  getUpdateInstance(instance: any) {
    var obj = { ...instance };
    delete obj['createdAt'];
    delete obj['updatedAt'];
    this.StudentForm.setValue(obj);
    this.updateButton = true;
  }

  //Update Student Event
  updateStudent() {
    var update_obj = {
      Name:this.StudentForm.value.Name,
      Stream:this.StudentForm.value.Stream,
      Marks:this.StudentForm.value.Marks,
      Address:this.StudentForm.value.Address,
      Location:this.StudentForm.value.Location,
      Pincode:this.StudentForm.value.Pincode,
      State:this.StudentForm.value.State,
      PhoneNumber:this.StudentForm.value.PhoneNumber  
    }
    this.studentservice.UpdateStudentRecord(this.StudentForm.value.ID, update_obj).subscribe((data) => {
      this.GetAllStudent();
      this.StudentForm.reset();
      this.updateButton = false;
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.log(err);
      })
  }

  //Delete Student Instance
  deleteStudent(id: any) {
    this.studentservice.DeleteStudentRecord(id).subscribe((data) => {
      this.GetAllStudent();
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.log(err);
      })
  }


}
