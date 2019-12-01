import { Component, OnInit } from '@angular/core';
import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  db: ApiData;
  selections: ApiDataSelections;

  rows: any[];
  columns: string[];

  constructor(private ds: DataService) {}

  ngOnInit() {
    this.rows = [];
    this.columns = [];
    this.ds.data.subscribe(
      (db) => {
        this.db = db;
        this.generate_rows();
      }
    );
    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
        this.generate_rows();
      }
    );
  }

  generate_rows() {
    this.rows = [];
    let full_dataset = [];
    this.columns = ['project', 'device'];
    let keys = {};
    for (const device_id in this.db.raw_data) {
      if (this.db.raw_data.hasOwnProperty(device_id)) {
        const dataset = this.db.raw_data[device_id];
        if (this.selections.device.ids.length == 0) {
          full_dataset = full_dataset.concat(dataset);
        } else if (this.selections.device.ids.find((did) => {return did === device_id})) {
          full_dataset = full_dataset.concat(dataset);
        }
      }
    }
    for (const row of full_dataset) {
      let new_row = {
        project: this.db.device[row['device']]['meta_data']['project'],
        device: this.db.device[row['device']]['name'],
        date: row['date_created'],
      }
      for (const key in row['raw']) {
        if (row['raw'].hasOwnProperty(key)) {
          const value = row['raw'][key];
          new_row[key] = value;
          keys[key] = true;
        }
      }
      this.rows.push(new_row);
    }
    this.columns = this.columns.concat(Object.keys(keys));
  }

}