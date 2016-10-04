import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings-page/settings-page';
import { Data } from '../../providers/data';
import { Reddit } from '../../providers/reddit';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})

export class HomePage {

 subredditValue: string;
 subredditControl: FormControl;

 constructor(public dataService: Data, public redditService: Reddit, public modalCtrl: ModalController) {
   
   this.subredditControl = new FormControl();
   this.subredditControl.valueChanges.debounceTime(1500).distinctUntilChanged().subscribe(subreddit => {
     if(subreddit != '' && subreddit) {
       this.redditService.subreddit = subreddit;
       this.changeSubreddit(); 
     }
   });

   this.loadSettings(); 
 }

 loadSettings(): void {
   console.log("TODO: Implement loadSettings()");
 }

 showComments(post): void {
   console.log("TODO: Implement showComments()");
 }

 openSettings(): void {
   console.log("TODO: Implement openSettings()");
 }

 playVideo(e, post): void {
   console.log("TODO: Implement playVideo()");
 }

 changeSubreddit(): void {
   console.log("TODO: Implement changeSubreddit()");
 }

 loadMore(): void {
   console.log("TODO: Implement loadMore()");
 }

}
