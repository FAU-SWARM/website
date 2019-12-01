import { Component, OnInit, Input } from '@angular/core';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-utility-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class UtilityTableComponent implements OnInit {
  @Input() rows: any[];
  @Input() columns: any[];

  constructor() { }

  ngOnInit() {
    this.rows = [];
    this.columns = [];
  }

  download() {
    const replacer = (key, value) => value === null ? 'NULL' : value;
    let csv = this.rows.map(row => this.columns.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(this.columns.join(','));
    let csvArray = csv.join('\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }
}
