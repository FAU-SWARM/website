import { Component, OnInit } from '@angular/core';

import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  db: ApiData;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.data.subscribe(
      (db) => {this.db = db;}
    )
  }

}
