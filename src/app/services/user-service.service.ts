import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }
  url = "http://localhost:8000/api/login"
  AuthinticateUser(user_obj:any):Observable<any>{
    return this.http.post(this.url,user_obj,{headers:{'content-type':'application/json'},responseType:'text'});
  }
  signup(user_obj:any):Observable<any>{
    var url = "http://localhost:8000/api/signup"
    return this.http.post(url,user_obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }
}
