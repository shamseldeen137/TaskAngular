import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMoneyService {
  constructor(private http: HttpClient) { }
  sendMoney(senderPhone: string,recieverOhone: string, value: number) {
    return this.http.post<any>(`https://localhost:44356/api/transaction/send-money`, { SenderphoneNumber: senderPhone,phoneNumber:recieverOhone, value: value })
        .pipe(map(res => {
            // login successful if there's a jwt token in the response
            if (res ) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(res));
            }

            return res;
        }));
}

}
