import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations'
import { Router } from '@angular/router'
import { Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('out', style({
        transform: 'translate3d(0%, 0, 0)'
      })),
      state('in', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})

export class SidebarComponent implements OnInit {

  links: any
  visible:string = 'out';
  id;
  friendly_name;
  divToChange;
  editField: string;
  Field = new FormControl('', Validators.required);

  toogle() {
    this.visible = this.visible === 'out' ? 'in' : 'out';

    this.divToChange.className = this.divToChange.className === 'dashboard-content' ? 'dashboard-content full-width' : 'dashboard-content'; 
  }

  onSubmit(id, newFieldName) {
    console.log(id, newFieldName);
    this.api.onEdit(id, newFieldName);
  }

  constructor(
    private injector: Injector,
    private api: ApiService,
  ){}

  ngOnInit() {
    this.divToChange = document.getElementsByClassName('dashboard-content')[0];

    this.Field.valueChanges.subscribe(val => this.editField = val);
    
    setInterval(()=>{
      this.links = this.injector.get(Router).config;
    }, 500);
  }

}
