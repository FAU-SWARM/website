import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';

@Component({
  selector: 'app-utility-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class UtilityFilterComponent implements OnInit {
  db: ApiData;
  selections: ApiDataSelections;
  device: any[];
  project: any[];
  raw_data_key: any[];
  selected_devices: any[];
  selected_projects: any[];
  selected_raw_data_keys: any[];

  selected: { device: number[]; project: number[] };

  dateset = false;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private ds: DataService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.selected = { project: [], device: [] };
  }

  ngOnInit() {
    this.device = [];
    this.project = [];
    this.raw_data_key = [];
    this.selected_devices = [];
    this.selected_projects = [];
    this.selected_raw_data_keys = [];
    this.ds.data.subscribe(
      (db) => {
        this.db = db;
        this.selected = { project: [], device: [] };
        this.device = db.arrays.device.map((dev) => { dev['project'] = dev['meta_data']['project']; return dev });
        this.project = db.arrays.project.map((proj) => { return proj });
        this.raw_data_key = db.metadata.raw_data.keys.map((key) => { return key });
      }
    );
    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
        if (!this.dateset) {
          this.fromDate = new NgbDate(
            selections.raw_data.dates.begin.getUTCFullYear(),
            selections.raw_data.dates.begin.getUTCMonth() + 1,
            selections.raw_data.dates.begin.getUTCDate(),
          );
          this.toDate = new NgbDate(
            selections.raw_data.dates.end.getUTCFullYear(),
            selections.raw_data.dates.end.getUTCMonth() + 1,
            selections.raw_data.dates.end.getUTCDate(),
          );
          this.dateset = true;
        }
      }
    );
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.toDate && this.fromDate) {
      let end = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      let begin = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);

      this.ds.set_dates(begin, end);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  change_selected_projects() {
    let device = this.db.arrays.device.map((dev) => { dev['project'] = dev['meta_data']['project']; return dev });
    let filtered = [];
    for (const dev of device) {
      if (this.selected_projects.find((project_id) => { return this.db.project[project_id]['name'] === dev['meta_data']['project'] })) {
        filtered.push(dev);
      }
    }

    let sanitary_device = [];
    for (const device_id of this.get_actually_selected_devices(this.selected_devices)) {
      if (this.selected_projects.find((project_id) => { return this.db.project[project_id]['name'] === this.db.device[device_id]['meta_data']['project'] })) {
        sanitary_device.push(device_id);
      }
    }

    this.device = filtered;
    this.selected_devices = sanitary_device;
    this.ds.set_project(this.selected_projects);
    this.selected_devices = [];
    this.ds.set_device(this.selected_devices);
  }

  change_selected_devices() {
    this.ds.set_device(this.get_actually_selected_devices(this.selected_devices));
  }

  change_selected_raw_data_keys() {
    this.ds.set_raw_data_keys(this.selected_raw_data_keys);
  }

  get_actually_selected_devices(selected_devices: string[]): string[] {
    let sanitary_device = [];
    for (const device_id of selected_devices) {
      if (device_id.match(/([abcdef\d])\w{23,}/g)) {
        sanitary_device.push(device_id);
      } else {
        let matches = this.db.arrays.device.filter(dev => { return dev['meta_data']['project'] === device_id }).map(dev => { return dev['_id'] });
        sanitary_device = sanitary_device.concat(matches)
      }
    }
    return sanitary_device;
  }

}
