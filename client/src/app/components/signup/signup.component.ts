import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users-api/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userData: any = [];
  allUsers;
  allUsersEmail;

  constructor(private router: Router, private items: UserService) {}

  ngOnInit(): void {}

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get repeatPassword() {
    return this.signupForm.get('repeatPassword');
  }

  registerUser() {
    let formValue = this.signupForm.value;
    if (formValue.password === formValue.repeatPassword) {
      this.items
        .postUser(
          formValue.name,
          formValue.email,
          formValue.password,
          formValue.repeatPassword
        )
        .subscribe(
          (data) => {
            this.router.navigate(['home']);
            this.userData.push({
              name: formValue.name,
              email: formValue.email,
              password: formValue.password,
              repeatPassword: formValue.repeatPassword,
            });
          },
          (err) => {
            alert(err.error);
          }
        );
    } else {
      alert('Password doesnot match');
    }
  }
}
