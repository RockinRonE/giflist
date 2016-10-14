import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings-page/settings-page';
import { Data } from '../../providers/data';
import { Reddit } from '../../providers/reddit';
import { FormControl } from '@angular/forms';
import { InAppBrowser } from 'ionic-native'; 
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
   //  create new FormControl
   this.subredditControl = new FormControl();
   // subscribe to the valueChanges Observable
   this.subredditControl.valueChanges.debounceTime(1500).distinctUntilChanged().subscribe(subreddit => {
     if(subreddit != '' && subreddit) {
       this.redditService.subreddit = subreddit;
       this.changeSubreddit(); 
     }
   });

   this.loadSettings(); 
 }

 loadSettings(): void {
   this.dataService.getData().then((settings) => {
     if(settings && typeof(settings) != "undefined") {
       
       let newSettings = JSON.parse(settings);
       this.redditService.settings = newSettings; 

       if(newSettings.length != 0) {
         this.redditService.sort = newSettings.sort; 
         this.redditService.perPage = newSettings.perPage; 
         this.redditService.subreddit = newSettings.subreddit;
       }
     }
     this.changeSubreddit(); 
   });
 }

 showComments(post): void {
   let browser = new InAppBrowser('http://reddit.com' + post.data.permalink, '_system');
 }

 openSettings(): void {
   let settingsModal = this.modalCtrl.create(SettingsPage, {
     perPage: this.redditService.perPage,
     sort: this.redditService.sort,
     subreddit: this.redditService.subreddit
   });

   settingsModal.onDidDismiss(settings => {
     if(settings) {
       this.redditService.perPage = settings.perPage;
       this.redditService.sort = settings.sort; 
       this.redditService.subreddit = settings.subreddit; 

       this.dataService.save(settings)
       this.changeSubreddit(); 
     }
   });

   settingsModal.present(); 
 }

 playVideo(e, post): void {
   // Create a reference to the video
   let video = e.target; 

   if(!post.alreadyLoaded) {
     post.showLoader = true; 
   }

   // Toggle the video playing
   if(video.paused) {
     // Show the loader gif
     video.play();

     // Once the video starts playing, remove the loader gif
     video.addEventListener("playing", function(e) {
       post.showLoader = false; 
       post.alreadyLoaded = true; 
     });
   } 
   else {
     video.pause();
   }
 }

 changeSubreddit(): void {
  this.redditService.resetPosts(); 
 }

 loadMore(): void {
  this.redditService.nextPage(); 
 }

}
