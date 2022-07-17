import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Process} from "./api/Process";

@Injectable({
  providedIn: 'root'
})
export class HttpJobsService {

  //readonly  myUrl = 'http://localhost:8080/';
  readonly  myUrl = 'http://server.fritz.box:8080/';

  constructor(private client: HttpClient) { }

  public getJobs(): Observable<Object> {
    console.log(this.myUrl + 'api/v1/process/all');
    return this.client.get(this.myUrl + 'api/v1/process/all');
  }

  public getJob(name: string): Observable<Object> {
    return this.client.get(this.myUrl + 'api/v1/process/' + name);
  }
  public getJobLogs(name: string): Observable<Object> {
    return this.client.get(this.myUrl + 'api/v1/process/result/all/' + name);
  }

  saveProcess(process: Process | null) {
    return this.client.post(this.myUrl + 'api/v1/process/save', process);
  }

  deleteProcess(name: string) {
    return this.client.delete(this.myUrl + 'api/v1/process/delete/' + name);
  }

  runProcess(name: string) {
    return this.client.post(this.myUrl + 'api/v1/process/run/' + name, null);
  }

  startProcess(name: string) {
    return this.client.post(this.myUrl + 'api/v1/process/start/' + name, null);
  }

  stopProcess(name: string) {
    return this.client.post(this.myUrl + 'api/v1/process/stop/' + name, null);
  }
}
