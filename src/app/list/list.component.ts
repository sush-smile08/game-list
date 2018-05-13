import { Component, OnInit, Input } from '@angular/core';
import { Config } from 'protractor';
import {  ListService } from './list.service';
import { CategoryPipe } from './list.pipe';

@Input()



@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ ListService ]
})
export class ListComponent implements OnInit{
  tittle = "List of Games";
  appsName ;
  headers: string[];
  config ;
  isDesc: boolean = false;
  column: string ='title';

  ngOnInit(){  }

  constructor(private ListService: ListService) {
    this.showConfigResponse();
  }



  showConfig() {
    this.ListService.getlist()
      .subscribe((data: Config) => this.appsName = {
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
  
  

  //angular.module('ngTableTutorial', ['ngTable'])
       // .controller('tableController', function ($scope, $filter, ngTableParams) {
 
         //   $scope.users = this.appsName;
 
//});
     //   });
  
  
  //clickMe(){
    //return appsName.sort((a, b) => a.title.localCompare(b.title));
  //}
}
