import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-utility-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class UtilityTableComponent implements OnInit {
  @Input() rows: any[];
  @Input() columns: any[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {}

  download() {
    const replacer = (key, value) => value === null ? 'NULL' : value;
    let csv = this.rows.map(row => this.columns.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(this.columns.join(','));
    let csvArray = csv.join('\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, `${this.route.snapshot.url.join('-')}-${moment().format('YYYY-MM-DD-hhmmss')}.csv`);
  }
}
