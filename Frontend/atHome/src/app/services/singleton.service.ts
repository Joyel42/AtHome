import { ToastBarComponent } from './../components/toast-bar/toast-bar.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  constructor() { }
  statusMessage!: ToastBarComponent;
}
