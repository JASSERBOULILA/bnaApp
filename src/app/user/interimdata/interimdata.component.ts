import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Cookie } from '../../auth/CookieToken';
import { urls } from '../../auth/apiUrls';
@Component({
  selector: 'app-interimdata',
  templateUrl: './interimdata.component.html',
  styleUrl: './interimdata.component.css'
})
export class InterimdataComponent implements OnInit{

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Kounji', start: new Date()  , end:'2024-10-20'}
    ]
  };

  constructor(private http:HttpClient , private cookie:Cookie){
  }

  ngOnInit(){
    this.loadInterimData();
  }


  async loadInterimData(){
    const token = this.cookie.getTokenFromCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try{
      const userMatricule = "4245";
      const result =await this.http.get(urls.interim.getInterimByMatricule  + userMatricule, {headers}).toPromise();
      console.log("the result is : " ,result);
    }catch(error:any){
      console.log("Error Fetching the interim data : " , error);
    }
  }


}
