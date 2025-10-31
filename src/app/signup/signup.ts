import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { intercertEmailValidator } from '../validators/customValidator';

@Component({
  selector: 'app-signup',
  imports :[CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup implements OnInit {

  signupForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,intercertEmailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  onSignup() {
    if (this.signupForm.invalid) return;

    this.loading = true;
    const userData = this.signupForm.value;

    this.auth.signup(userData).subscribe({
      next: (res) => {
        alert('Signup successful! Please login.');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.message || 'Signup failed');
        this.loading = false;
      },
    });
  }
}
