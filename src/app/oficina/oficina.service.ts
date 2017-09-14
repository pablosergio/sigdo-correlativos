import { Injectable } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { AppConfig } from '../config/app.config';
import { DataService, LoggerService, CommunicationService } from '../common/api';
import { Oficina } from './oficina';

@Injectable()
export class OficinaService extends DataService<Oficina> {
  constructor(loggerService: LoggerService, authHttp: AuthHttp, appConfig: AppConfig, communicationService: CommunicationService<Oficina>) {
    super(loggerService, authHttp, appConfig, communicationService);
    this.endpoint = 'oficinas';
  }

}
