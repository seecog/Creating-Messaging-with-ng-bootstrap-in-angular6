import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { MessageService } from './services/message.service';
import { MessageComponent } from './message/message.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
