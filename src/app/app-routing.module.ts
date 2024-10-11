import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './auth/user/user.component';
import { UpdateUserComponent } from './gestionUtilisateur/components/update-user/update-user.component';
import { ConsultationComponent } from './gestionUtilisateur/components/consultation/consultation.component';
import { MutationComponent } from './gestionUtilisateur/components/mutation/mutation.component';
import {GestionInterimComponent} from "./interim/components/gestion-interim/gestion-interim.component";
import { InterimCheckComponent } from './interim/components/interim-check/interim-check.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { InterimdataComponent } from './user/interimdata/interimdata.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [{
  path:"",
  component:LoginFormComponent
  },
  {
    path:"admin",
    component:AdminComponent,children:[
      {path:"user" , component:UserComponent},
      {path:"userUpdate" , component:UpdateUserComponent},
      {path:"consultation" , component:ConsultationComponent },
      {path:"mutation" , component:MutationComponent },
      {path:'interim' , component:GestionInterimComponent},
      {path:"interim-list" , component:InterimCheckComponent}
    ]
  },
  {
    path:"user",
    component:UserComponent
  },{
    path:"userDashboard",
    component:UserDashboardComponent , children:[
      {path:"userProfile" , component:UserProfileComponent},
      {path:"interimData" , component:InterimdataComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
