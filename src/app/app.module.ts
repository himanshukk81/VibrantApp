import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Http, Response} from '@angular/http';
import { HttpModule }    from '@angular/http';
import { SessionService } from './sessionservice';
import { LoginPage } from '../pages/Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Toast } from '@ionic-native/toast';
import { environment } from '../environments/environment';
import { ListPage} from '../pages/list/list';
import { UsersPage} from '../pages/users/users';
import { profile} from '../pages/profile/profile';
import { UserDetailPage} from '../pages/user-detail/user-detail';
import { RegisterUser } from '../pages/Login/Login';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserDetailPage,
    UsersPage,
    ListPage,
    profile,
    RegisterUser
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
   
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserDetailPage,
    UsersPage,
    ListPage,
    profile,
    RegisterUser
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    NativeStorage,
    LocalNotifications,
    Toast,
    SocialSharing,
    Network,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
