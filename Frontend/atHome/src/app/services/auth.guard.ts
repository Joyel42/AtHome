import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

export const AuthGuard = () =>{
  const authService = inject(UserService);
  const router = inject(Router);
  if(authService.authenticateUser() == true){
    return true;
  }
  router.navigate(['/login']);
  return false;  
};


// export const AuthGuard2 = () =>{
//   const authService = inject(UserService);
//   const router = inject(Router);
//   if(authService.authenticateUser() == false){
//     return true;
//   }
//   router.navigate(['/home']);
//   return false;  
// };