import { Component, OnInit } from '@angular/core';
import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';


@Component({
  selector: 'app-utility-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class UtilityGraphComponent implements OnInit {
  db: ApiData;
  selections: ApiDataSelections;

  constructor(private ds: DataService) {}

  ngOnInit() {
    this.ds.data.subscribe(
      (db) => {
        this.db = db;
      }
    );
    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
      }
    );
  }

}
