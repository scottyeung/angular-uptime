import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NvD3Module } from 'ng2-nvd3';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from './post/post.component';
import { SearchTextPipe } from './post/post.pipe';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { MonitorComponent } from './monitor/monitor.component';
import { HeaderComponent } from './header/header.component';

import 'd3';
import 'nvd3';
import { environment } from '../environments/environment';
import { SettingsService } from './settings.service';
import { ApiService } from './api.service';

export function initSettings(settings: SettingsService) {
  return () => settings.loadSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostComponent,
    UsersComponent,
    MonitorComponent,
    DetailsComponent,
    HeaderComponent,    
    SearchTextPipe, 
    MonitorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    RouterModule.forRoot([]),
    NvD3Module,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  entryComponents: [
    PostComponent,
    UsersComponent,
    MonitorComponent
  ],
  providers: [
    AngularFirestore,
    SettingsService,
    ApiService,{
      'provide': APP_INITIALIZER,
      'useFactory': initSettings,
      'deps': [SettingsService],
      'multi': true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
