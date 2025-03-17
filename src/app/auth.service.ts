import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): Observable<any> {
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('userToken', 'dummy-jwt-token'); // Store token
      return of({ success: true });
    } else {
      return of({ success: false });
    }
  }
}
