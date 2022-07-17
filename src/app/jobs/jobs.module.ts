import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { JobsComponent } from './jobs/jobs.component';
import { DetailComponent } from './detail/detail.component';

import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ListComponent,
        JobsComponent,
        DetailComponent,
    ],
  exports: [
    ListComponent,
    JobsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'job/:id', component: DetailComponent},
      {path: 'job', component: DetailComponent},
      {path: '', component: ListComponent},
    ]),
  ]
})
export class JobsModule { }
