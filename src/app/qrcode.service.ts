import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "./auth.service";

interface QrCodeResponse {
  authenticator_type: string,
  secret: string,
  barcode_uri: string,
}

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private http: HttpClient) {
  }

  getToken() {
    return this.http.post<LoginResponse>("https://dev-osrgs11q.us.auth0.com/oauth/token", {
      "username": "arefin.hossain@selise.ch",
      "password": "waOPg5X5^l3S&xVD",
      "scope": "openid profile read:authenticators enroll",
      "audience": "https://localhost:8081",
      "client_id": "5XBqskhgP6V3FP0lAU9rYgTIBoQJ5oXD",
      "client_secret": "EoJIzDfD1ApJBk9bf80t7e1yBCFjQ0DTCyD8vQUTRb9gSFr4CY9ijNsrEbvwfpbZ",
      "grant_type": "password"
    })
  }

  getQrCode(token: string) {
    return this.http.post<QrCodeResponse>("https://dev-osrgs11q.us.auth0.com/mfa/associate", {
      "authenticator_types": [
        "otp"
      ]
    }, {
      headers: {
        "Authorization": " Bearer " + token
      }
    })
  }

  verifyOtp(otp: string, token: string) {
    return this.http.post("https://dev-osrgs11q.us.auth0.com/oauth/token", {
      "mfa_token": token,
      "otp": otp,
      "client_id": "5XBqskhgP6V3FP0lAU9rYgTIBoQJ5oXD",
      "client_secret": "EoJIzDfD1ApJBk9bf80t7e1yBCFjQ0DTCyD8vQUTRb9gSFr4CY9ijNsrEbvwfpbZ",
      "grant_type": "http://auth0.com/oauth/grant-type/mfa-otp"
    })
  }

}
