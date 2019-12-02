import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService, Settings } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;
  interval_id: any;

  constructor(public ds: DataService) {
    this.ds.init();
    this.ds.settings.subscribe(
      (settings) => {
        this.settings = settings;
        if (this.interval_id !== null) {
          clearInterval(this.interval_id);
        }
        this.interval_id = setInterval(
          () => {
            this.refresh();
          }, settings.refresh_rate * 1000
        );
        console.log(this.interval_id);
      }
    )
  }

  refresh() {
    this.ds.init();
  }
}
