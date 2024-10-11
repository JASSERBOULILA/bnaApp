import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cookie} from "../auth/CookieToken";
import {urls} from "../auth/apiUrls";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn:'root'
})

export class UserService{

  constructor(
    private http:HttpClient,
    private cookie:Cookie,

  ) {
  }

  async getUsersFromToken(token:string){
    try{
      const tokne:string = this.cookie.getTokenFromCookie();
      const params = new HttpParams().set('token', tokne);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const result:any= await this.http.get(urls.user.getUser , {params:params , headers:headers}).toPromise() ;
      console.log("the result is : " , result);
      return result;
    }catch (error:any){
      console.log("Error Getting User from Token :" , error);
      return error;
    }
  }
}
