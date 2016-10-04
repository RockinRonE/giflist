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

  }

}
