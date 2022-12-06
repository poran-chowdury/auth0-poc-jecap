import {Component, OnInit} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService,private router:Router) {
  }

  ngOnInit(): void {
  }

  singUp(signUpForm: NgForm) {
    this.auth.signUp({
      username: signUpForm.value.username,
      email: signUpForm.value.email,
      password: signUpForm.value.password
    }).subscribe({
      next: value => {
        console.log(value)
        this.router.navigateByUrl('/login')
      }
    })
  }

  checkPasswordMatch(password: NgModel, confirmPassword: NgModel) {
    return password.value + ''.length !== confirmPassword.value + ''.length || password.value + '' !== confirmPassword.value + '';
  }
}
