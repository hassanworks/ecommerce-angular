import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { UserService } from 'src/app/services/users-api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData: any = [];
  verifyUser;
  allUsers;
  userId;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  public onLoginClick() {
    let formValue = this.loginForm.value;
    this.loginService.postLogin(formValue.email, formValue.password).subscribe(
      (data) => {
        if (!data.hasOwnProperty('token')) {
          console.log(data.hasOwnProperty);
          return;
        }
        localStorage.setItem('token', JSON.stringify(data));
        this.router.navigate(['/home']);
        this.userData.push({
          email: formValue.email,
          password: formValue.password,
        });
      },
      (err) => {
        alert('Incorrect email or password');
      }
    );
  }
}
