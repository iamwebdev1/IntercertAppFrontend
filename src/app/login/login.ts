import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  loading = false;

  loggedIn!: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  

  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          this.intercertEmailValidator
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });

  }

  // Custom validator for domain check
  intercertEmailValidator(control: AbstractControl) {
    const value = control.value;
    if (value && !value.endsWith('@intercert.com')) {
      return { intercertEmail: true };
    }
    return null;
  }


  // Getters for easy access in template
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }



  onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const formData = {
      email: this.username?.value,
      password: this.password?.value
    };

    this.auth.login(formData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Login successful!');
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert(err.error.message || 'Invalid credentials');
        this.loading = false;
      },
    });
  }
}
