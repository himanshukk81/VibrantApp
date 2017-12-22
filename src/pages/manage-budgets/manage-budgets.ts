import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ManageBudgetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-budgets',
  templateUrl: 'manage-budgets.html',
})
export class ManageBudgetsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageBudgetsPage');
  }

  addBudget()
  {
    this.db.list('/budget').push(this.budget).then(({key}) => 
    {
      this.budget.key=key;
      this.updateKey()
    },error=>{
      // this.service.showToast2("Something went wrong please try again");
    })
  }
  updateKey()
  {
      this.db.object('/budget/'+this.budget.key).update(this.budget).then((profile: any) =>{
            
            
            console.log("Successfully updated location====");
        })
      .catch((err: any) => {
          
          this.service.showToast2("Something went wrong please try again");
      });
  }

}
