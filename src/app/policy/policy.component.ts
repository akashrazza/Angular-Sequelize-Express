import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../services/policy.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css','../employee/employee.component.css']
})
export class PolicyComponent implements OnInit {

  
  constructor(private policyservice: PolicyService, private _snackbar : MatSnackBar) { }

  policy_list: any = [];
  displayedColumns: any = []
  idToSearch:any = 0;
  updateButton : any = false;

  ngOnInit(): void {
    this.GetAllPolicy();
  }

  //Get All Employee
  GetAllPolicy() {
    this.policyservice.GetAllPolicies().subscribe((data) => {
      this.policy_list = data;
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
    this.policyservice.GetPolicyById(this.idToSearch).subscribe(
      (data) => {
        this.policy_list = data;
        
      },
      (err) => {
        console.error(err);
      }
    )
  }

  
  //Policy Form
  PolicyForm = new FormGroup({
    PolicyNumber: new FormControl(''),
    PolicyHoldersName: new FormControl(''),
    PolicyAmount: new FormControl(''),
    MaturityAmount: new FormControl(''),
    Nominee: new FormControl('')
  })

  //Submit Form
  onPolicyFormSubmit() {
    this.policyservice.InsertPolicy(this.PolicyForm.value).subscribe((data) => {
      this.PolicyForm.reset();
      this.GetAllPolicy()
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.error(err);
      })
  }

  //Update Policy create Instance
  getUpdateInstance(instance: any) {
    var obj = { ...instance };
    delete obj['createdAt'];
    delete obj['updatedAt'];
    this.PolicyForm.setValue(obj);
    this.updateButton = true;
  }

  //Update Policy Event
  updatePolicy() {
    this.policyservice.UpdatePolicy(this.PolicyForm.value.PolicyNumber, { PolicyHoldersName: this.PolicyForm.value.PolicyHoldersName, PolicyAmount: this.PolicyForm.value.PolicyAmount, MaturityAmount: this.PolicyForm.value.MaturityAmount, Nominee: this.PolicyForm.value.Nominee }).subscribe((data) => {
      this.GetAllPolicy();
      this.PolicyForm.reset();
      this.updateButton = false;
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.log(err);
      })
  }

  //Delete Policy Instance
  deletePolicy(id: any) {
    this.policyservice.DeletePolicy(id).subscribe((data) => {
      this.GetAllPolicy();
      this._snackbar.open(data,"Close")
    },
      (err) => {
        console.log(err);
      })
  }


}
