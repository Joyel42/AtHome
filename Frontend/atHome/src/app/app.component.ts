import { ToastBarComponent } from './components/toast-bar/toast-bar.component';
import { SingletonService } from './services/singleton.service';
import { UserService } from './services/user.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'atHome';
  
  @ViewChild(ToastBarComponent,{static:false}) statusMessage!:ToastBarComponent;
  
  get isUserLogined(){
    return this.userService.authenticateUser();
  }
  
  constructor(private userService:UserService, private ss:SingletonService){
    console.log(this.userService.authenticateUser());
  }
  
  ngAfterViewInit(): void {
    this.ss.statusMessage = this.statusMessage;
  }
}
