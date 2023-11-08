import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { SingletonService } from 'src/app/services/singleton.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('passwordIcon') passwordIcon!: ElementRef;
  @ViewChild('passwordIcon1') passwordIcon1!: ElementRef;
  
  isPasswordVisible:boolean = false;
  isPasswordVisible1:boolean = false;
  inputFieldType:string = "password";
  inputFieldType1:string = "password";

  confirmPassword = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]);
  
  registrationForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
  });
  
  
  get isUsernameValid(){
    if(this.registrationForm.controls.username.value?.length! < 10 || this.registrationForm.controls.username.value?.length == 0){
      return true;
    }
    return false;
  }

  get isNameValid(){
    if(this.registrationForm.controls.name.value?.length == 0){
      return true;
    }
    return false;
  }

  get isEmailValid(){
    if(this.registrationForm.controls.email.value?.length === 0 || this.registrationForm.controls.email.untouched)
      return true
    return this.registrationForm.controls.email.valid;
  }

  get isPasswordsMatching(){
    if(this.registrationForm.controls.password?.value === this.confirmPassword?.value){
      return true;
    }
    if(this.confirmPassword?.value?.length === 0 || this.registrationForm.controls.password?.value?.length === 0 ){
      return true;
    }
    return false;
  }
  
  get isRegisterFormValid(){
    return this.registrationForm.valid && this.confirmPassword.valid && this.isPasswordsMatching;
  }
  
  constructor(private http:HttpService, private ss:SingletonService, private route:Router){ }
  
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
  
  showOrHidePassword1(event:Event){
    this.isPasswordVisible1 = !this.isPasswordVisible1;
    if(this.isPasswordVisible1){
      this.inputFieldType1 = "text";
      this.passwordIcon1.nativeElement.innerHTML = "visibility";
    }
    else{
      this.inputFieldType1 = "password";
      this.passwordIcon1.nativeElement.innerHTML = "visibility_off";
    }
  }

  showError(){
    this.isPasswordsMatching ? null : this.confirmPassword.setErrors({'incorrect': true});
  }
  
  onRegisterClick(){
    this.http.httpRequest("POST",'register',this.registrationForm.value).subscribe((res:any)=>{
      if(res.status === 201){
        console.log(res);
        this.ss.statusMessage.showStatusMessage('SUCCESS',res.body.message,5000);
        this.route.navigateByUrl('login')
      }
    },(error:any)=>{
      console.log(error.error.message);
      this.ss.statusMessage.showStatusMessage('ERROR',error.error.message,5000);
    });
  }
}
