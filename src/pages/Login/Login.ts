import { Component,ViewChild } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from '../../app/sessionservice';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { Nav, Platform,AlertController,NavController,NavParams,MenuController,ModalController,ViewController} from 'ionic-angular';


@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  user:any;
  loader:any;
  constructor(public modalCtrl:ModalController,public menu: MenuController,public navCtrl: NavController,public service:SessionService){
    this.user={};
    this.menu.swipeEnable(false);
  }


  login()
  {    
      if(!this.user.email)
      {
        this.service.showToast("Please Enter Valid email");
        return;
      }
      if(!this.user.password)
      {
        this.service.showToast("Please Enter Password");
        return;
      }
      this.verifyUser();
  }
  signUp()
  {
    let profileModal = this.modalCtrl.create(RegisterUser);
    profileModal.present();
  }
  verifyUser()
  {
    this.service.setUser(this.user);
    this.navCtrl.setRoot(HomePage);
  }
  
}



@Component({
  selector: 'page-Login',
  templateUrl: 'register.html'
})

export class RegisterUser{
  user:any={};
  firstTime:boolean=true;

    constructor(public navCtrl:NavController,public service:SessionService,public viewCtrl:ViewController) {
    }


    saveUser()
    {
      if(this.firstTime)
      {
          
          // if(!this.user.first_name)
          // {
          //   this.service.showToast("Please Enter Your Name");
          //   return;
          // }

          // if(!this.user.mobile)
          // {
          //   this.service.showToast("Please Enter Your Mobile Number");
          //   return;
          // }

          // if(!this.user.password)
          // {
          //   this.service.showToast("Please Enter Your Password");
          //   return;
          // }

          // if(!this.user.confirmPassword)
          // {
          //   this.service.showToast("Please Enter Your Confirm Password");
          //   return;
          // }

          // if(this.user.password!=this.user.confirmPassword)
          // {
          //   this.service.showToast("Password  not matching");
          //   return;
          // }
          // this.user.email=this.user.email.toLowerCase();
          // // var email=data.email.toLowerCase();
          // this.user.email=this.user.email.replace(/\s/g, "");
          // this.user.userType="M";
          // var first=true;
          // alert("597");  
          this.firstTime=false;
          this.saveUserInfo();
      }
    }


    saveUserInfo()
    {
      this.service.setUser(this.user);
      this.closeModal();
      this.navCtrl.setRoot(HomePage);

    }
    
    closeModal()
    {
      this.viewCtrl.dismiss();
    }
   
}


