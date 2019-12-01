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

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.rows = [];
    this.columns = [];
    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
        this.ds.data.subscribe(
          (db) => {
            this.db = db;
            this.generate_rows();
          }
        );
        if (this.db) {
          this.generate_rows();
        }
      }
    );
  }

  generate_rows() {
    this.rows = [];
    let full_dataset = [];
    this.columns = ['device', 'project', 'date'];
    for (const device_id in this.db.raw_data) {
      if (this.db.raw_data.hasOwnProperty(device_id)) {
        let dataset = this.db.raw_data[device_id];
        dataset = dataset.filter(
          (row) => {
            return this.selections.raw_data.dates.begin < row['date_created'] && row['date_created'] < this.selections.raw_data.dates.end
          }
        );
        if (this.selections.device.ids.length == 0) {
          full_dataset = full_dataset.concat(dataset);
        } else if (this.selections.device.ids.find((did) => { return did === device_id })) {
          full_dataset = full_dataset.concat(dataset);
        }
      }
    }

    for (const row of full_dataset) {
      let new_row = {
        device: this.db.device[row['device']]['name'],
        project: this.db.device[row['device']]['meta_data']['project'],
        date: row['date_created'],
      }
      for (const key in this.db.device[row['device']]['meta_data']) {
        if (this.db.device[row['device']]['meta_data'].hasOwnProperty(key)) {
          const value = this.db.device[row['device']]['meta_data'][key];
          new_row[key] = value;
        }
      }
      for (const key in row['raw']) {
        if (row['raw'].hasOwnProperty(key)) {
          const value = row['raw'][key];
          new_row[key] = value;
        }
      }
      this.rows.push(new_row);
    }
    this.columns = this.columns.concat(this.selections.raw_data.keys.length ? this.selections.raw_data.keys : this.db.metadata.raw_data.keys);
  }

}