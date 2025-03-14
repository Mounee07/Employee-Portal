import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  // Valid credentials
  private validCredentials = {
    username: 'emlogin',
    password: 'emlogin'
  };

  constructor(private fb: FormBuilder, private router: Router) {
    // Initializing the form with dynamic fields
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Both fields are required.';
      return;
    }

    const { username, password } = this.loginForm.value;

    if (username === this.validCredentials.username && password === this.validCredentials.password) {
      console.log('Login successful for:', username);
      this.router.navigate(['/employee-listing']);
    } else {
      this.errorMessage = 'Incorrect username or password.';
    }
  }
}
