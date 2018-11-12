import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../config'
import { AngularFireDatabase } from '@angular/fire/database';

declare let d3: any; 

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit {
  id;
  options;
  searchText;
  router;
  data;
  config;
  response_times;
  filterData;
  public siteStatus: string; 
  public siteName: string;
  public logs: object;
  public site: object;
  public list = [];
  public empty: boolean;

  @ViewChild('nvd3') nvd3;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private injector: Injector,
    private db: AngularFireDatabase
  ) {
    this.empty = true;

    this.db.list('/site/' + this.route.snapshot.data['siteName'],
    ref => ref.limitToLast(10))
    .valueChanges().subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.list.push(snapshot);
        this.list === [] ? this.empty = true : this.empty = false;
      });
    });
  }

  requestUptime(index) {
    this.http.post(API_CONFIG.apiUrl + '/getMonitors', {
      api_key: API_CONFIG.apiKey,
      format: 'json',
      logs: 1,
      response_times: 1
    }).subscribe((data: any) => {

      this.siteName = data.monitors[index].friendly_name;
      this.siteStatus = data.monitors[index].status;
      this.logs = data.monitors[index].logs.filter(log => {if(log.reason.code != '200') return log;});
      this.response_times = data.monitors[index].response_times;
      this.id = data.monitors[index].id;
      this.filterData = this.logs;

      this.config = {refreshDataOnly: true};
      this.options = {
        chart: {
          type: 'lineChart',
          height: 300,
          margin : {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
          },
          x: function(d){ return d.x; },
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          duration: 500,
          xAxis: {
              tickFormat: function(d){ 
                return d3.time.format('%b %d')(new Date(d));
              }
            },    
          yAxis: {
              tickFormat: function(d){
                 return d3.format('.01f')(d);
              }
          }
        }  
      }
      this.data = [{ values: [{}], key: 'Response Time' }];
  
      for(var i = 0;i < this.response_times.length;i++){
        this.data[0].values.push({ x: this.response_times[i].datetime * 1000,	y: this.response_times[i].value});
      }

      // setInterval(() => {
      //   this.data[0].values.push({ x: x,	y: Math.random() - 0.5});
      //   x++;
      //   this.nvd3.chart.update()
      // }, 1500);
    })
  }

  public onDelete(){
    this.http.post(API_CONFIG.apiUrl + '/deleteMonitor', {
      api_key: API_CONFIG.apiKey,
      id: this.id
    }).subscribe((data: any) => {
      this.router = this.injector.get(Router);
      this.router.config.splice(this.route.snapshot.data['index'], 1);
    });

  }

  ngOnInit() {
    this.requestUptime(this.route.snapshot.data['index']);
  }

}
