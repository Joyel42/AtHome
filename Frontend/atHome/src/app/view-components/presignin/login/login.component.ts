import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SingletonService } from 'src/app/services/singleton.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('passwordIcon') passwordIcon!: ElementRef;
  isPasswordVisible:boolean = false;
  inputFieldType:string = "password";

  loginForm  = new FormGroup({
  username : new FormControl('',[Validators.required]),
  password : new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  get isLoginBtnEnabled(){
    return this.loginForm.valid;
  }

  // get passwordValid(){
  //   return (this.loginForm.controls.password.value?.length! < 6 || this.loginForm.controls.password.value?.length! > 15) && this.loginForm.controls.password.touched;
  // }

  constructor(private http:HttpService, private ss:SingletonService){}

  showOrHidePassword(event:Event){
    this.isPasswordVisible = !this.isPasswordVisible;
    if(this.isPasswordVisible){
      this.inputFieldType = "text";
      this.passwordIcon.nativeElement.innerHTML = "visibility";
    }
    else{
      this.passwordIcon.nativeElement.innerHTML = "visibility_off";
      this.inputFieldType = "password";
    }
  }

  loginBtnClick(){
    console.log(this.isLoginBtnEnabled);
    
    console.log(this.loginForm.value);
    this.http.httpRequest("POST","login",this.loginForm.value).subscribe((res:any)=>{
      if(res.status === 200){
        this.ss.statusMessage.showStatusMessage('SUCCESS',res.body.message,5000);
        // console.log(res.body.message);
        
      }
    },(error:any)=>{
      console.log(error.error.message);
      this.ss.statusMessage.showStatusMessage('ERROR',error.error.message,5000);
    });
  }
}
