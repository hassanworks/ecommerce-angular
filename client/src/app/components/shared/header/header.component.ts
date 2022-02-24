import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedinUserName;

  public constructor(private router: Router) {}

  ngOnInit(): void {
    this.decodeToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  decodeToken() {
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.loggedinUserName = decoded.name;
  }
}
