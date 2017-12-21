import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController,NavController,NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import { FCM } from '@ionic-native/fcm';
import { SessionService } from './sessionservice';
import { LoginPage } from '../pages/Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { profile } from '../pages/profile/profile';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(NavController) navCtrl: NavController;


  rootPage: any=LoginPage;
  headers:any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public service:SessionService,public native:NativeStorage,public sharing:SocialSharing,public alertCtrl:AlertController  
    ,public nativeStorage:NativeStorage,public network:Network,public localNotifications:LocalNotifications,public http:Http) {
      this.initializeApp();
    // this.enableLocation();  
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage},
      {title:'Share Photo',component:HomePage},
      {title:'Logout',component:LoginPage},

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.checkUserStatus();
      // this.initPushNotification();
      this.checkNetwork();
      // this.enableLocation();
    });
  }
 
  checkNetwork()
  {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      var message="Your Are Offline";
    });
    let connectSubscription = this.network.onConnect().subscribe(() => {
    var message="Your Are Online";
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          var message="You Got Wifi Connection"
        }
      }, 3000);
    });
  }   
  checkUserStatus()
  {
     this.service.showToast("Checking User status");  
     this.native.getItem('userInfo')
        .then
        ( 
            data =>
            {
                if(data)
                {
                  this.service.showToast("Data===");  
                  this.rootPage=HomePage;
                  this.service.setUser(data);
                }
                else
                {
                  this.service.showToast("No Data===");
                  this.rootPage=LoginPage;
                }

                
            },
            error =>{
              // alert("Errror="+error)
              let error2="Error="+error;
              this.service.showToast("Error="+error2);
              this.rootPage=LoginPage;
            }  
        );
  }
  // initPushNotification()
  // {

  //   this.fcm.subscribeToTopic('Notification');

  //   this.fcm.getToken().then(token=>{
  //     // alert("token=="+token);  
  //     console.log("token=="+JSON.stringify(token));

  //     this.service.setToken(token);
  //   }).catch( (e) => {
  //       // alert("error"+e);
  //       // //alert(JSON.stringify(e));
  //       });

  //   this.fcm.onNotification().subscribe(data=>{
  //     this.service.setOtherUserInfo(data);
  //     if(data.wasTapped){
  //           this.navCtrl.push(UserDetailPage);
  //         // alert("recieved notification=="+JSON.stringify(data));
  //     } else {
  //           this.navCtrl.push(UserDetailPage);
  //       //  alert("received notification without tap=="+JSON.stringify(data))
  //     };
  //   })

  //   this.fcm.onTokenRefresh().subscribe(token=>{
  //       console.log("refresh token==="+JSON.stringify(token));
  //       this.service.setToken(token);
  //   })

  //   this.fcm.unsubscribeFromTopic('Notification');
  // }
  openPage(page) {
      if(page.title="Logout")
      {
        this.presentConfirm();
      }
      else
      {
        this.nav.setRoot(HomePage);
      }
  }
  presentConfirm()
  {
    let alert = this.alertCtrl.create({
      title: 'LogOut',
      message: 'Are You Sure you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            // console.log('Buy clicked');
            // this.native.clear()        
              // .then(()=>{
                this.service.setUser(null);
                this.nativeStorage.clear();
                this.nav.setRoot(LoginPage);
                this.nav.popToRoot();
              },
        }
      ]
    })    
    alert.present();
  }
}