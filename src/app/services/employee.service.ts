import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   url = "http://localhost:8000/api";
  constructor(private http : HttpClient) { }

  getAllEmployee():Observable<any>{
    var custom_url = this.url+"/getAllEmployee"
    return this.http.get(custom_url)
  }

  calculateTotalSalary(salary_structure:any):Observable<any>{
    var custom_url = "http://localhost:8000/api/totalSalary";
    return this.http.post(custom_url,salary_structure,{headers:{'content-type':'application/json'},responseType:'json'})
  }

  searchById(id:any){
    var custom_url = this.url + "/search_employee_by_id/"+id;
    return this.http.get(custom_url);
  }

  searchByName(name:any){
    var custom_url = this.url + "/search_employee_by_name/"+name;
    return this.http.get(custom_url);
  }

  insertEmployee(employee:any){
    var url = this.url + "/createEmployee"
    return this.http.post(url,employee,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  updateEmmployee(id:any,employee:any){
    var url = this.url + "/updateEmployee/" + id;
    return this.http.put(url,employee,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  deleteEmployee(id:any){
    var url = this.url + "/deleteEmployee/" + id;
    return this.http.delete(url,{responseType:'text'});
  }
}
