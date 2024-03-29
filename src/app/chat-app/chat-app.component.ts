import { Component,OnInit } from '@angular/core';
import io from 'socket.io-client';

const SOCKET_ENDPOINT ='localhost:3000';
@Component({
  selector: 'app-chat-app',
  standalone: true,
  imports: [],
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.css'
})
export class ChatAppComponent implements OnInit {
socket:any;
message!:string;
constructor(){ }

ngOnInit():void {
  this.setupSocketConnection();
}
setupSocketConnection(){
  this.socket =io(SOCKET_ENDPOINT);
  this.socket.on('message-broadcast',(data:string)=>{
  if(data){
    const element = document.createElement('li');
    element.innerHTML = data;
    element.style.background ='white';
    element.style.padding ='15px 30px';
    element.style.margin ='15px';
    document.getElementById('message-list')?.appendChild(element)
  }
  });
}
sendMessage(){
  this.socket.emit('message',this.message);
  const element = document.createElement('li');
  element.innerHTML = this.message;
  element.style.background = 'white';
  element.style.padding = '15px 30px';
  element.style.margin = '15px';
  element.style.textAlign = 'right';
  document.getElementById('message-list')?.appendChild(element)
  this.message ='';
}
}
