import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    this.errorMessage = '';

    // Check if form is invalid
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Login successful for:', username);
          localStorage.setItem('userToken', response.token);
          this.router.navigate(['/employee-listing']);
        } else {
          this.errorMessage = 'Incorrect username or password.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}
