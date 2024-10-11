import {Component, Input, OnInit} from '@angular/core';
import { Role, User } from '../../../auth/user/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cookie } from '../../../auth/CookieToken';
import { urls } from '../../../auth/apiUrls';
import { TableModule } from 'primeng/table';
import {Inplace} from "primeng/inplace";
import {UserService} from "../../../services/user.services";

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})

export class ConsultationComponent implements OnInit {

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

  userData: User = {
    firstname: '',
    lastname: '',
    matricule: '',
    role: Role.USER,
    email: '',
    cin: "",
    status: '',
    structure: '',
    codeDivision: ""
  };
  data:Array<any> = [];
  error:any = "";
  userMatricule:string ="";
  showpopup:boolean = false;
  constructor(private http:HttpClient
              , private cookie:Cookie
              ,private userService:UserService){
  }
  ngOnInit():void{
    this.allUsers();
    this.userService.getUsersFromToken(this.cookie.getTokenFromCookie())
      .then(data=>{
        console.log("The User From Token Is : " , data);
        this.userMatricule = data.matricule;
      });
  }

  getSeverity(status: string):any {
    switch (status) {
        case 'actif':
            return 'success';
        case 'notActif':
            return 'danger';
        case "Actif":
          return "succes";
    }
}

  async allUsers():Promise<void>{
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}`};
    try{
      const result:any = await this.http.get(urls.user.getAllUsers , {headers}).toPromise();
      console.log("The Result Is : " , result);
      this.data = result;
    }catch(error:any){
      console.log("Error fetching the Result ;");
    }
  }

  async onChangeMatricule():Promise<void>{
    if(this.userData.matricule.length == 4){
      console.log("The Urls Of the Update  : " , urls.user.updateUser + this.userData.matricule);
      const params = new HttpParams().set("matricule" , this.userData.matricule);
      const token = this.cookie.getTokenFromCookie();
      const headers = {'Authorization':`Bearer ${token}`};


      try{
        const result:any = await this.http.get(urls.user.getUserByMatricule,{params , headers}).toPromise();
        console.log("The Result Is : " , result);
        this.userData = result;
      }catch(error:any){
        console.log("Error Fetching User : " , error);
      }
    }else{
      console.log("Still The Number Isnt Right ");
    }
  }

  async updateUser():Promise<void>{
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}`};
    try{
      const userForUpdate:any = await this.http.patch(urls.user.updateUserRole + this.userData.matricule , this.userData , {headers}).toPromise();
      console.log("The User Update Request Is : " , userForUpdate);
      this.error= null;
    }catch(error:any){
      console.log("Error Updating User " , error);
      this.error = error;

    }
  }
  async deleteUser(id:Number):Promise<void>{
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}`};
    try{
      const result:any = await this.http.delete(urls.user.deleteUser + id , {headers}).toPromise();
      console.log("The Result Is : " , result);
      this.error = null;
      this.allUsers();
    }catch(error:any){
      console.log("Error Deleting User " , error);
      this.error = null;
      this.allUsers();
    }
  }

  protected readonly sessionStorage = sessionStorage;
}
