import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserProfileInfo} from "./dashboard/dashboard.component";

export interface LoginRequest {
  username: string | null,
  password: string | null,
  scope:string,
  audience:string,
}

export interface LoginResponse {
  url: string;
  access_token: string
  idToken: string;
  scope:string;
}

export interface SignUpRequest {
  username: string,
  email: string,
  password: string
}

export interface LogOutResponse {
  url: string;
}

export interface AuthorizeUrl {
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:8080/auth"
  // baseUrl = "http://microservices.seliselocal.com/api/java-identity/auth"
  private loggedIn = new BehaviorSubject<Boolean>(false);
  private token = new BehaviorSubject<String>("");


  constructor(private http: HttpClient) {

  }

  login(req: LoginRequest) {

    return this.http.post<LoginResponse>(this.baseUrl + "/login", req,{
      withCredentials: true
    });
  }

  signUp(req: SignUpRequest) {
    return this.http.post(this.baseUrl + '/signUp', req);
  }

  exchangeAuthorizationCode(code: string, redirectUrl: string) {
    return this.http.post<LoginResponse>(this.baseUrl + "/exchangeCode/login/token", {
      code,
      scope: "openid email offline_access",
      redirectUrl,
    },{
        withCredentials: true
      }
      )
  }

  public logOut() {
    return this.http.get<LogOutResponse>(this.baseUrl + "/logout", {
      params: {
        returnTo: "http://localhost:4200/logout"
      },
      withCredentials: true
    })
  }
 public tokenExchange(){
    return this.http.post<any>("http://localhost:8080/token-exchange/exchange",{},{
      withCredentials:true
    })
   }

  public getLoggedIn() {
    return this.loggedIn.value;
  }

  public setLoggedInTrue(): void {
    console.log("set auth method call auth-service ")
    this.loggedIn.next(true)
  }

  public setLogOutSubject() {
    this.loggedIn.next(false);
  }

  public setToken(token: string) {
    this.token.next(token)
  }

  public getToken() {
    return this.token.value;
  }

  public getUserInfo() {
    return this.http.post<UserProfileInfo>("http://localhost:8080/user",{}, {
      withCredentials: true
    })
  }

  loginWthGoogle() {
    return this.http.post<AuthorizeUrl>(this.baseUrl + "/sso/login", {
      scope: "openid email offline_access",
      audience: "https://localhost:8081",
      redirectUrl:"http://localhost:4200/"
    }, {
      headers: {
        "Access-Control-Allow-Origin": "https://x4t.seliselocal.com",
        "Origin": "https://x4t.seliselocal.com"
      }
    });
  }
}




