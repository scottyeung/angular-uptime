import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { API_CONFIG } from '../config';
import { Router } from '@angular/router'
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})

export class MonitorComponent{

  monitor = new FormGroup({
    friendly_name: new FormControl('', Validators.required), 
    url: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  response: string;

  constructor(
    private injector: Injector,
    private http: HttpClient,
  ){}

  submitted = false;
  
  addMonitor() {
    this.submitted = true;
    if(this.monitor.status=="VALID"){
      console.warn("Form Submitted!", this.monitor.value);

      this.http.post(API_CONFIG.apiUrl + '/newMonitor', {
        api_key: API_CONFIG.apiKey,
        ...this.monitor.value
        }).subscribe((res)=> {
          const router = this.injector.get(Router);
          router.resetConfig([]);
          const setting = this.injector.get(SettingsService);
          setting.loadSettings();
        });
      }
    }

}
