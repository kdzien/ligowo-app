import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private message: string;

  constructor(private alertService : AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message=message;
    })
  }

}
