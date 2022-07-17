import { Component, OnInit } from '@angular/core';
import {HttpJobsService} from "../http-jobs.service";
import {Process} from "../api/Process";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  logText: string = '';
  list: Process[] = [];

  constructor(private jobsHttp: HttpJobsService) { }

  ngOnInit(): void {
    this.jobsHttp.getJobs().subscribe(
      (data) => {
        this.list = data as Process[];
      }
    );
  }

  getListItemClass(status: string): string {
   if(status === "STOPPED") {
     return "list-group-item list-group-item-danger";
   }
   if(status === "ACTIVE") {
     return "list-group-item list-group-item-success";
   }
   return "list-group-item"
  }
}
