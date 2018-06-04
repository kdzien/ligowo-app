import { Observable } from 'rxjs/internal/Observable';
import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {
  private showModal: boolean;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getModal().subscribe(sm => {
      this.showModal = sm;
    });
  }

}
