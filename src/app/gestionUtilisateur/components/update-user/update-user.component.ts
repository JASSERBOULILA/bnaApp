import { Component } from '@angular/core';
import { Role, User } from '../../../auth/user/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { urls } from '../../../auth/apiUrls';
import { Cookie } from '../../../auth/CookieToken';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
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
  error: any = '';
  showpopup: boolean = false;

  constructor(private http: HttpClient, private cookie: Cookie, private toast: NgToastService) {}

  async onChangeMatricule(): Promise<void> {
    if (this.userData.matricule.length === 4) {
      console.log('The Urls Of The Update:', urls.user.updateUser + this.userData.matricule);

      // Create HttpParams for the request
      const params = new HttpParams().set('matricule', this.userData.matricule);
      // Retrieve the token from the cookie service
      const token = this.cookie.getTokenFromCookie();
      const headers = { 'Authorization': `Bearer ${token}` };

      try {
        const result: any = await this.http.get(urls.user.getUserByMatricule, { params, headers }).toPromise();
        console.log('The Result Is:', result);
        console.log('The Data Before:', this.userData);
        this.userData = result;
        console.log('THE Result After:', this.userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    } else {
      console.log("Still The Number Isn't Right");
    }
  }

  async updateUser(): Promise<void> {
    const token = this.cookie.getTokenFromCookie();
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const userForUpdate: any = await this.http.put(urls.user.updateUser + this.userData.matricule, this.userData, { headers }).toPromise();
      console.log('The User Update Request Is:', userForUpdate);
      this.error = null;
      this.showSucces();
    } catch (error) {
      console.error('Error updating user:', error);
      this.error = error;
      this.showError();
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
    await this.updateUser();
  }
}
