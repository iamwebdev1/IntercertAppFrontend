import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-create-user',
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css']
})
export class CreateUser {
  signupForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    // Initialize the form
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.intercertEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Custom validator for email domain
  intercertEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !email.endsWith('@intercert.com')) {
      return { intercertEmail: true };
    }
    return null;
  }


  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }

  // Submit function
  onUserCreate() {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload = this.signupForm.value;

    this.adminService.createUser(payload).subscribe({
      next: (res) => {
        alert("User created Successfully");
        this.successMsg = 'User created successfully!';
        this.signupForm.reset();
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to create user';
      }
    });
  }
}
