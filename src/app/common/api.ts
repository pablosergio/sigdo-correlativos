import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Router, Route, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { AppConfig } from '../config/app.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoggerService {
  logs: string[] = [];
  constructor() { }
  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}

@Injectable()
export class LoaderService {
    public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    displayLoader(value: boolean) {
        this.loaderStatus.next(value);
    }
}

@Injectable()
export class AuthService {
  isLoggedIn: boolean;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: Http, private config: AppConfig) {
    this.isLoggedIn = false;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.config.getEndpoint('login', null), { username: username, password: password })
      .map(this.extractData)
      .catch(this.handleError);
  }

  logout(): void {
    this.isLoggedIn = false;
  }


  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    /*this.logger.log(errMsg);*/
    return Observable.throw(errMsg);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private config: AppConfig) {}

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
   const token: string = localStorage.getItem('token');
   if (token) {
       if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
       }
   }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}


@Injectable()
export class ModalCommunicationService {

  constructor() { }
  private cancelModal = new Subject();
  private saveModal = new Subject();

  // Observable string streams
  btnCancel$ = this.cancelModal.asObservable();
  btnSave$ = this.saveModal.asObservable();

  // Service message commands
  btnCancel() {
    this.cancelModal.next();
  }
  btnSave() {
    this.saveModal.next();
  }
}


@Injectable()
export class CommunicationService<T> {

  constructor() { }

  private openedSource = new Subject<T>();
  private updateSource = new Subject<T>();
  private deleteSource = new Subject<T>();
  private createSource = new Subject<T>();
  private reloadSource = new Subject<any>();

  // Observable string streams
  opened$ = this.openedSource.asObservable();
  update$ = this.updateSource.asObservable();
  delete$ = this.deleteSource.asObservable();
  create$ = this.createSource.asObservable();
  reload$ = this.reloadSource.asObservable();

  // Service message commands
  opened(record: T) {
    this.openedSource.next(record);
  }
  update(record: T) {
    this.updateSource.next(record);
  }
  delete(record: T) {
    this.deleteSource.next(record);
  }
  create(record: T) {
    this.createSource.next(record);
  }
  reload(params: any) {
    this.reloadSource.next(params);
  }

}

export interface PageResponse<T> {
  total: number;
  rows: T[];
  success: boolean;
}

@Injectable()
export class DataService<T> {
  endpoint: string;
  constructor(private logger: LoggerService, private http: AuthHttp, private config: AppConfig,
    public communication: CommunicationService<T>) { }

  getAll(param): Observable<PageResponse<T>> {
    const params: URLSearchParams = this.objToSearchParams(param);
    return this.http.get(this.config.getEndpoint(this.endpoint, null), { search: params })
            .map(this.extractData)
            .catch(this.handleError);
  }

  getOne(id: number | string): Observable<T> {
    return this.http.get(this.config.getEndpoint(this.endpoint, null) + '/' + id)
            .map(this.extractOneData)
            .catch(this.handleError);
  }

  save(record: T): Observable<T> {
    return this.http.post(this.config.getEndpoint(this.endpoint, null), record)
            .map(this.extractOneData)
            .catch(this.handleError);
  }

  update(record: T): Observable<T> {
    return this.http.put(this.config.getEndpoint(this.endpoint, null), record)
            .map(this.extractOneData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private extractOneData(res: Response) {
    const body = res.json();
    return body.data || body;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    this.logger.log(errMsg);
    return Observable.throw(errMsg);
  }

  private objToSearchParams(obj): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    params.set('limit', '10');
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          params.set(key, obj[key]);
        }
    }
    return params;
  }
}


export class DataTable<T> {
  errorMessage: string;
  store: T[];
  protected selectedId: number;
  totalRecords: number;
  itemsPerPage: number;
  currentPage: number;
  currentFilter: any;
  constructor(protected route: ActivatedRoute, protected router: Router,
    protected service: DataService<T>, protected loaderService: LoaderService) {
    this.itemsPerPage = 10;
  }

  /*public pageChanged(page: number): number {
   /* this method will trigger every page click */
  /*   this.service.getAll({ start: ((page - 1) * this.itemsPerPage) , limit: this.itemsPerPage })
     .subscribe(
           result => {
            this.store = result.rows,
            this.currentPage = page;
          },
          error => this.errorMessage = <any>error
      );
      return page;
  }*/

  public loadData(event) {
    this.loaderService.displayLoader(true);
    this.currentFilter = event;
    this.service.getAll(this.transformParams(event))
    .subscribe(
         result => {
           this.store = result.rows,
           this.totalRecords = result.total,
           this.loaderService.displayLoader(false);
         },
         error => this.errorMessage = <any>error
    );
  }

  private transformParams(params: any): any {
    const queryParams = {};
    if (params.hasOwnProperty('filters')) {
      for (const k in params.filters) {
        if (1 > 0) {
          queryParams[k] = params.filters[k].value;
        }
      }
    }
    if (params.hasOwnProperty('globalFilter')) {
       queryParams['contiene'] = params['globalFilter'];
    }
    if (params.hasOwnProperty('first')) {
        queryParams['start'] = params['first'];
    }
    if (params.hasOwnProperty('rows')) {
        queryParams['limit'] = params['rows'];
    }
    if (params.hasOwnProperty('sortField')) {
        queryParams['sort'] = params['sortField'];
    }
    if (params.hasOwnProperty('sortOrder')) {
      if (params['sortOrder']) {
        queryParams['dir'] = params['sortOrder'] > 0 ? 'DESC' : 'ASC';
      }
    }

    return queryParams;
  }
}

export function toBoolean(value) {
    switch (value) {
        case '':
            return true;
        case 'false':
        case '0':
            return false;
        default:
            return !!value;
    }
}
