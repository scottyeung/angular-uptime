import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service'
import { Router } from '@angular/router'
import { PostComponent } from './post/post.component';
import { UsersComponent } from './users/users.component';
import { MonitorComponent } from './monitor/monitor.component';

@Injectable()
export class SettingsService {

    currentSettings: any;
    links: Array<{ name: string, path: string }> = [];

    constructor(
        private injector: Injector,
        private api: ApiService
    ){}

    loadSettings(): Promise<any> {
        return new Promise ((resolve, reject)=>{

            const router = this.injector.get(Router);
            this.api.getSettings().subscribe( 
            response => {
                this.currentSettings = response;
                this.currentSettings.monitors.forEach((el,index) => {
                    router.config.push({path: `${el.friendly_name.toLowerCase()}`, component: PostComponent, data: { id: `${el.id}`, siteName: `${el.friendly_name}`, index: index, showEdit: false}});
                });
                router.config.push({path: 'monitor', component: MonitorComponent},{path: '**', component: UsersComponent});
                resolve(true);                
            },
            err => {
                console.log('Error: ' + JSON.stringify(err));
                reject(false);
                }
            );
    })}
}