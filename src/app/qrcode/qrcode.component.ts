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
        this.token=res.access_token;
        this.qrCodeService.getQrCode(res.access_token).subscribe({
          next:value => {
            console.log(value)
            this.qrcodeUrl=value.barcode_uri
          }
        })
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
