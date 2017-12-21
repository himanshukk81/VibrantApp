import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,TextInput } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})






export class UserDetailPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  userInfo:any;
  messageInfo:any={};
  messages:any=[];
  constructor(public navCtrl: NavController,public service:SessionService) 
  {
    this.userInfo=this.service.getOtherUserInfo();
  }


  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
  }

  sendMessage()
  {
    this.messages.push({"editorMsg":this.messageInfo.editorMsg});
    this.messageInfo.editorMsg='';
  }

}
