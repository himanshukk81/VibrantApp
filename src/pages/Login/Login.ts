import { Component,ViewChild } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from '../../app/sessionservice';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { Nav, Platform,AlertController,NavController,NavParams,MenuController} from 'ionic-angular';


@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  user:any;
  loader:any;
  constructor(public menu: MenuController,public navCtrl: NavController,public service:SessionService){
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
  verifyUser()
  {
    this.service.setUser(this.user);
    this.navCtrl.setRoot(HomePage);
  }
  
}


