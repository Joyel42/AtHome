import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastBarComponent } from './toast-bar.component';



@NgModule({
  declarations: [ToastBarComponent],
  imports: [
    CommonModule
  ],
  exports:[ToastBarComponent]
})
export class ToastBarModule { }
