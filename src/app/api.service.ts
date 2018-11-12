import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from './config';
import { Observable } from '../../node_modules/rxjs';

@Injectable()
export class ApiService {
    private apiUrl = API_CONFIG.apiUrl;
    private apiKey = API_CONFIG.apiKey;

    constructor(private http: HttpClient){}

    public getSettings(): Observable<any> {
        const url = this.apiUrl + '/getMonitors';
        return this.http.post(url, {
            api_key: this.apiKey,
            format: 'json',
            logs: 1,
            response_times: 1
        })
    }

    public onEdit(id, friendly_name) {
        const url = this.apiUrl + '/editMonitor';
        console.warn('Reached')
        return this.http.post(url, {
            api_key: this.apiKey,
            id: id,
            friendly_name: friendly_name
        }).subscribe(res => res)
    }
}