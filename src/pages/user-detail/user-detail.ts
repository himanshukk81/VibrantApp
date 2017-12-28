import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,TextInput } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { count } from 'rxjs/operators/count';
import { Base64 } from '@ionic-native/base64';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var counter:0;
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
  imagesArray:any=[];
  loader:boolean=false;
  selectedImages:any;
  storageRef:any=firebase.storage().ref();
  counter:number=0;
  counterDB:number=0;
  constructor(public db:AngularFireDatabase, public base64:Base64,public camera:Camera,public imagePicker: ImagePicker,public navCtrl: NavController,public service:SessionService) 
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
    // this.messages.push({"editorMsg":this.messageInfo.editorMsg});
    // this.messageInfo.editorMsg='';
    if(this.imagesArray.length>0)
    {
      this.imageUpload();
    }
  }

  chooseImage()
  { 
    this.imageOptions= {
      maximumImagesCount:50, 
      quality: 90, 
      width: 200, 
      height: 200
    };   
    this.imagePicker.getPictures(this.imageOptions).then((results) => {

      // alert("Results==="+JSON.stringify(results));
      for (var i = 0; i < results.length; i++) {
        this.imagesArray.push(results[i]);

        this.messages.push(results[i]);
          console.log('Image URI: ' + results[i]);
      }
      // alert("Successfully fetch images===="+JSON.stringify(this.imagesArray));
      // console.log('Image URI: '+JSON.stringify(this.imagesArray));

      // this.imagesArray.push(results);
      
    }, (err) => { 
      alert("Error 68==="+JSON.stringify(err));
      console.log("Failed to fetch images===="+JSON.stringify(err));
    });
  }
  uploadInDB()
  {

    if(this.imagesArray.length==this.counterDB)
    {
      this.loader=false;
    }
    else
    {
      this.addInDB();
    }
  }

  addInDB()
    {
      this.db.list('/messages').push(this.imagesArray[this.counterDB].imageUrl).then(resolve => {
        console.log('all good');
        // this.messages.remove(this.messageInfo);
        // this.loader=false;
        // this.messageInfo.pending=false;
        this.scrollToBottom();
        this.counterDB++;
        this.uploadInDB();
        // this.sendNotification();
        // this.messageInfo.status="completed";
      }, reject => {
        console.log('error');
        this.loader=false;
        this.scrollToBottom();
        // this.messageInfo.status="failed";
      })
    }
  imageUpload()
  {
    this.loader=true;

    // alert("Image Array=="+JSON.stringify(this.imagesArray));
    console.log("array=="+this.imagesArray.length);
    if(this.imagesArray.length==this.counter)
    {
      // this.loader=false;
      alert("upload in s3")
      this.uploadInDB();
    }
    else
    {

      // alert("image==="+this.imagesArray[this.counter]);
      console.log("image="+this.imagesArray[this.counter]);
      let filePath: string = this.imagesArray[this.counter];
      // alert("file path==="+filePath);
      this.base64.encodeFile(filePath).then((base64File: string) => {
        console.log(base64File);
        // alert("convert successfully");
        this.uploadServer(base64File);
  
      }, (err) => {
        alert("failed to convert successfully");
        console.log(err);
      });
    }   
  }


  uploadServer(base64)
  {
      // alert("uploading==");
      // console.log(base64);
      const filename = Math.floor(Date.now() / 1000);
      const imagstorageRefeRef = this.storageRef.child(`images/${filename}.jpg`);
      // alert("firebase string=="+firebase.storage.StringFormat.DATA_URL);
      console.log("firebase string=="+firebase.storage.StringFormat.DATA_URL);
      // var imageSource="data:image/jpeg;base64,"+this.imagesArray[this.counter];
    

      imagstorageRefeRef.putString(base64, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        alert("image uploaded successfully====="+this.counter);
        console.log("Successfully uploaded==="+this.counter);
        this.imagesArray[this.counter].imageUrl = imagstorageRefeRef.snapshot.downloadURL;
        alert("download image Url=="+this.imagesArray[this.counter].imageUrl);
        this.counter++;
        this.imageUpload();

        }, (err) => {

              // alert("failed to upload==="+err);
              console.log("Error::::::;"+err);
        
          //    // Handle error
        });
  }
}
