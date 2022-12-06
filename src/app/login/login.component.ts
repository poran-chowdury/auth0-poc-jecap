import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {AuthService, LoginResponse} from "../auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirectUrl = "http://localhost:4000"
  private subs: Subscription[] = [];
  public error = '';
  private isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onclickLoginSubmit(loginFrom: NgForm) {

    this.auth.login({
      username: loginFrom.value.username,
      password: loginFrom.value.password,
      scope:"openid offline_access email",
      audience:"https://localhost:8081"
    }).subscribe({
      next: value => {
        if (this.error) {
          this.error = ""
        }
        this.auth.setLoggedInTrue()

        console.log(value.access_token)
        this.auth.setToken(<string>value?.access_token)
        console.log(value)
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = err['error']
      },
      complete: () => {
        console.log("complete")

      }
    })
  }

  loginWithGoogle() {
    this.auth.loginWthGoogle().subscribe({
        next: value => {
          window.location.href=value.url;
        }
      }
    )
  }
}
