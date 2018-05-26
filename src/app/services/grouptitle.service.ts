import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrouptitleService {
  private groupTitle = '';
  private groupTitle$ = new Subject<string>();
  constructor() { }

  setTitle(title: string) {
    this.groupTitle = title;
    this.groupTitle$.next(this.groupTitle);
  }
  getTitle(): Observable<string> {
    return this.groupTitle$.asObservable();
  }
}
