import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AlertService {
  private message = '';
  private message$ = new Subject<string>();

  constructor() { }

  setMessage(title: string,cb: any) {
    this.message = title;
    this.message$.next(this.message);
    setTimeout(function(){ 
      cb() }, 3000);
  }
  getMessage(): Observable<string> {
    return this.message$.asObservable()
  }
  clearMessage(){
    this.message = '';
  }

}
