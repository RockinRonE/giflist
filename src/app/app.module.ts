import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings-page/settings-page';
import { Reddit } from '../providers/reddit'; 
import { Data } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  providers: [Storage, Data, Reddit]
})
export class AppModule {}
