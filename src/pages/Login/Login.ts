import { Component,ViewChild } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from '../../app/sessionservice';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { Nav, Platform,AlertController,NavController,NavParams,MenuController,ModalController,ViewController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Events,ToastController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  user:any;
  loader:any;
  userStatus:boolean;
  firstTimeUser:any;
  constructor(public facebook:Facebook, public authService:AuthService,public events:Events, public db: AngularFireDatabase,public modalCtrl:ModalController,public menu: MenuController,public navCtrl: NavController,public service:SessionService){
    this.user={};
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad()
  {
    
    this.events.subscribe('Verification:Success:login', users => {
      console.log("Login Success");
        if(users.length>0)
        {
          if(users[0].password==this.user.password)
          {
            this.service.setUser(users[0]);
            this.navCtrl.setRoot(HomePage);
          }
        }
        else
        {
         this.service.showToast2("Email Id Not Exist");
        }
        this.firstTimeUser=false;
        this.loader=false;
    })

    this.events.subscribe('user:insert:successfully', users => {
      this.loader=false;
      this.navCtrl.setRoot(HomePage);
    })
  }
  
  
  login()
  {    
      if(!this.user.email)
      {
        this.service.showToast2("Please Enter Valid email");
        return;
      }
      if(!this.user.password)
      {
        this.service.showToast2("Please Enter Password");
        return;
      }
      this.loader=true;
      this.user.email=this.user.email.toLowerCase();
      this.service.verifyUser(this.user.email,2);
  }
  signInWithFacebook()
  {
    // this.authService.signInWithFacebook().then((res) => { 

    //   this.user.displayName=res.user.displayName;
    //   this.user.photoURL=res.user.photoURL;
    //   this.user.email=res.user.email;
    //   this.user.uid=res.user.uid;
    //   this.service.setUser(this.user); 
    //   this.checkUser();
    //     console.log("Login Success by faceboook=="+JSON.stringify(res));
    //   })
    // .catch((err) =>{
    //   alert("Error==="+err.message);
    //   console.log("Login Failed by facebook="+err);
    // });
    this.facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      alert("Facebook Credential=="+JSON.stringify(facebookCredential));
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {

          this.loader=true;
          console.log("Firebase success: " + JSON.stringify(success));
          this.user={};
          this.user= success;
          // alert("User info=="+JSON.stringify(this.user));
          console.log("User info=="+JSON.stringify(this.user))
            this.user.displayName=success.displayName;
            this.user.photoURL=success.photoURL;
            this.user.email=success.email;
            this.user.uid=success.user.uid;
            // this.service.setUser(this.user); 
            this.checkUser();
        })
        .catch((error) => {
          alert("Firebase Failure");
          console.log("Firebase failure: " + JSON.stringify(error));
      });

    }).catch((error) => {
       alert("Facebook Failure=="+error);
       console.log(error) 
      
      });
  }

 
  
  

  checkUser()
  {
    var item=this.db.list('/user_detail',{
      query:{
        orderByChild:'uid',
        equalTo:this.user.uid,
      },
    }).subscribe(snapshot =>{
            if(snapshot.length>0)
            {
              this.service.setUser(snapshot[0]);
              this.navCtrl.setRoot(HomePage);
            }
            else
            {
              this.service.saveUserInfo(this.user)
            }
            this.loader=false;
      },error=>{
        var err1="Error=="+error;
        this.service.showToast2(err1);
      });
  }
  signUp()
  {
    let profileModal = this.modalCtrl.create(RegisterUser);
    profileModal.present();
  }

  
}


@Component({
  selector: 'page-Login',
  templateUrl: 'register.html'
})

export class RegisterUser{
  user:any={};
  firstTime:boolean=true;
  loader:any=false;
  firstTimeUser:boolean=true;
    constructor(public events:Events,public db: AngularFireDatabase,public navCtrl:NavController,public service:SessionService,public viewCtrl:ViewController) {
    }

    ionViewDidLoad()
    {
      this.events.subscribe('Verification:Success:signup', users => {
        console.log("event called");
        console.log("loader==="+this.loader);
        this.events.unsubscribe('Verification:Success:signup', null);
        if(this.loader) 
        {
          console.log("loading........................................");
          if(users.length>0)
          {
            console.log("Email id exist");
            this.service.showToast2("Email Id Already Exist");
            this.loader=false;
          }
          else
          {
            console.log("New user entry");
            // this.saveUserInfo(); 
            this.service.saveUserInfo(this.user)
          }
        }
        
      })
      this.events.subscribe('user:insert:successfully', users => {
        this.navCtrl.setRoot(HomePage);
      })
    }
    saveUser()
    {
    
          
          // if(!this.user.first_name)
          // {
          //   this.service.showToast2("Please Enter Your Name");
          //   return;
          // }

          // if(!this.user.mobile)
          // {
          //   this.service.showToast2("Please Enter Your Mobile Number");
          //   return;
          // }

          // if(!this.user.password)
          // {
          //   this.service.showToast2("Please Enter Your Password");
          //   return;
          // }

          // if(!this.user.confirmPassword)
          // {
          //   this.service.showToast2("Please Enter Your Confirm Password");
          //   return;
          // }

          // if(this.user.password!=this.user.confirmPassword)
          // {
          //   this.service.showToast2("Password  not matching");
          //   return;
          // }


          if(this.firstTime)
          {
            this.service.verifyUser(this.user.email,1);
            this.loader=true;
            this.user.email=this.user.email.toLowerCase();
            this.user.email=this.user.email.replace(/\s/g, "");
            this.user.userType="M";
            this.firstTime=false;
          }
    }
    // saveUserInfo()
    // {
    //   this.db.list('/user_detail').push(this.user).then(({key}) => 
    //   {
    //     this.user.key=key;
    //     this.updateKey(this.user)
    //   },error=>{
    //     this.service.showToast2("Something went wrong please try again");
    //   })
    // }
    // updateKey(user)
    // {
    //     this.db.object('/user_detail/'+user.key).update(user).then((profile: any) =>{
    //           this.closeModal();
    //           this.service.setUser(user);
    //           this.navCtrl.setRoot(HomePage);
    //           this.loader=false;
    //           console.log("Successfully updated location====");
    //       })
    //     .catch((err: any) => {
    //         var error="error=="+err;
    //         this.loader=false;
    //         this.service.showToast2("Something went wrong please try again");
    //     });
    // }
    closeModal()
    {
      this.viewCtrl.dismiss();
    }
   
}


