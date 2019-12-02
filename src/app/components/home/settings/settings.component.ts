import { Component, OnInit } from '@angular/core';
import { DataService, ApiData, ApiDataSelections, Settings } from 'src/app/services/data.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  db: ApiData;
  selections: ApiDataSelections;
  settings: Settings;

  constructor(private ds: DataService) {
  }

  ngOnInit() {
    this.ds.settings.subscribe(
      (settings) => {
        this.settings = settings;
      }
    )
    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
        this.ds.data.subscribe(
          (db) => {
            this.db = db;
          }
        );
      }
    );
  }

  submit() {
    this.ds.set_settings(this.settings);
  }
}
