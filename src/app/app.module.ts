import { TagModule } from 'primeng/tag';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Form, FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './auth/user/user.component';
// import { MenuComponent } from './menu/menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { Cookie } from './auth/CookieToken';
import { CookieService } from 'ngx-cookie-service';
import { SidebarModule } from 'primeng/sidebar';
// import { UserTypeComponent } from './user-type/user-type.component';
import { NgToastModule } from 'ng-angular-popup';
import { UpdateUserComponent } from './gestionUtilisateur/components/update-user/update-user.component';
import { ConsultationComponent } from './gestionUtilisateur/components/consultation/consultation.component';
import { MutationComponent } from './gestionUtilisateur/components/mutation/mutation.component';
import { TableModule } from 'primeng/table';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from "primeng/dialog";
import { GestionInterimComponent } from './interim/components/gestion-interim/gestion-interim.component';
import { InterimCheckComponent } from './interim/components/interim-check/interim-check.component';
import { InterimComponentComponent } from './interim/layout/interim-component/interim-component.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { InterimdataComponent } from './user/interimdata/interimdata.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
// import { InterimComponent } from './interim/interim.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AdminComponent,
    UserComponent,
    // MenuComponent,
    // UserTypeComponent,
    UpdateUserComponent,
    ConsultationComponent,
    MutationComponent,
    GestionInterimComponent,
    InterimCheckComponent,
    InterimComponentComponent,
    UserDashboardComponent,
    InterimdataComponent,
    UserProfileComponent,
    // InterimComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        FormsModule,
        InputGroupModule,
        InputTextModule,
        FloatLabelModule,
        HttpClientModule,
        MessagesModule,
        PanelMenuModule,
        MenubarModule,
        SidebarModule,
        NgToastModule,
        TableModule,
        BrowserModule,
        BrowserAnimationsModule,
        TagModule,
        DialogModule,
        FullCalendarModule,

    ],
  providers: [HttpClient , CookieService , Cookie ],
  bootstrap: [AppComponent]
})
export class AppModule { }
