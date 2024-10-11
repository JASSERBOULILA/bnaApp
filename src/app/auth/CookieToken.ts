import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class Cookie{
constructor(private cookieService:CookieService){
}

setTokenInCookie(token: string):void {
  // Set cookie with HTTPOnly and Secure flags
  this.cookieService.set('e', token, {secure: true });
  // Set cookie expiration time (adjust as needed)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1); // Token expires in 1 days
  this.cookieService.set('et', expiryDate.toISOString(), { secure: true });
}

// Method to retrieve token from cookie
getTokenFromCookie():string{
  return this.cookieService.get('e');
}

// Method to clear token from cookie (logout)
clearTokenFromCookie():void {
  this.cookieService.deleteAll('e');
  this.cookieService.delete('e', '/admin', '', true, 'Strict');
  this.cookieService.delete('et', '/admin', '', true, 'Strict');
  this.cookieService.delete('e', '/', '', true, 'Strict');
  this.cookieService.delete('et', '/', '', true, 'Strict');
}
}
