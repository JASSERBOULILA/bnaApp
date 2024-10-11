import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { urls } from '../apiUrls';
import { User , Role } from './user';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpwhbVmceaOtxo2HUE-q-7cdhbXD1uG7RLLOIrcBKZ_oEqUNWMy65SvRu8JpRVslDV7g&usqp=CAU';
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
  roleOptions: { label: string; value: Role }[] = [
    { label: 'User', value: Role.USER },
    { label: 'Admin', value: Role.ADMIN }
  ];
  passwordFieldType: string = 'password';
  error:any = "";
  passwordVisible:boolean =false;
  toggleMask:boolean = true;
  showpopUp:boolean = false;
  constructor(private http:HttpClient , private router:Router , private toast: NgToastService){
  }

  public async Create(){
    try{
      console.log("The User Detail " , this.userData);
      const result:any = await this.http.post(urls.user.registerUser , this.userData).toPromise();
      console.log("The Result Of The Submit : " , result);
      this.error = result;
    }catch(error:any){
      console.log("The Error :" , error);
      this.error = error;
      console.log("Error Is : " , this.error);
    }
  }
  showSucces(){
    console.log("hhhhh")
    this.toast.success({detail:"SUCCESS" , summary:'Your Succes Message' , duration:5000})
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }
  public cancel(){
    this.userData.firstname= "";
    this.userData.lastname= "";
    this.userData.cin= "";
    this.userData.codeDivision="";
    this.userData.email="";
    this.userData.matricule="";
    this.userData.role=Role.USER;
  }
  showError() {
    console.log("Error fg dfh sdjfhsdj hfsf");
    this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
  }
  async showPopup(){
    this.showpopUp = true;
    await this.Create();
    if(this.error.access_token){
      this.showSucces();
    }else{
      this.showError();
    }

  }
}
