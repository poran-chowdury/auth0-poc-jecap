import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

export interface UserProfileInfo {
  sub:string,
  email:string,
  nickname:string,
  name:string,
  picture:string,
  updated_at:string,
  userId:string,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   userProfile:UserProfileInfo= {
     sub:"",
     email:"",
     nickname:"",
     name:"",
     picture:"",
     updated_at:"",
     userId:''
   }
  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.loggedIn()) {
      this.router.navigate(['/login'])
    } else if (this.auth.getToken() !== null) {
      this.getUserProfileInformation();
      this.auth.tokenExchange().subscribe({
        next: (value:any) => {
          console.log(value)
        }
      })
    }

  }

  getUserProfileInformation() {
    this.auth.getUserInfo().subscribe({
      next: value => {
        this.userProfile=value
      }
    });
  }

  loggedIn() {
    return this.auth.getLoggedIn();
  }
}
