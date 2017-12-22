import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { SessionService } from '../../app/sessionservice';
 
/**
 * Generated class for the BudgetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {
  budget:any;
  budgets: FirebaseListObservable<any[]>;
  constructor(public service:SessionService, public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {

    this.budgets=this.db.list('/budget')
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetsPage');
  }


  budgetDetail(budget)
  {
    this.service.setBudget(budget);
    this.navCtrl.push(ManageBudgetsPage);
  }


}

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
