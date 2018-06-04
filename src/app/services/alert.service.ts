import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AlertService {
  private message = '';
  private message$ = new Subject<string>();

  private showWModal = true;
  private showWModal$ = new Subject<boolean>();

  constructor() { }

  setMessage(title: string, cb: any) {
    this.message = title;
    this.message$.next(this.message);
    setTimeout(function() {
      cb()}, 3000);
  }
  getMessage(): Observable<string> {
    return this.message$.asObservable();
  }
  clearMessage(){
    this.message = '';
  }
  showModal() {
    this.showWModal = true;
    this.showWModal$.next(this.showWModal);
  }
  hideModal() {
    this.showWModal = false;
    this.showWModal$.next(this.showWModal);
  }
  getModal(): Observable<boolean> {
    return this.showWModal$.asObservable();
  }

}
