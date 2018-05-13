import { Component, OnInit } from '@angular/core';
import {  ListService } from './list.service';
import { Config } from 'protractor';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ ListService ]
})
export class ListComponent {
  tittle = "List of Games";
  appsName ;
  headers: string[];
  config ;

  constructor(private ListService: ListService) {
    this.showConfigResponse();
  }

  showConfig() {
    this.ListService.getlist()
      .subscribe((data: Config) => this.config = {
        heroesUrl: data['heroesUrl']
    });
  }
  showConfigResponse() {
    this.ListService.getlistResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        //console.log(resp);
        //this.config=JSON.parse(resp.body);
        this.appsName=resp.body;
        this.config = { ... resp.body };
        //alert (this.config);
        console.log(this.appsName);
        console.log(this.config.heroesUrl);
      });
  }
  
  clickMe(){
    return this.config.sort((a, b) => a.title.localCompare(b.title));
  }
}
