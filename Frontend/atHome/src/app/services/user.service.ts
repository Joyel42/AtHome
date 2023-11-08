import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { IjwtPayload } from '../interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  authenticateUser(): boolean {
    if (!localStorage.getItem("token")) {
      return false;
    } else {
      let exp = new Date(this.decodeJwtToken().exp * 1000);
      if (exp > new Date(Date.now())) {
        return true;
      } else {
        return false
      }
    }
  }

  getUsername() {
    return this.decodeJwtToken()?.name;
  }
  
  decodeJwtToken() {
    let token = localStorage.getItem("token")
    var decodedToken = jwtDecode<IjwtPayload>(token!)
    return decodedToken;
  }

}
