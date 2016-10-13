import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings-page',
  templateUrl: 'settings-page.html'
})
export class SettingsPage {

  perPage: number; 
  sort: string; 
  subreddit: string; 

  constructor(public view: ViewController, public navParams: NavParams) {
    this.perPage = this.navParams.get('perPage');
    this.sort = this.navParams.get('sort');
    this.subreddit = this.navParams.get('subreddit');
  }

  save(): void {
    let settings = {
      perPage: this.perPage,
      sort: this.sort,
      subreddit: this.subreddit
    };
    this.view.dismiss(settings);
  }

  close(): void {
    this.view.dismiss(); 
  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }

}
