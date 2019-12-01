import { Component, OnInit } from '@angular/core';

import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  db: ApiData;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.data.subscribe(
      (db) => {this.db = db;}
    )
  }

}
