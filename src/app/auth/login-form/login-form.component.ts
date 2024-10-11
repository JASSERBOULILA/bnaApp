import { NgToastService } from 'ng-angular-popup';
import { Cookie } from './../CookieToken';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { urls } from '../apiUrls';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

@Injectable()
export class LoginFormComponent {
  showpopup: boolean = false;
    matricule:string="";
    password :string="";
    email:string="";
    passwordFieldType: string = 'password';
    error:string ="";
    passwordVisible:boolean =false;
    logoUrl = 'src/assets/images/1_bna.png';
    toggleMask:boolean = true;
    firstTime:boolean = false;
    secondTime:boolean = false;
  constructor(
    private http:HttpClient ,
    private router:Router ,
    private cookie : Cookie,
    private toast:NgToastService
  ){

  }
  onPasswordChange(){
    console.log(this.password);
  }
  onpasswordChange(){
    console.log(this.matricule);
    this.passwordValid();
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  public async login() {
    let loginData: any = {
      matricule: this.matricule,
      password: this.password
    };
    console.log("The Login Data: ", loginData);

    try {
      // If firstTime is true, check the password for email
      let passwordCheck: any;
      if (this.firstTime) {
        const params = new HttpParams()
          .set('passwords', this.password)
          .set('matricule', this.matricule);

        passwordCheck = await this.http.get(urls.user.checkPassword, { params }).toPromise();
        console.log("The password check result: ", passwordCheck);

        // If password has been updated, continue to login
        if (passwordCheck.message !== "The User Password Has Been Updated") {
          console.error("Password update check failed.");
          return; // Exit if the password hasn't been updated
        }
      }

      // Proceed with login if firstTime is false or password check passed
      const result: any = await this.http.post(urls.authentications, loginData).toPromise();
      console.log("The Token Result: ", result);

      if (result && result.access_token) {
        console.log("The Token Result Is: ", result.access_token);

        // Retrieve user role and navigate accordingly
        const role: any = await this.http.get(urls.user.getUser, {
          params: { token: result.access_token }
        }).toPromise();

        this.cookie.setTokenInCookie(result.access_token);
        console.log("The User Data Is: ", role);

        switch (role.role) {
          case "ADMIN":
            console.log("The Role Is: Admin");
            this.router.navigateByUrl("/admin");
            break;
          case "USER":
            console.log("The Role Is: User");
            this.router.navigateByUrl("/userDashboard");
            break;
          default:
            console.error("Unknown role.");
        }
      }
    } catch (error: any) {
      console.error("An error occurred:", error);
      if (error.status === 403) {
        this.error = "Check Your Password And Matricule Number.";
      } else if (error.status === 200) {
        this.error = error.error.text;
      }
      console.log("The Error Message Now: ", this.error);
    }
  }


  showSucces() {
    console.log('hhhhh');
    this.toast.success({ detail: 'SUCCESS', summary: 'The Email Has Sent', duration: 5000 });
  }

  showError() {
    console.log('Error fg dfh sdjfhsdj hfsf');
    this.toast.error({ detail: 'ERROR', summary: 'Error Sending The Email', sticky: true });
  }

  onEmailChange(){
    console.log(this.email);
    this.sendEmail();
  }

  public async passwordValid() {
    try {
      if(this.matricule.length == 4){
        const result: any = await this.http.get(urls.user.changePasswordOnEmail + this.matricule).toPromise();
        console.log("the result of the first time is :" , result);
        if(result.firstTime == true){
          console.log("hhh first time : ")
          this.firstTime = true;
          this.secondTime = false;
          if(this.email){
            const params = new HttpParams().set('email', this.email);
            const result :any = await this.http.get(urls.user.sendEmail + this.matricule , {params}).toPromise();
            console.log("hi hi hi hi hi hi hi ",result);
          }
        }

        if (result && result.firstTime == false) {
          console.log(result);
          this.firstTime = false;
          this.secondTime = true;
        }
      }
    } catch (error: any) {
      console.error("An error occurred:", error);
    }
  }

  showPopup() {
    this.showpopup = true;
    console.log("the showup pop up : " , this.showpopup);
  }
  public async sendEmail(){
    try{
        if(this.email.includes("@gmail.com")){
          this.error="";
          const params = new HttpParams().set('recipientEmail', this.email);
          console.log("the emila : " , params);
          const result :any = await this.http.get(urls.user.sendEmail, {params}).toPromise();
          console.log(result);
        }else{
          this.error = "Please Enter a valid Email";
        }
    }catch(error:any){
      console.log("The Error :" , error);
      console.log("the error status is :" , error.status);
      if(error.status === 200 ){
        this.secondTime = true;
        this.showpopup= true;
        this.showSucces();
        this.showPopup();


      }else{
        this.showPopup();
        this.showError();
        // this.showPopup();
      }
    }
  }



  public cancel(){
    this.matricule= "";
    this.password= "";
  }
}
