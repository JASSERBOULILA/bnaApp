import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Role, User } from '../../../auth/user/user';
import { Cookie } from '../../../auth/CookieToken';
import { urls } from '../../../auth/apiUrls';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-mutation',
  templateUrl: './mutation.component.html',
  styleUrl: './mutation.component.css'
})
export class MutationComponent {

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
  error:any = "";
  showpopup:boolean = false;
  constructor(private http:HttpClient , private cookie:Cookie , private toast:NgToastService){
  }

  async onChangeMatricule():Promise<void>{
    console.log("The Matricule Number Is : " , this.userData.matricule);
    if(this.userData.matricule.length == 4){
      console.log("The Urls Of the Update  : " , urls.user.updateUser + this.userData.matricule);
      const params = new HttpParams().set("matricule" , this.userData.matricule);
      const token = this.cookie.getTokenFromCookie();
      const headers = {'Authorization':`Bearer ${token}`};


      try{
        const result:any = await this.http.get(urls.user.getUserByMatricule,{params , headers}).toPromise();
        console.log("The Result Is : " , result);
        this.userData = result;
        this.error = null;

      }catch(error:any){
        console.log("Error Fetching User : " , error);
      }
    }else{
      console.log("Still The Number Isnt Right ");
    }
  }

  async updateCodeStructure():Promise<void>{
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}`};
    try{
      const result:any = await this.http.patch(urls.user.updateUserRole + this.userData.matricule ,this.userData , {headers}).toPromise();
      console.log("The Result :" , result);
      this.userData = result;
      this.showSucces();
    }catch(error:any){
      console.log("Error Updating  : " , error);
      this.error = error;
    }
  }

  showError() {
    console.log('Error fg dfh sdjfhsdj hfsf');
    this.toast.error({ detail: 'ERROR', summary: 'Error Updating Your User', sticky: true });
  }

  showSucces() {
    console.log('hhhhh');
    this.toast.success({ detail: 'SUCCESS', summary: 'The User Been Updated', duration: 5000 });
  }

  async showPopup() {
    this.showpopup = true;
    await this.updateCodeStructure();
  }


}
