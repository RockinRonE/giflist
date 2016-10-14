import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class Data {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('settings');
  }

  save(data): void {
    let newData = JSON.stringify(data);
    this.storage.set('settings', newData);
  }

}
