import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }
  
  url : string = "http://localhost:8000/api/student";

  GetAllStudent():Observable<any>{
    return this.http.get(this.url);
  }

  GetStudentById(id:any):Observable<any>{
    var custom_url = this.url + "/" + id;
    return this.http.get(custom_url);
  }

  CreateStudentRecord(student_obj:any):Observable<any>{
    return this.http.post(this.url,student_obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  UpdateStudentRecord(id:any,student_obj:any):Observable<any>{
    var custom_url = this.url + "/" + id;
    return this.http.put(custom_url,student_obj,{headers:{'content_type':'application/json'},responseType:'text'})
  }
  DeleteStudentRecord(id:any):Observable<any>{
    var custom_url = this.url + "/" + id;
    return this.http.delete(custom_url,{responseType:'text'})
  }

}
