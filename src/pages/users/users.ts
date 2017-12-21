import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDetailPage} from '../user-detail/user-detail';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users:any=[];
  constructor(public navCtrl: NavController,public service:SessionService) 
    {
      

      this.users=[{"name":"himanshu","email":"himanshukk81@gmail.com","mobile":"9971672881"},
                  {"name":"Nakul","email":"nakul@gmail.com","mobile":"123344444"},
                  {"name":"Abhinav","email":"Abhinav@gmail.com","mobile":"988787555"},
                  {"name":"Rahul","email":"Rahul@gmail.com","mobile":"45789541233"},
                  {"name":"Yash","email":"Yash@gmail.com","mobile":"1236548798"}
                 ];
    }


    userDetail(info)
    {
      this.service.setOtherUserInfo(info);
      this.navCtrl.push(UserDetailPage);
    }


}
