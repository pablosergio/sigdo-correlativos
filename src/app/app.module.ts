import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './config/app.config';
import { HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthService, AuthGuardService, LoggerService, LoaderService,
   ModalCommunicationService, CommunicationService, DataService } from './common/api';
import {SplitButtonModule} from 'primeng/primeng';
import { SharedModule } from './common/shared';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    SplitButtonModule,
    SharedModule,
    LoginModule,
  ],
 providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [AppConfig], multi: true },
    AuthHttp,
    provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'Bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
    }),
    AuthService,
    AuthGuardService,
    LoggerService,
    LoaderService,
    ModalCommunicationService,
    CommunicationService,
    DataService,
    // providers used to create fake backend
     fakeBackendProvider,
     MockBackend,
     BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function loadConfig(config: AppConfig) {
  return function load() {
    config.load();
  };
}
