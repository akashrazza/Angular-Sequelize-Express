import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../employee/employee.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private userservice : UserServiceService, private _snackbar : MatSnackBar) { }
  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  });
  ngOnInit(): void {
  }
  UserCredentialfalg:string="";
  onSubmit(){
    
    this.userservice.AuthinticateUser(this.loginForm.value).subscribe((data)=>{
      
        this.UserCredentialfalg = data
        this.loginForm.reset();
        this.router.navigate(['main']);
    },err=>{
      this.UserCredentialfalg=err.error;
      console.log(err)
    })
  }

  //SignUp form

  Signupform = new FormGroup({
    user : new FormControl(''),
    password : new FormControl(''),
    role: new FormControl('')
  })
  onSubmitSignupForm(){
    this.userservice.signup(this.Signupform.value).subscribe((data)=>{
      this._snackbar.open(data,"Close");
      this.Signupform.reset();
    },
    (err)=>{
      console.log(err);
    })
  }
}
