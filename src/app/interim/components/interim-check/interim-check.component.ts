import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cookie } from '../../../auth/CookieToken';
import { urls } from '../../../auth/apiUrls';

@Component({
  selector: 'app-interim-check',
  templateUrl: './interim-check.component.html',
  styleUrl: './interim-check.component.css'
})
export class InterimCheckComponent implements OnInit{

  data:Array<any> = [];
  error:any = "";

  constructor(
    private http:HttpClient,
    private cookie:Cookie) {
  }

  ngOnInit(){
    this.getData();
  }
  isLastPage(): unknown {
    throw new Error('Method not implemented.');
    }
    next() {
    throw new Error('Method not implemented.');
    }
    reset() {
    throw new Error('Method not implemented.');
    }
    isFirstPage(): unknown {
    throw new Error('Method not implemented.');
    }
    prev() {
    throw new Error('Method not implemented.');
    }

  async getData():Promise<void>{
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}` };
    try{
      const result :any = await this.http.get(urls.interim.getAllInterim , {headers}).toPromise();
      console.log("the result is : " , result);
      this.data = result;
    }catch(error:any){
      console.log("Error Fetching the data : " , error);
    }
  }
}
