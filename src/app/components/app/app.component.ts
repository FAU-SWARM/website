import { Component } from '@angular/core';
import { DataService } from 'src/app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private ds: DataService) {
    this.ds.init();
  }

  refresh() {
    this.ds.init();
  }
}
