import { Component, OnInit } from '@angular/core';
import { INotificatiion } from 'src/app/interface/common-interface';

@Component({
  selector: 'app-toast-bar',
  templateUrl: './toast-bar.component.html',
  styleUrls: ['./toast-bar.component.scss']
})
export class ToastBarComponent implements OnInit{
  
  meassageQueue:Array<INotificatiion>=[];
  currentNotificationNumber:number = 0;
  
  timeOutRefForMoniter: any;

  constructor(){ }

  ngOnInit(): void {
    this.monitorNotification();
  }

  isNotificationsFinished(){
    if(this.meassageQueue.length !==0){
      return false;
    }else{
      return true;
    }
  }
  
  monitorNotification(){
    this.meassageQueue.forEach((notification:INotificatiion, index)=>{
      if( Date.now() > (notification.timestamp + notification.duration) ){
        this.meassageQueue.splice(index,1);
        this.isNotificationsFinished();
      }else{
        this.timeOutRefForMoniter = setTimeout(() => {
          if (!this.isNotificationsFinished()) {
            this.monitorNotification();
          } else {
            clearTimeout(this.timeOutRefForMoniter);
            this.meassageQueue = [];
            this.timeOutRefForMoniter = undefined;
          }
        }, 500);
      }
    });
    // this.isNotificationsFinished();
  }

  removeToastMessage(id:number){
    this.meassageQueue.splice(id,1);
  }

  showStatusMessage( type:"SUCCESS"|"WARN"|"ERROR", status:string, duration:number ){
    if(this.meassageQueue.length === 0){
      this.currentNotificationNumber = 0;
    }
    this.currentNotificationNumber = this.currentNotificationNumber + 1;
    this.meassageQueue.push({type:type,status:status,duration:duration,timestamp:Date.now()});
    
      this.monitorNotification();
  }

}
