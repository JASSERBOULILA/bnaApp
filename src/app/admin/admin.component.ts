import { Cookie } from './../auth/CookieToken';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { urls } from '../auth/apiUrls';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{



  matriculeNumber: string = "";
  items: Array<MenuItem> = [];
  showSidebar:boolean = true;
  visible: boolean = false;
  profileData:any;
  password:string ="";
  error:any;
  showpopup: boolean = false;
  constructor(private router: Router, private http: HttpClient, private cookie: Cookie, private toast: NgToastService) { }

  async ngOnInit(): Promise<void> {
    try {
      if(this.cookie.getTokenFromCookie()){
        const result: any = await this.http.get(urls.user.getUser, {
          params: { token: this.cookie.getTokenFromCookie() }
        }).toPromise();
        console.log("The User Detail Id ", result);
        this.matriculeNumber = result.matricule;
        console.log("The Matricule Number : ", this.matriculeNumber);

        // Update the label dynamically
        this.updateMatriculeLabel();
      }else{
        this.router.navigateByUrl("");
      }

    } catch (error) {
      console.log("Error During The Fetch Data  : ", error);
    }

    // Initialize the menu items
    this.initializeMenuItems();
  }

  updateMatriculeLabel(): void {
    const matriculeMenuItemIndex = this.items.findIndex(item => item.label?.startsWith('Matricule Number'));
    if (matriculeMenuItemIndex !== -1) {
      this.items[matriculeMenuItemIndex].label = `Matricule Number: ${this.matriculeNumber}`;
    }
  }

  initializeMenuItems(): void {
    this.items = [
      {
        label: "Gestion Utilisateur",
        icon: PrimeIcons.LIST,
        expanded: false,
        items: [
          {
            label: "Ajout Utilisateur",
            icon: PrimeIcons.PLUS,
            expanded: true,
            visible: true,
            command: () => this.handleUser(),
          },
          {
            label: "Modification Utilisateur",
            icon: PrimeIcons.USER_EDIT,
            expanded: true,
            visible: true,
            command: () => this.handleUpdateUser()
          },
          {
            label:"Mutations",
            icon:PrimeIcons.USER_EDIT,
            expanded:true,
            visible:true,
            command:()=>this.router.navigateByUrl("/admin/mutation")
          },
          {
            label:"Gestion Utilisateur",
            icon:PrimeIcons.LIST,
            expanded:true,
            visible:true,
            command:()=>this.router.navigateByUrl("/admin/consultation")
          }
        ],
        visible: true,
      },
      {
        label:"Gestion Interim",
        icon:PrimeIcons.LIST,
        expanded:true,
        visible:true,
        items:[
        {
          label: "Creation Interim",
            icon: PrimeIcons.PLUS,
            expanded: true,
            visible: true,
            command:()=>this.router.navigateByUrl("/admin/interim")
          },
          {
            label:"Interim List",
            icon:PrimeIcons.LIST,
            expanded:true,
            visible:true,
            command:()=>this.router.navigateByUrl("/admin/interim-list")
          }
        ]
      },
      {
        label: "Logout",
        icon: PrimeIcons.SIGN_OUT,
        expanded: false,
        visible: true,
        command: () => this.logout()
      },
      {
        label: `Matricule Number: ${this.matriculeNumber}`,
        visible: true
      },
      {
        label:"Profile",
        visible:true,
        icon:PrimeIcons.USER,
        command:()=>this.showDialog()
      }
    ];
  }

  //error Popup
  showError() {
    console.log('Error fg dfh sdjfhsdj hfsf');
    this.toast.error({ detail: 'ERROR', summary: 'Error Updating Your User', sticky: true });
  }
// Succes Popup
  showSucces() {
    console.log('hhhhh');
    this.toast.success({ detail: 'SUCCESS', summary: 'The User Password Has Updated', duration: 5000 });
  }

  showDialog() {
      this.visible = true;
      this.handleConsultation();
  }

  handleUpdateUser():void{
    console.log("The User Update Clicked : ")
    this.router.navigateByUrl("/admin/userUpdate")
  }

  handleUser(): void {
    console.log("The User Creation Clicked");
    this.router.navigateByUrl("/admin/user");
  }

  async logout(): Promise<void> {
    try {
      await this.http.post(urls.logout, {}).toPromise();
      console.log("The Logout Successfully ");
      this.cookie.clearTokenFromCookie();
      this.router.navigateByUrl("");
    } catch (error) {
      console.log("Error", error);
    }
  }

  async handleConsultation(){
    console.log("THE Consultation Is Pressed ");
    try{
      const token = this.cookie.getTokenFromCookie();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const id = this.matriculeNumber;
      const result:any = await this.http.get(urls.user.getUserByMatriculeF + id , {headers:headers}).toPromise();
      console.log("the result is : " , result);
      //this.profileData = result;
    }catch (error) {
      console.log("Error", error);
    }

  }

  async updateUserPassword(){
    try{

      const token = this.cookie.getTokenFromCookie();
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      const result:any = await this.http.patch(urls.user.updateUserPassword + this.matriculeNumber ,  this.password , {headers:header}).toPromise();
      console.log("the Result is : " , result);
    }catch(error:any){
      console.log("Error Updating the User Password  : " , error );
      this.error = error;
      if (this.error.error.text == "Password updated successfully"){
        await this.showPopup();
        this.showSucces();
        this.visible = false;
      }else{
        await this.showPopup();
        this.showError();
      }
    }
  }
  async showPopup() {
    this.showpopup = true;
  }
}
