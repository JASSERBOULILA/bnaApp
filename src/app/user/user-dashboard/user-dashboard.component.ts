import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { urls } from '../../auth/apiUrls';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cookie } from '../../auth/CookieToken';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {

  items: Array<MenuItem> = [];
  matriculeNumber: string = "";
  constructor(private router: Router, private http: HttpClient, private cookie: Cookie, private toast: NgToastService){
    this.initializeMenuItems();
  }

  async ngOnInit(): Promise<void>{
    try {
      if(this.cookie.getTokenFromCookie()){
        const result: any = await this.http.get(urls.user.getUser, {
          params: { token: this.cookie.getTokenFromCookie() }
        }).toPromise();
        console.log("The User Detail Id ", result);
        this.matriculeNumber = result.matricule;
        console.log("The Matricule Number : ", this.matriculeNumber);

        // Update the label dynamically
      }else{
        this.router.navigateByUrl("");
      }

    } catch (error) {
      console.log("Error During The Fetch Data  : ", error);
    }
  }

  initializeMenuItems(): void {
    this.items = [
      {
        label: "Profile",
        icon: PrimeIcons.USER,
        expanded: false,
        visible: true,
        command:()=>this.router.navigateByUrl("userDashboard/userProfile")
      },
      {
        label:"interim",
        icon:PrimeIcons.DATABASE,
        expanded:true,
        visible:true,
        command:()=>this.router.navigateByUrl("userDashboard/interimData")
      },
      {
        label: "Logout",
        icon: PrimeIcons.SIGN_OUT,
        expanded: false,
        visible: true,
        command: () => this.logout()
      }
    ];
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

}

