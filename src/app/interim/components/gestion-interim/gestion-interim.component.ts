import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../../auth/user/user";
import {HttpClient} from "@angular/common/http";
import {Cookie} from "../../../auth/CookieToken";
import {NgToastService} from "ng-angular-popup";
import {urls} from "../../../auth/apiUrls";

@Component({
  selector: 'app-gestion-interim',
  templateUrl: './gestion-interim.component.html',
  styleUrl: './gestion-interim.component.css'
})
export class GestionInterimComponent implements OnInit {
  userData: User = {
    firstname: '',
    lastname: '',
    matricule: '',
    role: Role.USER,
    email: '',
    cin: '',
    status: '',
    structure: '',
    codeDivision: ''
  };
  debut:Date = new Date();
  fin:Date = new Date();
  userId:Number =0;
  error: any = '';
  matriculeArray:any[] = [];
  showpopup: boolean = false;
  constructor(private http: HttpClient, private cookie: Cookie, private toast: NgToastService) {}

  ngOnInit():void{
    this.allMatricule();
  }

  async createNewInterim(){
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}`};
    try{
      const body = {matricule:this.userData.matricule,debut:this.debut , fin:this.fin ,userId:this.userId}
      const interimCreate : any = await this.http.post(urls.interim.createInterim , body , {headers:headers}).toPromise();
        console.log("the creation of the interim is : " , interimCreate);
      this.showSucces();
    }catch (error:any){
      console.log("the Error : " , error);
      this.showError();
    }
  }

  async allMatricule(){
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}` };
    try{
      const usersData:any = await this.http.get(urls.user.getAllUsers , {headers:headers}).toPromise();
      console.log("all Users is : " , usersData);
      this.matriculeArray = usersData;
    }catch (error:any){
      console.log("Error Fetching Matricule" , error);
      this.showError();
    }
  }

  showError() {
    console.log('Error fg dfh sdjfhsdj hfsf');
    this.toast.error({ detail: 'ERROR', summary: 'Error Creating the interim', sticky: true });
  }

  showSucces() {
    console.log('hhhhh');
    this.toast.success({ detail: 'SUCCESS', summary: 'The Creation of interim with succes', duration: 5000 });
  }

  async showPopup() {
    this.showpopup = true;
    await this.createNewInterim();
  }
}
