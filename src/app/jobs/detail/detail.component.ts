import {Component, Input, OnInit} from '@angular/core';
import {Process} from "../api/Process";
import {HttpJobsService} from "../http-jobs.service";
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";
import {LogLine} from "../api/LogLine";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  processId: string | null  = '';
  process: Process = new Process("", "", "", "STOPPED");
  newProcess: boolean = false;
  logs: LogLine[] = [];
  loading: boolean = false;
  logText = '';
  hidden = true;
  constructor(private httpJobsService: HttpJobsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.processId = this.route.snapshot.paramMap.get('id') != null ? this.route.snapshot.paramMap.get('id') : '';
    if(this.processId != '') {
      this.httpJobsService.getJob(this.processId!!).subscribe(
        (data) => {
          this.process = data as Process;
        }
      );

      this.httpJobsService.getJobLogs(this.processId!!).subscribe(
        (data) => { this.logs = data as LogLine[];
          console.log(this.logs);});
    } else {
      this.newProcess = true;
    }
  }

  saveProcess() {
    this.httpJobsService.saveProcess(this.process).subscribe(
      (data) => {
        this.process = data as Process;
      }
    );
  }

  deleteProcess() {
    this.httpJobsService.deleteProcess(this.processId!!).subscribe(
      (data) => {
        this.process = new Process("", "", "", "STOPPED");;
      }
    );
  }

  startProcess() {
    this.loading = true;
    this.httpJobsService.startProcess(this.processId!!).subscribe(
      (data) => {
        this.process = data as Process;
        this.loading = false;
      }
    );
  }

  stopProcess() {
    this.loading = true;
    this.httpJobsService.stopProcess(this.processId!!).subscribe(
      (data) => {
        this.process = data as Process;
        this.loading = false;
      }
    );
  }

  runProcess() {
    this.loading = true;
    this.httpJobsService.runProcess(this.processId!!).subscribe(
      (data) => {
        this.httpJobsService.getJobLogs(this.processId!!).subscribe(
          (data) => {
            this.logs = data as LogLine[];
            this.loading = false;
          });
      }
    );
  }

  close() {
    this.hidden = true;
    this.logText = '';
  }

  open(log: string) {
    this.hidden = false;
    this.logText = log;
  }

  disabled() {
    return this.newProcess || this.process.status === "ACTIVE";
  }
}
