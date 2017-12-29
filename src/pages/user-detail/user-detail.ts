import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,TextInput } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { ImagePicker } from '@ionic-native/image-picker';
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
  imageOptions:any={};
  constructor(public imagePicker: ImagePicker,public navCtrl: NavController,public service:SessionService) 
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
  isYou(message) {
    if(message.receiverId==this.service.getUser().key)
    {
      
      if(message.senderId==this.service.getOtherUserInfo().key)
      {
        return true;
      }
    }
  }
  isMe(message) { 
    if(message.senderId==this.service.getUser().key)
    {
      if(this.service.getOtherUserInfo().key==message.receiverId)
      {
        return true;
      }
    }  
  }


  showMessage(message)
  {
    if(message.senderId==this.service.getUser().key)
    {
      if(this.service.getOtherUserInfo().key==message.receiverId)
      {
        return true;
      }
    }
    if(message.receiverId==this.service.getUser().key)
    {
      if(message.senderId==this.service.getOtherUserInfo().key)
      {
        return true;
      }  
    }
  }
  sendMessage()
  {
    this.messages.push({"editorMsg":this.messageInfo.editorMsg});
    this.messageInfo.editorMsg='';
  }

  chooseImage()
  { 
    this.imageOptions= {
      maximumImagesCount: 3, 
      quality: 90, 
      width: 500, 
      height: 500
    };

   
    this.imagePicker.getPictures(this.imageOptions).then((results) =>{
      alert("Results==="+JSON.stringify(results));
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
      alert("Successfully fetch images====");
      console.log('Image URI: ' + results[0]);
    }, (err) => { 
      alert("Error 68==="+JSON.stringify(err));
      console.log("Failed to fetch images===="+JSON.stringify(err));
    });
  }
 

}
