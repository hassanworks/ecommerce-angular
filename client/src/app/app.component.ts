import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return this.loginService.loggedIn();
  }
}
