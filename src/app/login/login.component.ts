import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false; // New variable to track login status

  // Inject the Router service in the constructor
  constructor(private router: Router) {}

  onSubmit() {
    // Simulating successful login with dummy data
    if (this.email === 'hemanth4@gmail.com' && this.password === '@Hch4444') {
      // Update login status and log the success
      this.isLoggedIn = true;
      console.log('Login successful!', this.email);
      alert("Login Successfully")

      // Navigate to the /customers route after successful login
      this.router.navigate(['/home']);
    } else {
      console.log('Login failed. Please check your credentials.');
    }
  }
}