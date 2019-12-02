import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor: JsonEditorComponent;
  device: any;
  db: ApiData;

  editor_options: JsonEditorOptions;
  device_metadata: any;
  card_class: any = {};

  constructor(private ds: DataService, private modal: NgbModal) {
    this.editor_options = new JsonEditorOptions();
    this.editor_options.modes = ['code', 'text', 'tree', 'view'];
  }

  ngOnInit() {
    this.ds.data.subscribe(
      (db) => { this.db = db; }
    )
  }

  open(content, device) {
    this.device = device;
    this.modal.open(content, { size: 'xl', centered: true, scrollable: true });
  }

  submit() {
    console.log(JSON.parse(JSON.stringify(this.device)))
    this.device['meta_data'] = this.device_metadata;
    console.log(JSON.parse(JSON.stringify(this.device)))
    this.ds.api.put('device', this.device['_id'], this.device).subscribe(
      (response) => {
        console.log(response);
        this.ds.init();
      }
    )
  }

  on_change($event) {
    console.log($event);
    this.device_metadata = $event;
  }
}
