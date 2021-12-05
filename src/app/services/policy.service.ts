import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  url = "http://localhost:8000/api/getAllPolicies"
  constructor(private http : HttpClient) { }

  GetAllPolicies():Observable<any>{
    return this.http.get(this.url);
  }

  GetPolicyById(id:any):Observable<any>{
    var custom_url = this.url + "/" + id;
    return this.http.get(custom_url);
  }

  InsertPolicy(policy_obj:any):Observable<any>{
    return this.http.post(this.url,policy_obj,{headers:{'content-type':'application/json'},responseType:'text'});
  }

  UpdatePolicy(id:any,policy_obj:any):Observable<any>{
    var custom_url = this.url + "/" + id;
    return this.http.put(custom_url,policy_obj,{headers:{'content_type':'application/json'},responseType:'text'})
  }

  DeletePolicy(id:any):Observable<any>{
    var custom_url = this.url + "/" + id;
    return this.http.delete(custom_url,{responseType:'text'});
  }
}
