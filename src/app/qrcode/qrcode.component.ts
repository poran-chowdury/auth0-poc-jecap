import { Component, OnInit } from '@angular/core';
import {QrcodeService} from "../qrcode.service";

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  qrcodeUrl: any;
  otp: any;
  token!:string

  constructor(private qrCodeService:QrcodeService) { }

  ngOnInit(): void {
    this.qrCodeService.getToken().subscribe({
      next:res => {
        console.log(res)

      },error: err => {
        if (err.status === 403){
          this.token=err.error.mfa_token;
          console.log(err)
          console.log(err.error.mfa_token)
          this.qrCodeService.getQrCode(err.error.mfa_token).subscribe({
            next:value => {
              console.log(value)
              this.qrcodeUrl=value.barcode_uri
            }
          })
        }
      }
    })
  }
  verify(){
    console.log(this.token)
    console.log(this.otp)
    this.qrCodeService.verifyOtp(this.otp,this.token).subscribe({
      next:value => {
        console.log(value)
      }
    })
  }
}
