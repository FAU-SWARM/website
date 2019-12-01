import { Component, OnInit } from '@angular/core';
import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';
import { ExWhyFunctions } from 'src/app/components/utility/graph/graph.component';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  db: ApiData;
  selections: ApiDataSelections;
  data: {
    [device_id: string]: any[];
  }
  functions: ExWhyFunctions;
  columns: string[];

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.data = {};
    this.functions = {};
    this.columns = [];
    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
        this.ds.data.subscribe(
          (db) => {
            this.db = db;
            this.generate_dick();
          }
        );
      }
    );
  }

  generate_dick() {
    let data = {};
    for (const device_id in this.db.raw_data) {
      if (this.db.raw_data.hasOwnProperty(device_id)) {
        let dataset = this.db.raw_data[device_id];
        dataset = dataset.filter(
          (row) => {
            return this.selections.raw_data.dates.begin < row['date_created'] && row['date_created'] < this.selections.raw_data.dates.end
          }
        );
        if (this.selections.device.ids.length == 0) {
          data[device_id] = dataset;
        } else if (this.selections.device.ids.find((did) => {return did === device_id})) {
          data[device_id] = dataset;
        }
      }
    }

    this.functions = {};
    for (const data of this.db.arrays.raw_data) {
      for (const key in data['raw']) {
        if (data['raw'].hasOwnProperty(key)) {
          if (!this.functions.hasOwnProperty(key)) {
            // let code = `(d) => { return d['raw']['${key}'] }`;
            this.functions[key] = {
              x: (d) => { return d['date_created']; },
              y: (d) => { return +d['raw'][key] },
            }
          }
        }
      }
    }

    this.data = data;
    this.columns = this.selections.raw_data.keys.length ? this.selections.raw_data.keys : this.db.metadata.raw_data.keys;
  }
}
