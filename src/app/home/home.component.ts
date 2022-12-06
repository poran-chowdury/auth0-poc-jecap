import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    let authorizationCode;
    authorizationCode = new URLSearchParams( window.location.search).get("code");
    console.log(authorizationCode)
    if (authorizationCode){
      this.exchangeAuthorizationCode(authorizationCode)
    }
  }

  isLoginRoute() {
    return this.router.url !== '/';
  }

  isUserLongedIn() {

    return this.auth.getLoggedIn().valueOf()
  }
  exchangeAuthorizationCode(code: string){
    this.auth.exchangeAuthorizationCode(code,"http://localhost:4200/")
      .subscribe({
        next:value => {
          this.auth.setLoggedInTrue()
          console.log(<string>value.access_token)
          this.auth.setToken(<string>value.access_token)
          console.log(value)
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.log(err)
        }
      })
  }

  logOut() {
    this.auth.logOut().subscribe({
      next:value => {
        window.location.href=value.url;
        this.auth.setLogOutSubject();
      }
    })
    // 'http://localhost:4200/'
  }
}
