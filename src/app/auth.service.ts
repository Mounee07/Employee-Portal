import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { id: 1, username: 'admin', password: 'password123', role: 'admin' },
    { id: 1, username: 'john.doe', password: 'john123', role: 'employee' },
    { id: 2, username: 'jane.smith', password: 'jane123', role: 'employee' },
    { id: 3, username: 'michael.j', password: 'michael123', role: 'employee' },
    { id: 4, username: 'emily.d', password: 'emily123', role: 'employee' }
  ];

  login(username: string, password: string): Observable<any> {
    const user = this.users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem('userToken', 'dummy-jwt-token'); // Store token
      localStorage.setItem('userRole', user.role); // Store user role
      localStorage.setItem('userId', user.id.toString()); // ✅ Store User ID
  
      return of({ success: true, role: user.role, id: user.id });
    } else {
      return of({ success: false });
    }
  }
  
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
  
}
