import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { PolicyComponent } from './policy/policy.component';
import { StudentComponent } from './student/student.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  // {path:'employee',component:EmployeeComponent},
  // {path:'policy',component:PolicyComponent},
  // {path:'student',component:StudentComponent},
  {path:'main',component:TabsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
