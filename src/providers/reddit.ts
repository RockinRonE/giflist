import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Reddit provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Reddit {

  // Member Variables

  // settings user provides
  settings: any;
  // whether new GIFS are currently being fetched
  loading: boolean = false; 
  // Entries for the gifs currently loaded
  posts: any = [];
  // current subreddit
  subreddit: string = 'gifs';
  // current page - how many times user has clicked Load More
  page: number = 1; 
  // amount of gifs to display per page
  perPage: number = 15; 
  // reference to the last post retrieved from Reddit, so we know where to start for next page
  after: string;

  stopIndex: number;
  // sort order for gifs
  sort: string = 'hot';
  // will keep trying to load more gifs to fill page
  moreCount: number = 0; 


  constructor(public http: Http) {
    
  }

  fetchData(): void {
    //Build the URL that will be used to access the API based on the users current preferences
    let url = 'https://www.reddit.com/r/' + this.subreddit + '/' + this.sort + '/.json?limit=' + this.perPage;

    //If we aren't on the first page, we need to add the after parameter so that we only get new results
    //this parameter basically says "give me the posts that come AFTER this post"
    if(this.after) {
      url += '&after=' + this.after;
    }
    //We are now currently fetching data, so set the loading variable to true
    this.loading = true; 

    //Make a Http request to the URL and subscribe to the response
    this.http.get(url).map(res => res.json()).subscribe(data => {
      let stopIndex = this.posts.length; 
      this.posts = this.posts.concat(data.data.children);

      //Loop through all NEW posts that have been added. We are looping through
      //in reverse since we are removing some items.

      for(let i = this.posts.length - 1; i >= stopIndex; i--) {
        let post = this.posts[i];

        //Add a new property that will later be used to toggle a loading animation
        //for individual posts
        post.showLoader = false; 
        post.alreadyLoaded = false; 

        // Add a NSFW thumbnail to NSFW posts
        if(post.data.thumbnail == 'nsfw') {
          this.posts[i].data.thumbnail = 'images/nsfw.png';
        }

        /*
        Remove all posts that are not in the .gifv or .webm format and
        convert the ones that * are to .mp4 files.
        */

        if(post.data.url.indexOf('.gifv') > -1 ||
           post.data.url.indexOf('.webm') > -1) {
             this.posts[i].data.url = post.data.url.replace('.gifv', 'mp4');
             this.posts[i].data.url = post.data.url.replace('.webm', '.mp4'); 

            //If a preview image is available, assign it to the post as 'snapshot'
            if(typeof(post.data.preview) != 'undefined') {
              this.posts[i].data.snapshot = post.data.preview.images[0].source.url.replace(/&amp;/g, '&');

              // If the snapshot is undefined, change it to be blank so it doesn't use a broken image
              if(this.posts[i].data.snapshot == 'undefined') {
                this.posts[i].data.snapshot = '';
              }
            } 
            else {
              this.posts[i].data.snapshot = '';
            }

          }
          else {
            this.posts.slice(i, 1);
          }

        }
      // Keep fetching more gifs if we didn't retrieve enough to fill a page
      // but give up after 20 tries
      if(data.data.children.length === 0 || this.moreCount > 20) {
        this.moreCount = 0; 
        this.loading = false; 
      }
      else {
        this.after = data.data.children[data.data.children.length - 1].data.name; 

        if(this.posts.length < this.perPage * this.page) {
          this.fetchData();
          this.moreCount++; 
        }
        else {
          this.loading = false; 
          this.moreCount = 0; 
        }
      }
    }, (err) => {
      // Fail silently, in this case loading spinner will just continue to display
      console.log("subreddit doesn't exist!"); 
    });
  }

  nextPage() {
    this.page++;
    this.fetchData();
  }

  resetPosts() {
    this.page = 1; 
    this.posts = [];
    this.after = null; 
    this.fetchData(); 
  }

}
