import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: any;
  db: ApiData;
  card_class: any = {};

  constructor(private ds: DataService, private modal: NgbModal) { }

  ngOnInit() {
    this.ds.data.subscribe(
      (db) => { this.db = db; }
    )
  }

  open(content, project) {
    this.project = project;
    this.modal.open(content, { size: 'xl', centered: true, scrollable: true });
  }

  submit() {
    this.ds.api.put('project', this.project['_id'], this.project).subscribe(
      (response) => {
        console.log(response);
        this.ds.init();
      }
    )
  }
}
